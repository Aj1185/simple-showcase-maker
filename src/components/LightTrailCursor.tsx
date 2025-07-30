import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

const LightTrailCursor = () => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [accentColor, setAccentColor] = useState('neon-purple');
  const [isHeroHover, setIsHeroHover] = useState(false);
  const [currentElementColor, setCurrentElementColor] = useState<string | null>(null);

  useEffect(() => {
    let frameId: number;
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      // Add new trail point
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++,
        timestamp: Date.now()
      };

      setTrail(prev => [...prev, newPoint]);
    };

    const updateTrail = () => {
      const now = Date.now();
      const trailDuration = isHeroHover ? 2000 : 1000; // Longer trails when hovering hero
      setTrail(prev => 
        prev.filter(point => now - point.timestamp < trailDuration)
      );
      frameId = requestAnimationFrame(updateTrail);
    };

    // Cycle through accent colors every 5 seconds, but use element colors when interacting
    const colorInterval = setInterval(() => {
      if (!isHeroHover && !currentElementColor) {
        const colors = ['neon-purple', 'neon-blue', 'neon-pink', 'neon-cyan'];
        setAccentColor(prev => {
          const currentIndex = colors.indexOf(prev);
          return colors[(currentIndex + 1) % colors.length];
        });
      }
    }, 5000);

    // Listen for hero hover events
    const handleHeroEnter = () => {
      setIsHeroHover(true);
      setAccentColor('neon-blue');
    };

    const handleHeroLeave = () => {
      setIsHeroHover(false);
      setCurrentElementColor(null);
    };

    // Listen for element interaction events
    const handleElementInteract = (event: CustomEvent) => {
      const { color } = event.detail;
      setCurrentElementColor(color);
      setAccentColor(color);
      
      // Reset to normal cycling after 2 seconds
      setTimeout(() => {
        if (!isHeroHover) {
          setCurrentElementColor(null);
        }
      }, 2000);
    };

    // Listen for section enter events (connect section pulse)
    const handleSectionEnter = (event: CustomEvent) => {
      const { section, pulseIntensity } = event.detail;
      if (section === 'connect') {
        setAccentColor('neon-purple');
        // Create a brief pulse effect
        setTrail(prev => prev.map(point => ({
          ...point,
          timestamp: point.timestamp - 500 // Make existing trails fade faster for pulse effect
        })));
      }
    };

    document.addEventListener('hero-enter', handleHeroEnter);
    document.addEventListener('hero-leave', handleHeroLeave);
    document.addEventListener('element-interact', handleElementInteract as EventListener);
    document.addEventListener('section-enter', handleSectionEnter as EventListener);

    document.addEventListener('mousemove', handleMouseMove);
    frameId = requestAnimationFrame(updateTrail);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('hero-enter', handleHeroEnter);
      document.removeEventListener('hero-leave', handleHeroLeave);
      document.removeEventListener('element-interact', handleElementInteract as EventListener);
      document.removeEventListener('section-enter', handleSectionEnter as EventListener);
      cancelAnimationFrame(frameId);
      clearInterval(colorInterval);
    };
  }, [currentElementColor, isHeroHover]);

  const getAccentColorValue = (color: string) => {
    if (theme === 'light') {
      // Muted/darker pastel trails for light mode
      switch (color) {
        case 'neon-purple': return 'hsl(260, 40%, 45%)';
        case 'neon-blue': return 'hsl(200, 35%, 40%)';
        case 'neon-pink': return 'hsl(320, 30%, 50%)';
        case 'neon-cyan': return 'hsl(180, 35%, 45%)';
        default: return 'hsl(260, 40%, 45%)';
      }
    } else {
      // Vibrant neon trails for dark mode
      switch (color) {
        case 'neon-purple': return 'hsl(270, 100%, 70%)';
        case 'neon-blue': return 'hsl(200, 100%, 60%)';
        case 'neon-pink': return 'hsl(320, 100%, 70%)';
        case 'neon-cyan': return 'hsl(180, 100%, 65%)';
        default: return 'hsl(270, 100%, 70%)';
      }
    }
  };

  const getTrailOpacity = () => {
    return theme === 'light' ? 0.4 : 0.6; // More muted in light mode
  };

  const getGlowIntensity = () => {
    return theme === 'light' ? 8 : 15; // Softer glow in light mode
  };

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      {/* Main cursor */}
      <div
        className={`fixed w-4 h-4 rounded-full transition-all duration-300 ease-out ${
          theme === 'light' ? 'mix-blend-multiply' : 'mix-blend-difference'
        }`}
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          background: getAccentColorValue(accentColor),
          boxShadow: theme === 'light' 
            ? `0 0 12px ${getAccentColorValue(accentColor)}80, 0 0 24px ${getAccentColorValue(accentColor)}40`
            : `0 0 20px ${getAccentColorValue(accentColor)}, 0 0 40px ${getAccentColorValue(accentColor)}40`,
          filter: theme === 'light' ? 'blur(0.5px)' : 'none'
        }}
      />
      
      {/* Trail points */}
      {trail.map((point, index) => {
        const age = Date.now() - point.timestamp;
        const opacity = Math.max(0, 1 - age / 1000);
        const scale = Math.max(0.1, 1 - age / 1000);
        
        const size = isHeroHover ? 3 : 2;
        const baseOpacity = getTrailOpacity();
        const glowSize = getGlowIntensity();
        
        return (
          <div
            key={point.id}
            className="fixed rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: point.x - size / 2,
              top: point.y - size / 2,
              background: getAccentColorValue(accentColor),
              opacity: opacity * (isHeroHover ? baseOpacity * 1.3 : baseOpacity),
              transform: `scale(${scale})`,
              boxShadow: theme === 'light'
                ? `0 0 ${glowSize}px ${getAccentColorValue(accentColor)}${Math.round(opacity * 60).toString(16)}`
                : `0 0 ${isHeroHover ? 15 : 10}px ${getAccentColorValue(accentColor)}${Math.round(opacity * (isHeroHover ? 80 : 60)).toString(16)}`,
              filter: theme === 'light' ? 'blur(0.5px)' : 'none'
            }}
          />
        );
      })}
    </div>
  );
};

export default LightTrailCursor;