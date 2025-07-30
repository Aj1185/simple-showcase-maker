import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'purple' | 'blue' | 'pink' | 'cyan';
  intensity?: 'low' | 'medium' | 'high';
}

const GlassCard = ({ children, className, glowColor = 'purple', intensity = 'medium' }: GlassCardProps) => {
  const glowIntensity = {
    low: 'neon-glow opacity-30',
    medium: 'neon-glow opacity-50',
    high: 'neon-glow opacity-70'
  };

  const glowColorClass = {
    purple: 'shadow-primary/20',
    blue: 'shadow-secondary/20', 
    pink: 'shadow-accent/20',
    cyan: 'shadow-neon-cyan/20'
  };

  return (
    <div className={cn(
      'glass-panel rounded-lg p-6 transition-all duration-300 hover:scale-[1.02]',
      glowIntensity[intensity],
      glowColorClass[glowColor],
      className
    )}>
      {children}
    </div>
  );
};

export default GlassCard;