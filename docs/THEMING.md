# Theming Documentation

## Overview

This application uses a CSS variable-based theming system integrated with Tailwind CSS. The system provides semantic color tokens that automatically adapt between light and dark modes.

## CSS Variables Structure

### Core Concepts

All colors are defined using HSL (Hue, Saturation, Lightness) format without the `hsl()` function wrapper. This allows Tailwind to apply opacity modifiers.

```css
/* Correct format */
--primary: 221.2 83.2% 53.3%;

/* Usage in Tailwind config */
primary: "hsl(var(--primary))"

/* Allows opacity modifiers like bg-primary/50 */
```

## Color Tokens

### Semantic Colors

| Token | Purpose | Usage |
|-------|---------|-------|
| `background` | Main page background | `bg-background` |
| `foreground` | Main text color | `text-foreground` |
| `card` | Card backgrounds | `bg-card` |
| `card-foreground` | Card text | `text-card-foreground` |
| `popover` | Popover/dropdown backgrounds | `bg-popover` |
| `popover-foreground` | Popover text | `text-popover-foreground` |

### Interactive Colors

| Token | Purpose | Usage |
|-------|---------|-------|
| `primary` | Primary actions, links | `bg-primary`, `text-primary` |
| `primary-foreground` | Text on primary backgrounds | `text-primary-foreground` |
| `secondary` | Secondary actions | `bg-secondary` |
| `secondary-foreground` | Text on secondary backgrounds | `text-secondary-foreground` |

### Utility Colors

| Token | Purpose | Usage |
|-------|---------|-------|
| `muted` | Muted backgrounds | `bg-muted` |
| `muted-foreground` | Muted text | `text-muted-foreground` |
| `accent` | Accent highlights | `bg-accent` |
| `accent-foreground` | Text on accent backgrounds | `text-accent-foreground` |
| `destructive` | Error/danger states | `bg-destructive` |
| `destructive-foreground` | Text on destructive backgrounds | `text-destructive-foreground` |

### Form & UI Elements

| Token | Purpose | Usage |
|-------|---------|-------|
| `border` | Border colors | `border-border` |
| `input` | Input backgrounds | `bg-input` |
| `ring` | Focus rings | `ring-ring` |

## Usage Examples

### Basic Usage

```jsx
// Using semantic colors
<div className="bg-background text-foreground">
  <div className="bg-card text-card-foreground rounded-lg p-4">
    <h1 className="text-primary">Title</h1>
    <p className="text-muted-foreground">Description</p>
    <button className="bg-primary text-primary-foreground hover:bg-primary/90">
      Click me
    </button>
  </div>
</div>
```

### Utility Classes

The system provides pre-built utility classes for common patterns:

```jsx
// Button styles
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-secondary">Secondary Button</button>
<button className="btn btn-outline">Outline Button</button>
<button className="btn btn-ghost">Ghost Button</button>
<button className="btn btn-destructive">Delete</button>

// Cards
<div className="card">
  Card content with automatic theming
</div>

// Inputs
<input className="input" placeholder="Enter text" />

// Badges
<span className="badge badge-default">Default</span>
<span className="badge badge-secondary">Secondary</span>
<span className="badge badge-outline">Outline</span>
```

## Theme Switching

### Default Theme

The application defaults to dark mode. This is set in the root layout:

```jsx
<html lang="en" className="dark">
```

### Switching Themes

To switch between light and dark modes programmatically:

```javascript
// Enable dark mode
document.documentElement.classList.add('dark')

// Enable light mode
document.documentElement.classList.remove('dark')

// Toggle theme
document.documentElement.classList.toggle('dark')
```

### Respecting System Preferences

To automatically follow system preferences:

```javascript
// Check system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

// Apply theme
if (prefersDark) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// Listen for changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (e.matches) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
```

## Customizing Colors

### Modifying Existing Colors

To customize the color palette, edit the CSS variables in `/apps/landing/app/globals.css`:

```css
:root {
  /* Change primary color to purple */
  --primary: 271 91% 65%;
  --primary-foreground: 210 40% 98%;
}

.dark {
  /* Adjust for dark mode */
  --primary: 271 76% 53%;
  --primary-foreground: 210 40% 98%;
}
```

### Adding New Colors

1. Add CSS variables in `globals.css`:

```css
:root {
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 89%;
}

.dark {
  --warning: 48 96% 89%;
  --warning-foreground: 38 92% 50%;
}
```

2. Update Tailwind config:

```javascript
// tailwind.config.ts
colors: {
  warning: {
    DEFAULT: "hsl(var(--warning))",
    foreground: "hsl(var(--warning-foreground))",
  },
}
```

3. Use in components:

```jsx
<div className="bg-warning text-warning-foreground">
  Warning message
</div>
```

## Best Practices

### 1. Always Use Semantic Colors

❌ **Don't:**
```jsx
<div className="bg-gray-900 text-white">
```

✅ **Do:**
```jsx
<div className="bg-background text-foreground">
```

### 2. Use Opacity Modifiers

The HSL format allows for opacity modifiers:

```jsx
<div className="bg-primary/10">   {/* 10% opacity */}
<div className="bg-primary/50">   {/* 50% opacity */}
<div className="bg-primary/90">   {/* 90% opacity */}
```

### 3. Maintain Contrast Ratios

Ensure all color combinations meet WCAG accessibility standards:
- Normal text: minimum 4.5:1 contrast ratio
- Large text: minimum 3:1 contrast ratio
- UI components: minimum 3:1 contrast ratio

### 4. Test Both Themes

Always test your components in both light and dark modes to ensure readability and visual consistency.

## File Structure

```
/apps/landing/
  ├── app/
  │   ├── globals.css        # CSS variables and utility classes
  │   └── layout.tsx         # Theme application
  └── tailwind.config.ts     # Tailwind configuration

/packages/ui/
  └── src/
      └── components/        # Components using semantic colors
```

## Migration Guide

If updating existing components:

1. Replace hardcoded colors with semantic tokens:
   - `bg-white` → `bg-background`
   - `text-gray-900` → `text-foreground`
   - `bg-gray-100` → `bg-muted`
   - `text-gray-600` → `text-muted-foreground`
   - `border-gray-200` → `border-border`

2. Update hover states:
   - `hover:bg-gray-100` → `hover:bg-muted`
   - `hover:bg-blue-600` → `hover:bg-primary/90`

3. Update focus states:
   - `focus:ring-blue-500` → `focus:ring-ring`
   - `focus:border-blue-500` → `focus:border-primary`

## Troubleshooting

### Colors Not Updating

If colors don't update when switching themes:
1. Ensure the `dark` class is being toggled on the `<html>` element
2. Check that CSS variables are properly defined for both themes
3. Verify Tailwind config is using the correct CSS variable format

### Build Errors

If you see errors about undefined classes:
1. Ensure all color tokens are defined in both `:root` and `.dark`
2. Check that Tailwind config properly references the CSS variables
3. Run `npm run build` to verify the configuration

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [HSL Color Model](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)