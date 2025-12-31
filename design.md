# Premium Tech E-commerce Website - Design Style Guide

## Design Philosophy

### Visual Language
**High-End Tech Aesthetic**: Sophisticated dark mode interface that evokes premium electronics brands like Apple, Samsung, and high-end gaming peripherals. The design emphasizes precision, innovation, and luxury through carefully chosen typography, spacing, and visual effects.

### Color Palette
**Primary Colors**:
- **Deep Black**: `#0a0a0a` (Primary background)
- **Charcoal**: `#1a1a1a` (Secondary backgrounds, cards)
- **Midnight**: `#2a2a2a` (Borders, subtle elements)

**Accent Colors**:
- **Neon Cyan**: `#00d4ff` (Primary accent, CTAs, highlights)
- **Electric Blue**: `#0080ff` (Secondary accent, links, interactive elements)
- **Purple Glow**: `#8b5cf6` (Tertiary accent, special highlights)
- **Success Green**: `#10b981` (Success states, WhatsApp integration)

**Text Colors**:
- **Pure White**: `#ffffff` (Primary text)
- **Light Gray**: `#e5e7eb` (Secondary text)
- **Medium Gray**: `#9ca3af` (Tertiary text, placeholders)

### Typography
**Primary Font**: `'Inter', sans-serif` - Modern, clean, highly readable
**Secondary Font**: `'JetBrains Mono', monospace` - For technical specifications and code
**Display Font**: `'Orbitron', sans-serif` - For headings and tech branding elements

**Font Hierarchy**:
- **Hero Headings**: 4rem (64px), bold, letter-spacing: -0.02em
- **Section Headings**: 2.5rem (40px), semibold
- **Card Titles**: 1.25rem (20px), medium
- **Body Text**: 1rem (16px), regular
- **Technical Specs**: 0.875rem (14px), monospace

## Visual Effects & Styling

### Glassmorphism Implementation
**Glass Cards**: 
- Background: `rgba(255, 255, 255, 0.05)`
- Backdrop-filter: `blur(20px)`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Box-shadow: `0 8px 32px rgba(0, 0, 0, 0.3)`

**Glass Navigation**:
- Background: `rgba(10, 10, 10, 0.8)`
- Backdrop-filter: `blur(20px)`
- Border-bottom: `1px solid rgba(255, 255, 255, 0.1)`

### Neon Accent Effects
**Neon Glow Animation**:
```css
text-shadow: 0 0 5px currentColor,
             0 0 10px currentColor,
             0 0 15px currentColor,
             0 0 20px #00d4ff;
box-shadow: 0 0 5px currentColor,
            0 0 10px currentColor,
            0 0 15px currentColor,
            inset 0 0 5px currentColor;
```

**Interactive Hover States**:
- Scale transform: `scale(1.05)`
- Glow intensity increase
- Color transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### 3D Visual Effects
**Three.js Integration**:
- Ambient lighting: Soft white (`#ffffff`, intensity: 0.4)
- Directional lighting: Neon cyan (`#00d4ff`, intensity: 0.8)
- Material properties: Metallic finish with high reflectivity
- Animation: Smooth rotation, floating hover effects

**Parallax Scrolling**:
- Background layers move at different speeds
- Maximum displacement: 8% viewport height
- Smooth easing with CSS transforms

### Interactive Elements

**Button Styles**:
- Primary: Neon cyan background with white text
- Secondary: Transparent with neon cyan border
- Hover: Glow effect with scale animation
- Active: Pressed state with reduced glow

**Card Interactions**:
- Hover: Lift effect with increased shadow
- Focus: Neon border glow
- Loading: Skeleton animation with shimmer effect

**Form Elements**:
- Input fields: Glassmorphism with neon focus states
- Dropdowns: Custom styled with smooth animations
- Checkboxes/Radio: Custom neon-themed designs

## Layout & Spacing

### Grid System
**Container Max Widths**:
- Mobile: 100% with 1rem padding
- Tablet: 768px
- Desktop: 1200px
- Large: 1400px

**Spacing Scale** (Tailwind-based):
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)

### Component Spacing
**Navigation**: 4rem height with 1rem vertical padding
**Hero Section**: 100vh minimum with centered content
**Product Cards**: 1.5rem gap in grid layouts
**Section Padding**: 4rem vertical, 2rem horizontal

## Animation & Motion

### Framer Motion Implementation
**Page Transitions**:
- Duration: 0.3s
- Easing: `easeInOut`
- Stagger animations for card grids

**3D Model Animations**:
- Rotation speed: 0.5 rotations per second
- Hover float: 2rem vertical movement
- Zoom sensitivity: 0.1x per scroll tick

**Scroll Animations**:
- Trigger: Element enters top 50% of viewport
- Duration: 0.6s
- Opacity: 0 → 1
- Transform: translateY(20px) → translateY(0)

### CSS Keyframe Animations
**Neon Pulse**:
```css
@keyframes neon-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

**Shimmer Loading**:
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
```

**Floating Animation**:
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```

## Responsive Design

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px - 1400px
- Large: 1400px+

### Mobile Optimizations
- Touch-friendly button sizes (44px minimum)
- Simplified 3D interactions for performance
- Reduced animation complexity
- Optimized image loading with WebP format

## Technical Implementation

### Libraries Used
1. **Three.js**: 3D model rendering and interactions
2. **React Three Fiber**: React integration for Three.js
3. **Framer Motion**: UI animations and transitions
4. **Tailwind CSS**: Utility-first styling framework
5. **Anime.js**: Additional animation effects
6. **ECharts.js**: Data visualization for comparisons
7. **Splide.js**: Image carousels and sliders

### Performance Optimizations
- Lazy loading for 3D models and heavy assets
- Progressive image enhancement
- CSS and JS minification
- WebP image format with fallbacks
- Preload critical fonts and resources

This design system creates a cohesive, premium experience that positions the TV box business as a high-end technology provider while maintaining excellent usability and performance across all devices.