# Kolam AI - Tradition Meets Technology

Kolam AI transforms traditional South Indian kolam art into an interactive digital experience where symmetry meets creativity through AI-powered guidance and cultural education.

**Experience Qualities**:
1. **Culturally Immersive** - Deep respect for traditional kolam patterns while making them accessible to global audiences
2. **Intuitively Creative** - Symmetry-based drawing tools that feel natural and responsive across all devices
3. **Educationally Enlightening** - AI mentor provides cultural context and geometric understanding of each pattern

**Complexity Level**: Complex Application (advanced functionality, accounts)
Advanced multi-modal platform combining drawing tools, AI chatbot, authentication, multilingual support, and cultural education with sophisticated symmetry engines and export capabilities.

## Essential Features

**Symmetry Drawing Studio**
- Functionality: Real-time symmetric drawing with multiple axis modes (radial, bilateral, diagonal)
- Purpose: Enable authentic kolam creation with mathematical precision
- Trigger: Canvas page load or template selection
- Progression: Select symmetry mode → choose grid/dots → draw stroke → see instant mirrored reflections → save/export
- Success criteria: Smooth 60fps drawing with perfect symmetry reflection and mobile responsiveness

**Cultural AI Mentor**
- Functionality: Rasa-powered chatbot providing kolam history, techniques, and pattern suggestions
- Purpose: Preserve and share traditional knowledge while guiding creativity
- Trigger: Chat bubble click or help request
- Progression: User asks question → AI responds with cultural context → suggests related patterns → user applies learning to canvas
- Success criteria: Contextually accurate responses in 4 languages with <2s response time

**Multilingual Experience**
- Functionality: Complete UI translation across English, Tamil, Hindi, French
- Purpose: Global accessibility while honoring cultural origins
- Trigger: Language selector or browser detection
- Progression: Select language → entire interface updates → chatbot switches language → drawing continues seamlessly
- Success criteria: 100% UI coverage with culturally appropriate translations

**Authentication & Persistence**
- Functionality: Secure user accounts with design saving and export history
- Purpose: Personal creative journey tracking and community building
- Trigger: Login/signup button or save attempt
- Progression: Enter credentials → authenticate → access personal gallery → save designs → export with watermark options
- Success criteria: Secure session management with instant save/load and export capabilities

**Template Library & Export**
- Functionality: Curated kolam patterns with remix capabilities and multi-format export
- Purpose: Learning foundation and professional output generation
- Trigger: Template gallery browse or export button
- Progression: Browse templates → select base pattern → customize with tools → export as SVG/PNG/GIF → share or download
- Success criteria: High-resolution exports with animation replay and social media optimization

## Edge Case Handling

**Network Connectivity**: Offline drawing with sync on reconnect, cached templates for uninterrupted creativity
**Touch vs Mouse**: Adaptive input handling with pressure sensitivity and gesture recognition for natural drawing
**Browser Compatibility**: Progressive enhancement with fallbacks for older browsers while maintaining core functionality
**Large Designs**: Viewport chunking and memory optimization for complex patterns without performance degradation
**Language Mixing**: Graceful handling of unsupported characters with font fallbacks and RTL support

## Design Direction

The interface should evoke sacred geometry meeting modern technology - elegant, luminous, and respectful of cultural heritage while feeling cutting-edge and accessible to global users.

## Color Selection

Triadic (three equally spaced colors) - Traditional kolam colors (white, red, saffron) reimagined as glowing digital counterparts that honor the spiritual significance while embracing modern aesthetics.

- **Primary Color**: Deep Saffron `oklch(0.7 0.15 60)` - Represents traditional turmeric and spiritual significance
- **Secondary Colors**: 
  - Crimson Red `oklch(0.55 0.2 25)` - Traditional kumkum powder, used for accent elements
  - Pure White `oklch(0.98 0.02 60)` - Rice flour base, primary drawing color with soft glow
- **Accent Color**: Electric Teal `oklch(0.75 0.18 180)` - Modern technology fusion, for interactive states and AI elements
- **Foreground/Background Pairings**:
  - Background (Deep Navy `oklch(0.15 0.05 240)`): White text `oklch(0.98 0.02 60)` - Ratio 14.2:1 ✓
  - Card (Charcoal `oklch(0.25 0.03 240)`): White text `oklch(0.98 0.02 60)` - Ratio 9.8:1 ✓
  - Primary (Deep Saffron): White text `oklch(0.98 0.02 60)` - Ratio 5.2:1 ✓
  - Secondary (Crimson Red): White text `oklch(0.98 0.02 60)` - Ratio 7.1:1 ✓
  - Accent (Electric Teal): Deep Navy text `oklch(0.15 0.05 240)` - Ratio 6.8:1 ✓

## Font Selection

Typography should balance traditional elegance with modern readability, supporting multiple scripts while maintaining cultural authenticity and technical precision.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/32px/tight letter spacing - Strong presence for brand identity
  - H2 (Section Headers): Inter SemiBold/24px/normal - Clear navigation hierarchy
  - H3 (Feature Labels): Inter Medium/18px/normal - Tool and function identification
  - Body (Interface Text): Inter Regular/16px/relaxed - Maximum readability across languages
  - Caption (Help Text): Inter Regular/14px/normal - Subtle guidance and metadata
  - Code (Technical): JetBrains Mono Regular/14px/normal - Drawing coordinates and export data

## Animations

Animations should feel like sacred geometry coming to life - purposeful, meditative, and enhancing the spiritual aspect of kolam creation while providing clear functional feedback.

- **Purposeful Meaning**: Motion reflects the traditional drawing process - flowing, symmetric, and rhythmic like the act of creating kolam patterns at dawn
- **Hierarchy of Movement**: Symmetry lines glow and pulse gently, drawing strokes animate with trailing effects, UI transitions slide like silk fabric, loading states use mandala-inspired spinners

## Component Selection

- **Components**: 
  - Canvas: Custom WebGL drawing surface with shadcn Dialog overlays for tools
  - Navigation: shadcn Tabs for main sections with custom glowing indicators
  - Auth: shadcn Form with Input components styled with neon borders and floating labels
  - Chat: Custom bubble interface with shadcn ScrollArea and shadcn Sheet for full chat view
  - Gallery: shadcn Card grid with aspect-ratio for template previews
  - Settings: shadcn Select dropdowns with shadcn Switch toggles for drawing options

- **Customizations**: 
  - Radial symmetry axis visualizer (custom SVG overlays)
  - Pressure-sensitive brush stroke renderer (custom Canvas API)
  - Multi-language text renderer with script detection
  - Animated kolam pattern previews (custom Framer Motion sequences)

- **States**: 
  - Buttons: Soft glow on hover, pressed state with inner shadow, disabled with reduced opacity
  - Inputs: Focus state with teal ring and floating label animation
  - Canvas tools: Active tool highlighted with pulsing border and tool tip
  - Drawing: Real-time stroke preview with opacity fade-in

- **Icon Selection**: 
  - Phosphor icons for drawing tools (PaintBrush, Circle, Square)
  - Custom kolam-inspired icons for symmetry modes and cultural elements
  - Heroicons for navigation and utility functions

- **Spacing**: Consistent 8px base unit (gap-2, gap-4, gap-6) with generous whitespace around canvas and compressed spacing in toolbars

- **Mobile**: 
  - Collapsible toolbar that slides from bottom edge
  - Touch-optimized canvas with pinch-zoom and pan gestures
  - Responsive chat overlay that doesn't obstruct drawing area
  - Adaptive grid sizing for finger-friendly dot placement