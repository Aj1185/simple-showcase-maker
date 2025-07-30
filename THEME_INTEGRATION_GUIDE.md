# Dark/Light Theme Toggle Integration Guide

This guide walks you through the complete implementation of a dark/light theme toggle system for your React + Tailwind portfolio.

## 🎯 What We've Implemented

- ✅ **Reusable ThemeToggle component** with accessible toggle button (moon/sun icons)
- ✅ **Tailwind's `dark:` classes** with explicit class strategy (not media query)
- ✅ **localStorage persistence** with dark mode as default
- ✅ **Smooth transitions** on background, text, and card colors
- ✅ **Global theme integration** via React Context
- ✅ **Full accessibility** with focus outlines, aria-labels, and keyboard support
- ✅ **Lucide React icons** (Moon/Sun) with smooth animations

## 📁 Files Created/Modified

### New Files Created:
1. `src/hooks/useTheme.tsx` - Theme context and provider
2. `src/components/ThemeToggle.tsx` - Reusable theme toggle component
3. `THEME_INTEGRATION_GUIDE.md` - This integration guide

### Files Modified:
1. `src/App.tsx` - Added ThemeProvider wrapper
2. `src/pages/Index.tsx` - Added ThemeToggle to navigation
3. `src/index.css` - Added light theme variables and smooth transitions

## 🔧 Step-by-Step Integration

### Step 1: Theme Context Setup
The `useTheme` hook provides:
- Current theme state ('light' | 'dark')
- `toggleTheme()` function
- `setTheme()` for explicit theme setting
- localStorage persistence with 'dark' as default

### Step 2: App-Level Integration
```tsx
// src/App.tsx
import { ThemeProvider } from "@/hooks/useTheme";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>  {/* Wrap your app */}
      {/* Your existing components */}
    </ThemeProvider>
  </QueryClientProvider>
);
```

### Step 3: Theme Toggle Component Usage
The ThemeToggle component supports two variants:

#### Icon Variant (Used in Navigation):
```tsx
<ThemeToggle variant="icon" size="md" />
```

#### Button Variant (Alternative Option):
```tsx
<ThemeToggle variant="button" size="lg" />
```

### Step 4: CSS Theme Variables
Light and dark themes are defined in `src/index.css`:

- **Dark Theme**: Cyberpunk colors (electric purple, neon blue, deep charcoal)
- **Light Theme**: Clean, professional colors (softer purples, light backgrounds)
- **Smooth Transitions**: 300ms cubic-bezier transitions on background/text colors

## 🎨 Theme Colors

### Dark Theme (Default)
- Background: `hsl(0 0% 7%)` - Deep charcoal
- Primary: `hsl(270 100% 70%)` - Electric purple
- Secondary: `hsl(200 100% 60%)` - Electric blue
- Accent: `hsl(320 100% 70%)` - Neon pink

### Light Theme
- Background: `hsl(0 0% 98%)` - Near white
- Primary: `hsl(270 60% 50%)` - Softer purple
- Secondary: `hsl(200 60% 45%)` - Softer blue
- Accent: `hsl(320 60% 55%)` - Softer pink

## 🎯 Current Placement

The theme toggle is placed in the **top-right navigation bar**, next to the navigation menu items. This provides:
- Easy access without cluttering the design
- Consistent visibility across all sections
- Natural placement users expect for theme toggles

## ♿ Accessibility Features

- **Keyboard Support**: Full keyboard navigation and activation
- **ARIA Labels**: Screen reader support with dynamic labels
- **Focus Indicators**: Visible focus rings using design system colors
- **Color Contrast**: Meets WCAG guidelines in both themes
- **Motion**: Respects user preferences for reduced motion

## 🎭 Animation Features

- **Icon Transitions**: Smooth 500ms rotation and scale animations
- **Background Glow**: Hover effects with theme-appropriate colors
- **Scale Effects**: Subtle hover and active state feedback
- **Color Transitions**: Smooth theme switching across all elements

## 🔄 How It Works

1. **Initial Load**: Checks localStorage for saved theme, defaults to 'dark'
2. **Theme Switch**: Updates document class, saves to localStorage
3. **CSS Application**: Tailwind applies appropriate theme variables
4. **Component Updates**: All components automatically use new theme colors
5. **Cursor Integration**: Dispatches events for custom cursor color adaptation

## 🚀 Usage Examples

### Basic Usage (Already Implemented):
```tsx
// In navigation (already done)
<ThemeToggle variant="icon" size="md" />
```

### Alternative Placements:
```tsx
// In a settings panel
<ThemeToggle variant="button" size="lg" className="w-full" />

// In a floating action area
<ThemeToggle variant="icon" size="sm" className="fixed bottom-4 right-4" />
```

### Programmatic Control:
```tsx
import { useTheme } from '@/hooks/useTheme';

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();
  
  // Force dark mode
  const forceDark = () => setTheme('dark');
  
  // Toggle theme
  const toggle = () => toggleTheme();
  
  return (
    <div>
      Current theme: {theme}
      <button onClick={toggle}>Toggle Theme</button>
    </div>
  );
}
```

## ✅ Testing Checklist

- [ ] Theme persists across browser sessions
- [ ] Smooth transitions when switching themes
- [ ] All components respect theme colors
- [ ] Keyboard navigation works properly
- [ ] Screen reader accessibility functions
- [ ] Mobile touch interaction works
- [ ] No flash of wrong theme on page load
- [ ] Custom cursor adapts to theme changes

## 🎉 That's It!

Your portfolio now has a fully functional, accessible dark/light theme toggle system! The theme preference is automatically saved and restored, all components smoothly transition between themes, and the toggle integrates seamlessly with your cyberpunk design aesthetic.

The system defaults to dark mode to maintain your portfolio's futuristic aesthetic while offering users the choice of a clean light mode when preferred.