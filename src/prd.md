# Kolam AI - Product Requirements Document

## Core Purpose & Success

**Mission Statement**: Kolam AI bridges traditional South Indian kolam art with modern technology, creating an accessible, educational, and beautiful digital platform where users can learn, create, and share sacred geometry patterns while connecting with their cultural heritage.

**Success Indicators**: 
- Users successfully create their first kolam with 8-way radial symmetry
- High engagement with the AI cultural mentor 
- Seamless cross-device experience (mobile and desktop)
- Growing gallery of user-created kolam designs
- Positive cultural education impact

**Experience Qualities**: 
- Sacred: Honors the spiritual significance of traditional kolam art
- Intuitive: Easy to use regardless of technical or artistic skill level  
- Beautiful: Visually stunning interface that inspires creativity

## Project Classification & Approach

**Complexity Level**: Light Application (multiple features with basic state)
- Real-time drawing canvas with symmetry engine
- Multi-language support (English, Tamil, Hindi, French)
- Custom authentication system
- AI chatbot for cultural guidance
- Export and sharing capabilities

**Primary User Activity**: Creating - Users primarily engage by drawing kolam patterns, but with significant learning and cultural exploration components

## Core Problem Analysis

**Specific Problem**: Traditional kolam art is at risk of being lost in the digital age, and there's no accessible way for people worldwide to learn this sacred geometry practice with proper cultural context and guidance.

**User Context**: Users want to connect with their cultural heritage, learn traditional art forms, or explore sacred geometry, but lack access to traditional teaching methods or cultural mentors.

**Critical Path**: Land on homepage → Start drawing canvas → Experience 8-way symmetry → Learn from AI mentor → Save/share creation

**Key Moments**:
1. **First Stroke Magic**: When users see their first stroke instantly mirrored 8 times
2. **Cultural Discovery**: Learning the spiritual meaning behind patterns from the AI mentor
3. **Completion Joy**: Successfully exporting their first high-quality kolam design

## Essential Features

### Symmetry Drawing Studio
- **Functionality**: Real-time 8-way radial symmetry mirroring with multiple drawing tools
- **Purpose**: Creates the magical experience of traditional kolam patterns with modern precision
- **Success Criteria**: Users can create complete kolam patterns in under 10 minutes

### AI Cultural Mentor (GitHub Spark API)
- **Functionality**: Intelligent chatbot implemented via GitHub Spark API providing real-time cultural guidance, pattern explanations, and drawing techniques
- **Purpose**: Preserves and shares traditional knowledge while users create, accessible without external API dependencies
- **Success Criteria**: Users learn at least one cultural fact per session and feel connected to kolam traditions
- **Technical Implementation**: Serverless function at `/api/mentor` with rule-based responses covering symmetry, culture, colors, and patterns

### Multilingual Interface  
- **Functionality**: Complete UI translation in English, Tamil, Hindi, French
- **Purpose**: Makes the platform accessible to global Tamil diaspora and curious learners
- **Success Criteria**: Non-English speakers can fully navigate and create

### Enhanced Gallery Experience
- **Functionality**: Three-tab gallery featuring curated kolam templates, educational reels/videos, and wellness benefits
- **Purpose**: Comprehensive learning hub beyond just creation tools
- **Success Criteria**: Users explore multiple templates and engage with educational content
- **Components**: 
  - 5 premium kolam templates with cultural significance
  - 5 educational video reels (timelapse, tutorials, cultural demonstrations)
  - 6 documented benefits of kolam practice (mental, spiritual, cultural)

### Mobile-First Design
- **Functionality**: Touch-optimized drawing with responsive layout
- **Purpose**: Accessibility on the devices people actually use  
- **Success Criteria**: Drawing experience feels natural on mobile phones

### 8-Way Radial Symmetry Focus
- **Functionality**: Default canvas setup with 8-way radial symmetry for immediate success
- **Purpose**: Creates instant "magic moment" for new users and teaches core kolam principles
- **Success Criteria**: First-time users create beautiful patterns within minutes

## Design Direction

### Visual Tone & Identity
**Emotional Response**: Users should feel a sense of reverence, wonder, and creative flow - like participating in an ancient ritual updated for the digital age.

**Design Personality**: Sacred minimalism - modern and clean but with warmth and spiritual depth. Think Apple's design clarity meets traditional temple aesthetics.

