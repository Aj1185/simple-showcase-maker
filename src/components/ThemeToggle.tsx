import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'icon' | 'button';
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ 
  className, 
  variant = 'icon',
  size = 'md' 
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const handleToggle = () => {
    toggleTheme();
    
    // Dispatch custom event for cursor adaptation
    document.dispatchEvent(new CustomEvent('element-interact', { 
      detail: { 
        color: theme === 'dark' ? 'neon-cyan' : 'neon-purple',
        element: 'theme-toggle'
      } 
    }));
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleToggle}
        className={cn(
          'relative flex items-center gap-2 px-4 py-2 rounded-lg font-rajdhani font-medium',
          'glass-panel hover:scale-105 transition-colors duration-300',
          'focus:outline-none focus:ring-2 focus:ring-primary/50',
          'group overflow-hidden',
          className
        )}
        aria-label="Toggle theme"
      >
        <div className="relative flex items-center gap-2">
          <div className="relative">
            <Sun 
              className={cn(
                'absolute inset-0 transition-all duration-500',
                theme === 'light' 
                  ? 'opacity-100 rotate-0 scale-100' 
                  : 'opacity-0 rotate-90 scale-75'
              )}
              size={iconSizes[size]} 
            />
            <Moon 
              className={cn(
                'transition-all duration-500',
                theme === 'dark' 
                  ? 'opacity-100 rotate-0 scale-100' 
                  : 'opacity-0 -rotate-90 scale-75'
              )}
              size={iconSizes[size]} 
            />
          </div>
          <span className="text-sm">
            {theme === 'light' ? 'Light' : 'Dark'}
          </span>
        </div>
        
        {/* Animated background glow */}
        <div className={cn(
          'absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          theme === 'light' 
            ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' 
            : 'bg-gradient-to-r from-primary/20 to-accent/20'
        )} />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'relative rounded-lg glass-panel transition-colors duration-300',
        'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50',
        'group overflow-hidden flex items-center justify-center',
        sizeClasses[size],
        className
      )}
      aria-label="Toggle theme"
    >
      {/* Icon container with smooth transition */}
      <div className="relative flex items-center justify-center">
        <Sun 
          className={cn(
            'absolute transition-all duration-500 text-amber-500',
            theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-75'
          )}
          size={iconSizes[size]} 
        />
        <Moon 
          className={cn(
            'transition-all duration-500 text-slate-300',
            theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-75'
          )}
          size={iconSizes[size]} 
        />
      </div>
      
      {/* Animated background glow */}
      <div className={cn(
        'absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300',
        theme === 'light' 
          ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20' 
          : 'bg-gradient-to-br from-primary/20 to-accent/20'
      )} />
      
      {/* Subtle pulse animation */}
      <div className={cn(
        'absolute inset-0 rounded-lg opacity-0 group-active:opacity-50 transition-opacity duration-150',
        theme === 'light' 
          ? 'bg-yellow-500/30' 
          : 'bg-primary/30'
      )} />
    </button>
  );
}