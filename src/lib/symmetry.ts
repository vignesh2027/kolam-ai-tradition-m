import { Point, SymmetryMode } from '../types';

export class SymmetryEngine {
  static generateSymmetricPoints(
    point: Point, 
    mode: SymmetryMode, 
    canvasWidth: number, 
    canvasHeight: number
  ): Point[] {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const points: Point[] = [point];

    switch (mode) {
      case 'horizontal':
        points.push({
          x: point.x,
          y: canvasHeight - point.y,
          pressure: point.pressure
        });
        break;

      case 'vertical':
        points.push({
          x: canvasWidth - point.x,
          y: point.y,
          pressure: point.pressure
        });
        break;

      case 'diagonal':
        points.push(
          {
            x: canvasWidth - point.x,
            y: canvasHeight - point.y,
            pressure: point.pressure
          },
          {
            x: point.y,
            y: point.x,
            pressure: point.pressure
          },
          {
            x: canvasHeight - point.y,
            y: canvasWidth - point.x,
            pressure: point.pressure
          }
        );
        break;

      case 'radial-4':
        points.push(...this.getRadialPoints(point, 4, centerX, centerY));
        break;

      case 'radial-6':
        points.push(...this.getRadialPoints(point, 6, centerX, centerY));
        break;

      case 'radial-8':
        points.push(...this.getRadialPoints(point, 8, centerX, centerY));
        break;

      case 'radial-12':
        points.push(...this.getRadialPoints(point, 12, centerX, centerY));
        break;

      case 'radial-16':
        points.push(...this.getRadialPoints(point, 16, centerX, centerY));
        break;

      default:
        break;
    }

    return points.filter(p => 
      p.x >= 0 && p.x <= canvasWidth && 
      p.y >= 0 && p.y <= canvasHeight
    );
  }

  private static getRadialPoints(
    point: Point, 
    segments: number, 
    centerX: number, 
    centerY: number
  ): Point[] {
    const points: Point[] = [];
    const angleStep = (2 * Math.PI) / segments;
    
    // Convert point to polar coordinates relative to center
    const dx = point.x - centerX;
    const dy = point.y - centerY;
    const radius = Math.sqrt(dx * dx + dy * dy);
    const baseAngle = Math.atan2(dy, dx);

    for (let i = 1; i < segments; i++) {
      const angle = baseAngle + (angleStep * i);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      points.push({
        x,
        y,
        pressure: point.pressure
      });
    }

    return points;
  }

  static getSymmetryLines(
    mode: SymmetryMode,
    canvasWidth: number,
    canvasHeight: number
  ): { x1: number; y1: number; x2: number; y2: number }[] {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];

    switch (mode) {
      case 'horizontal':
        lines.push({ x1: 0, y1: centerY, x2: canvasWidth, y2: centerY });
        break;

      case 'vertical':
        lines.push({ x1: centerX, y1: 0, x2: centerX, y2: canvasHeight });
        break;

      case 'diagonal':
        lines.push(
          { x1: centerX, y1: 0, x2: centerX, y2: canvasHeight },
          { x1: 0, y1: centerY, x2: canvasWidth, y2: centerY },
          { x1: 0, y1: 0, x2: canvasWidth, y2: canvasHeight },
          { x1: canvasWidth, y1: 0, x2: 0, y2: canvasHeight }
        );
        break;

      case 'radial-4':
      case 'radial-6':
      case 'radial-8':
      case 'radial-12':
      case 'radial-16':
        const segments = parseInt(mode.split('-')[1]);
        const angleStep = (2 * Math.PI) / segments;
        const radius = Math.min(canvasWidth, canvasHeight) / 2;

        for (let i = 0; i < segments; i++) {
          const angle = angleStep * i;
          const x2 = centerX + radius * Math.cos(angle);
          const y2 = centerY + radius * Math.sin(angle);
          lines.push({ x1: centerX, y1: centerY, x2, y2 });
        }
        break;

      default:
        break;
    }

    return lines;
  }
}