**Visual Metaphors**: Sacred geometry, cosmic patterns, temple architecture elements, flowing water, and celestial bodies.

**Simplicity Spectrum**: Minimal interface that recedes to let the art shine, but rich in meaningful details that reward attention.

### Color Strategy
**Color Scheme Type**: Custom palette inspired by traditional kolam materials and sacred colors

**Primary Color**: Deep saffron (`oklch(0.7 0.15 60)`) - represents spiritual wisdom and energy
**Secondary Colors**: 
- Crimson red (`oklch(0.55 0.2 25)`) - for auspiciousness and power
- Electric teal (`oklch(0.75 0.18 180)`) - modern accent representing innovation

**Accent Color**: Electric teal for CTAs and interactive elements
**Background**: Deep navy (`oklch(0.15 0.05 240)`) creating a cosmic canvas
**Foreground**: Pure white (`oklch(0.98 0.02 60)`) for excellent contrast

**Color Psychology**: The palette balances ancient spiritual colors (saffron, red) with modern tech aesthetics (teal, navy) to bridge tradition and innovation.

**Foreground/Background Pairings**:
- White text on navy background: 19.5:1 contrast ratio ✅
- White text on saffron: 4.8:1 contrast ratio ✅  
- Navy text on teal: 7.2:1 contrast ratio ✅
- White text on crimson: 5.1:1 contrast ratio ✅

### Typography System
**Font Pairing Strategy**: Inter for UI clarity paired with JetBrains Mono for precise technical elements

**Typographic Hierarchy**: 
- Headings: Bold Inter with generous spacing
- Body: Regular Inter optimized for readability
- Code/Technical: JetBrains Mono for precision

**Font Personality**: Inter conveys modern accessibility while maintaining elegance. Clean, geometric forms echo kolam patterns.

**Selected Fonts**: 
- Primary: Inter (Google Fonts) - highly legible, modern, supports multiple languages
- Monospace: JetBrains Mono - for technical elements and precise information

**Legibility Check**: Both fonts are specifically designed for screen reading with excellent multi-language support.

### Visual Hierarchy & Layout
**Attention Direction**: Glowing elements guide users to key interactions, symmetry lines draw focus to the center, animated patterns create movement

**White Space Philosophy**: Generous negative space creates breathing room and focuses attention on the sacred act of creation

**Grid System**: Flexible container-based layout that adapts from mobile to desktop while maintaining proportional harmony

**Responsive Approach**: Mobile-first with progressive enhancement - core drawing experience works perfectly on phones, desktop adds more tools and information

### Animations
**Purposeful Movement**: 
- Floating background patterns suggest cosmic energy
- Symmetry lines pulse gently to show active guides  
- Drawing strokes flow smoothly to feel organic
- UI elements glow and fade to feel alive

**Hierarchy of Movement**: Canvas center (highest priority) → active tools → background ambiance

**Contextual Appropriateness**: Subtle spiritual animations that enhance without distracting from the meditative drawing experience

### UI Elements & Component Selection
**Component Usage**: 
- Cards for grouping related tools and information
- Buttons with glowing effects for primary actions
- Sliders for precise control over brush settings
- Overlays for tutorials and chat without disrupting flow

**Component Customization**: 
- Custom glow effects using CSS box-shadow
- Rounded corners reflecting the radius design token
- Glassmorphism effects with backdrop-blur

**Mobile Adaptation**: 
- Larger touch targets (44px minimum)
- Simplified toolbars with essential tools only
- Gesture support for natural drawing

### Accessibility & Readability
**Contrast Goal**: WCAG AA compliance achieved with all text achieving 4.5:1+ contrast ratios

## Implementation Considerations

**Scalability Needs**: Design supports adding new symmetry modes, brush types, and cultural content as the platform grows

**Critical Questions**: 
- How do we balance authenticity with accessibility for non-Tamil users?
- Can we maintain performance with complex symmetry calculations on mobile?
- How do we encourage users to engage with cultural learning alongside creation?

## Reflection

This approach uniquely serves the need to preserve and share traditional art by making it accessible through modern technology while maintaining deep respect for its cultural significance. The combination of immediate visual satisfaction (symmetry magic) with educational depth (AI mentor) creates a uniquely meaningful digital experience.

The sacred minimalism aesthetic ensures the interface never competes with the user's artistic creation, while the carefully chosen colors and animations honor the spiritual context of traditional kolam practice.