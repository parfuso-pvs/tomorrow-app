# App Preview Component

A modern, interactive app preview section with device mockups, feature callouts, before/after comparison, and video demo capabilities.

## Features

### 1. **Interactive Device Mockups**
- Realistic mobile and desktop device frames
- Smooth screenshot transitions with auto-advance
- Manual navigation controls
- Hover animations with scale effects
- Dark/light theme support

### 2. **Feature Callouts System**
- Interactive hotspots with animated tooltips
- Customizable positioning for each feature
- Icons and rich descriptions
- Click to expand functionality
- Responsive positioning for different devices

### 3. **Before/After Comparison Slider**
- Drag-to-compare functionality
- Touch-friendly mobile interactions
- Smooth animations and visual feedback
- Progress indicator
- Customizable labels

### 4. **Video Demo Player**
- Full-featured video controls
- Fullscreen capability
- Custom play/pause overlay
- Progress scrubbing
- Mute/unmute functionality
- Loading states

### 5. **Screenshot Carousel**
- Thumbnail navigation
- Active state indicators
- Click-to-preview functionality
- Responsive grid layout
- Animated transitions

### 6. **Control Interface**
- Device type switcher (Mobile/Desktop)
- Dark/light mode toggle
- Feature callouts toggle
- Video demo toggle
- Auto-play controls

## Design Principles

### Visual Hierarchy
- **Hero moment**: Large device mockup as focal point
- **Supporting content**: Right-side feature highlights
- **Secondary details**: Bottom carousel for exploration
- **Control layer**: Top-positioned, non-intrusive controls

### Animation Strategy
- **Entrance animations**: Staggered reveals (0.1s intervals)
- **Interaction feedback**: Hover scales (1.02x), tap scales (0.98x)
- **State transitions**: 300ms duration, easing curves
- **Auto-play**: 4-second intervals with pause on interaction

### Color System
```css
Primary: Blue gradient (#0ea5e9 to #0284c7)
Secondary: Pink gradient (#ec4899 to #db2777)
Success: Green (#10B981)
Warning: Amber (#F59E0B)
Error: Red (#EF4444)
```

### Spacing & Layout
- **Section padding**: 24px mobile, 32px desktop
- **Grid gaps**: 12px (3rem) between major sections
- **Component spacing**: 8px standard, 16px section breaks
- **Max widths**: 7xl container (1280px)

## Usage Examples

### Basic Implementation
```tsx
import { AppPreview } from '@tomorrow/ui'

<AppPreview
  mobileScreenshots={['/mobile-1.png', '/mobile-2.png']}
  desktopScreenshots={['/desktop-1.png', '/desktop-2.png']}
  beforeImage="/before.jpg"
  afterImage="/after.jpg"
  features={featureArray}
/>
```

### With Video Demo
```tsx
<AppPreview
  mobileScreenshots={mobileScreens}
  desktopScreenshots={desktopScreens}
  demoVideoUrl="/demo-video.mp4"
  beforeImage="/comparison-before.jpg"
  afterImage="/comparison-after.jpg"
  features={features}
/>
```

### Feature Configuration
```tsx
const features = [
  {
    id: 'unique-id',
    title: 'Feature Title',
    description: 'Detailed description with benefits',
    position: { x: 25, y: 30 }, // Percentage positioning
    icon: <IconComponent className="w-4 h-4" />
  }
]
```

## Component Architecture

### Main Components
- `AppPreview`: Main container and state management
- `DeviceMockup`: Device frame rendering
- `FeatureCallouts`: Interactive hotspot system
- `BeforeAfterSlider`: Comparison slider widget
- `VideoPlayer`: Full-featured video component
- `ScreenshotCarousel`: Thumbnail navigation

### Dependencies
- **Framer Motion**: Animations and gestures
- **Heroicons**: Consistent icon system
- **Tailwind CSS**: Utility-first styling
- **React Hooks**: State management

## Performance Considerations

### Image Optimization
- Use WebP format for screenshots
- Implement lazy loading for carousel images
- Optimize video files for web delivery
- Provide appropriate aspect ratios

### Bundle Size
- Tree-shake unused icons
- Code-split video components
- Lazy load heavy interactions
- Optimize animation libraries

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- High contrast mode compatible
- Focus management for modals

## Browser Support

### Modern Browsers
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

### Features Used
- CSS Grid & Flexbox
- Custom Properties
- Intersection Observer
- Framer Motion animations

## Customization Options

### Theme Variants
```tsx
// Dark theme support built-in
<AppPreview className="dark:bg-gray-900" />
```

### Custom Styling
```tsx
// Override default styles
<AppPreview className="bg-custom-gradient py-32" />
```

### Content Customization
- Screenshot arrays can be any length
- Feature positions are fully customizable
- Video demo is optional
- All text content is configurable

## Best Practices

### Content Guidelines
- **Screenshots**: Use high-resolution, consistent lighting
- **Video**: Keep under 30 seconds, show key workflows
- **Features**: Maximum 5-7 callouts for clarity
- **Copy**: Benefit-focused, scannable descriptions

### Technical Implementation
- Pre-load critical images
- Use progressive enhancement
- Test on various screen sizes
- Implement proper error boundaries

### UX Considerations
- Auto-advance timing should allow reading
- Controls should be discoverable
- Loading states prevent confusion
- Responsive behavior on all devices

This component creates a compelling, interactive showcase that converts visitors into users by letting them experience the app before downloading.