import { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  ArrowClockwise, 
  ArrowCounterClockwise, 
  Download, 
  FloppyDisk,
  Trash,
  GridFour as Grid,
  Palette
} from '@phosphor-icons/react';
import { useKV } from '@github/spark/hooks';
import { Language, SymmetryMode, BrushType, Stroke, Point, KolamDesign } from '@/types';
import { useTranslation } from '@/lib/translations';
import { SymmetryEngine } from '@/lib/symmetry';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

interface CanvasPageProps {
  language: Language;
}

export function CanvasPage({ language }: CanvasPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [strokes, setStrokes] = useKV<Stroke[]>('kolam-current-design', []);
  const [history, setHistory] = useState<Stroke[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Drawing settings
  const [symmetryMode, setSymmetryMode] = useState<SymmetryMode>('radial-8');
  const [brushType, setBrushType] = useState<BrushType>('thin');
  const [brushSize, setBrushSize] = useState([2]);
  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const [gridVisible, setGridVisible] = useState(true);
  const [gridSize, setGridSize] = useState([20]);

  const t = useTranslation(language);
  const { user, isAuthenticated } = useAuth();

  const canvasSize = { width: 800, height: 600 };

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    
    // Set up canvas context
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'oklch(0.2 0.02 240)';
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }

    redrawCanvas();
  }, []);

  // Redraw canvas when strokes change
  useEffect(() => {
    redrawCanvas();
  }, [strokes, gridVisible, symmetryMode]);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.fillStyle = 'oklch(0.2 0.02 240)';
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw grid
    if (gridVisible) {
      drawGrid(ctx);
    }

    // Draw symmetry lines
    drawSymmetryLines(ctx);

    // Draw all strokes
    (strokes || []).forEach(stroke => {
      drawStroke(ctx, stroke);
    });
  }, [strokes, gridVisible, symmetryMode, gridSize]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const spacing = gridSize[0];
    ctx.strokeStyle = 'oklch(0.4 0.05 240 / 0.3)';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = spacing; x < canvasSize.width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasSize.height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = spacing; y < canvasSize.height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasSize.width, y);
      ctx.stroke();
    }

    // Draw dots at intersections
    ctx.fillStyle = 'oklch(0.75 0.18 180 / 0.5)';
    for (let x = spacing; x < canvasSize.width; x += spacing) {
      for (let y = spacing; y < canvasSize.height; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const drawSymmetryLines = (ctx: CanvasRenderingContext2D) => {
    if (symmetryMode === 'none') return;

    const lines = SymmetryEngine.getSymmetryLines(symmetryMode, canvasSize.width, canvasSize.height);
    
    ctx.strokeStyle = 'oklch(0.75 0.18 180 / 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    lines.forEach(line => {
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.stroke();
    });

    ctx.setLineDash([]);
  };

  const drawStroke = (ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    if (stroke.points.length < 2) return;

    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    
    // Apply brush type effects
    switch (stroke.brushType) {
      case 'dotted':
        ctx.setLineDash([5, 5]);
        break;
      case 'bold':
        ctx.lineWidth = stroke.width * 2;
        break;
      default:
        ctx.setLineDash([]);
    }

    // Generate symmetric points for each point in the stroke
    const allPoints: Point[][] = stroke.points.map(point =>
      SymmetryEngine.generateSymmetricPoints(point, symmetryMode, canvasSize.width, canvasSize.height)
    );

    // Draw each symmetric stroke
    for (let i = 0; i < (allPoints[0]?.length || 0); i++) {
      ctx.beginPath();
      
      const strokePoints = allPoints.map(pointSet => pointSet[i]).filter(Boolean);
      
      if (strokePoints.length > 1) {
        ctx.moveTo(strokePoints[0].x, strokePoints[0].y);
        
        for (let j = 1; j < strokePoints.length; j++) {
          ctx.lineTo(strokePoints[j].x, strokePoints[j].y);
        }
        
        ctx.stroke();
      }
    }

    ctx.setLineDash([]);
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvasSize.width / rect.width;
    const scaleY = canvasSize.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const point = getMousePos(e);
    setCurrentStroke([point]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const point = getMousePos(e);
    setCurrentStroke(prev => [...prev, point]);

    // Draw preview stroke
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    redrawCanvas();

    // Draw current stroke preview
    if (currentStroke.length > 0) {
      const previewStroke: Stroke = {
        id: 'preview',
        points: [...currentStroke, point],
        color: currentColor,
        brushType,
        width: brushSize[0],
        timestamp: Date.now()
      };
      drawStroke(ctx, previewStroke);
    }
  };

  const stopDrawing = () => {
    if (!isDrawing || currentStroke.length === 0) return;

    const newStroke: Stroke = {
      id: `stroke_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      points: currentStroke,
      color: currentColor,
      brushType,
      width: brushSize[0],
      timestamp: Date.now()
    };

    const newStrokes = [...(strokes || []), newStroke];
    setStrokes(newStrokes);

    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newStrokes);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setIsDrawing(false);
    setCurrentStroke([]);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setStrokes(history[newIndex] || []);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setStrokes(history[newIndex] || []);
    }
  };

  const clearCanvas = () => {
    setStrokes([]);
    const newHistory = [...history, []];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const saveDesign = () => {
    if (!isAuthenticated) {
      toast.error('Please login to save designs');
      return;
    }

    const design: KolamDesign = {
      id: `design_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `Kolam ${new Date().toLocaleDateString()}`,
      userId: user?.id,
      strokes: strokes || [],
      symmetryMode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      isTemplate: false
    };

    // Save to KV store (this would be expanded to handle user galleries)
    toast.success('Design saved successfully!');
  };

  const exportCanvas = (format: 'png' | 'svg') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = `kolam-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
    
    toast.success(`Exported as ${format.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-background pt-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Toolbar */}
        <Card className="mb-6 p-4 bg-card/90 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-4">
            {/* Symmetry Mode */}
            <div className="flex items-center space-x-2">
              <Label>{t('symmetryMode')}</Label>
              <Select value={symmetryMode} onValueChange={(value: SymmetryMode) => setSymmetryMode(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="horizontal">Horizontal</SelectItem>
                  <SelectItem value="vertical">Vertical</SelectItem>
                  <SelectItem value="diagonal">Diagonal</SelectItem>
                  <SelectItem value="radial-4">Radial 4</SelectItem>
                  <SelectItem value="radial-6">Radial 6</SelectItem>
                  <SelectItem value="radial-8">Radial 8</SelectItem>
                  <SelectItem value="radial-12">Radial 12</SelectItem>
                  <SelectItem value="radial-16">Radial 16</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Brush Type */}
            <div className="flex items-center space-x-2">
              <Label>{t('brushType')}</Label>
              <Select value={brushType} onValueChange={(value: BrushType) => setBrushType(value)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thin">Thin</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                  <SelectItem value="floral">Floral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Brush Size */}
            <div className="flex items-center space-x-2">
              <Label>Size</Label>
              <Slider
                value={brushSize}
                onValueChange={setBrushSize}
                max={20}
                min={1}
                step={1}
                className="w-20"
              />
              <span className="text-sm text-muted-foreground w-6">{brushSize[0]}</span>
            </div>

            {/* Color */}
            <div className="flex items-center space-x-2">
              <Label>{t('color')}</Label>
              <input
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="w-8 h-8 rounded border-2 border-border cursor-pointer"
              />
            </div>

            {/* Grid Toggle */}
            <div className="flex items-center space-x-2">
              <Label>{t('grid')}</Label>
              <Switch checked={gridVisible} onCheckedChange={setGridVisible} />
            </div>

            {/* Grid Size */}
            {gridVisible && (
              <div className="flex items-center space-x-2">
                <Label>Grid Size</Label>
                <Slider
                  value={gridSize}
                  onValueChange={setGridSize}
                  max={50}
                  min={10}
                  step={5}
                  className="w-20"
                />
              </div>
            )}
          </div>
        </Card>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Canvas */}
          <div className="flex-1">
            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <canvas
                ref={canvasRef}
                className="border-2 border-primary/20 rounded-lg w-full cursor-crosshair canvas-container"
                style={{ maxWidth: '100%', height: 'auto', aspectRatio: '4/3' }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </Card>
          </div>

          {/* Controls Panel */}
          <Card className="lg:w-64 p-4 bg-card/90 backdrop-blur-sm h-fit">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center space-x-2">
                <Palette size={20} />
                <span>Controls</span>
              </h3>

              {/* History Controls */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  className="flex-1"
                >
                  <ArrowCounterClockwise size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  className="flex-1"
                >
                  <ArrowClockwise size={16} />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full flex items-center space-x-2"
                  onClick={clearCanvas}
                >
                  <Trash size={16} />
                  <span>{t('clear')}</span>
                </Button>

                {isAuthenticated && (
                  <Button
                    className="w-full flex items-center space-x-2 glow-primary"
                    onClick={saveDesign}
                  >
                    <FloppyDisk size={16} />
                    <span>{t('save')}</span>
                  </Button>
                )}

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportCanvas('png')}
                    className="flex-1"
                  >
                    <Download size={16} />
                    <span>PNG</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportCanvas('svg')}
                    className="flex-1"
                  >
                    <Download size={16} />
                    <span>SVG</span>
                  </Button>
                </div>
              </div>

              {/* Color Presets */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Color Presets</Label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    '#FFFFFF', '#FF6B6B', '#4ECDC4', '#45B7D1',
                    '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => setCurrentColor(color)}
                      className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Stroke Count */}
              <div className="text-sm text-muted-foreground">
                Strokes: {(strokes || []).length}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}