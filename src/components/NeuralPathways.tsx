import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

// Tech skill data with the requested technologies
const techBubbles = [
  { name: 'Figma', icon: '🎨', color: 'purple', size: 'lg' },
  { name: 'HTML', icon: '🌐', color: 'blue', size: 'md' },
  { name: 'Google Cloud', icon: '☁️', color: 'cyan', size: 'lg' },
  { name: 'Next.js', icon: '⚡', color: 'pink', size: 'xl' },
  { name: 'TypeScript', icon: '📘', color: 'blue', size: 'lg' },
  { name: 'Git', icon: '🔀', color: 'purple', size: 'md' },
  { name: 'GitHub', icon: '🐙', color: 'cyan', size: 'lg' },
  { name: 'Node.js', icon: '🟢', color: 'pink', size: 'md' },
  { name: 'Canva', icon: '🎯', color: 'purple', size: 'sm' },
  { name: 'Firebase', icon: '🔥', color: 'blue', size: 'lg' },
  { name: 'SQL', icon: '🗃️', color: 'cyan', size: 'md' },
  { name: 'C++', icon: '⚙️', color: 'pink', size: 'lg' },
  { name: 'MS Office', icon: '📊', color: 'blue', size: 'sm' },
  { name: 'Vercel', icon: '▲', color: 'purple', size: 'md' },
  { name: 'React', icon: '⚛️', color: 'cyan', size: 'xl' },
  { name: 'Supabase', icon: '💾', color: 'pink', size: 'lg' }
];

interface BubbleProps {
  bubble: typeof techBubbles[0];
  index: number;
  mousePosition: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement>;
}

const TechBubble: React.FC<BubbleProps> = ({ bubble, index, mousePosition, containerRef }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Initialize random position
  useEffect(() => {
    const randomX = Math.random() * 80 + 10; // 10% to 90%
    const randomY = Math.random() * 80 + 10; // 10% to 90%
    setPosition({ x: randomX, y: randomY });
  }, []);

  // Magnetic effect based on cursor position
  useEffect(() => {
    if (!containerRef.current || !bubbleRef.current) return;

    const container = containerRef.current;
    const bubble = bubbleRef.current;
    const containerRect = container.getBoundingClientRect();
    const bubbleRect = bubble.getBoundingClientRect();

    // Calculate bubble center relative to container
    const bubbleCenterX = bubbleRect.left + bubbleRect.width / 2 - containerRect.left;
    const bubbleCenterY = bubbleRect.top + bubbleRect.height / 2 - containerRect.top;

    // Calculate distance from mouse to bubble center
    const deltaX = mousePosition.x - bubbleCenterX;
    const deltaY = mousePosition.y - bubbleCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Magnetic effect radius
    const magnetRadius = 150;
    const magnetStrength = 0.3;

    if (distance < magnetRadius) {
      const force = (magnetRadius - distance) / magnetRadius;
      const offsetX = deltaX * force * magnetStrength;
      const offsetY = deltaY * force * magnetStrength;

      controls.start({
        x: offsetX,
        y: offsetY,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
      });
    } else {
      controls.start({
        x: 0,
        y: 0,
        transition: { type: 'spring', stiffness: 200, damping: 25 }
      });
    }
  }, [mousePosition, controls, containerRef]);

  const sizeClasses = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-20 h-20 text-3xl',
    lg: 'w-24 h-24 text-4xl',
    xl: 'w-28 h-28 text-5xl'
  };

  const colorClasses = {
    purple: 'bg-primary/20 border-primary/30 hover:bg-primary/30 hover:shadow-primary/50',
    blue: 'bg-secondary/20 border-secondary/30 hover:bg-secondary/30 hover:shadow-secondary/50',
    cyan: 'bg-cyan-500/20 border-cyan-500/30 hover:bg-cyan-500/30 hover:shadow-cyan-500/50',
    pink: 'bg-accent/20 border-accent/30 hover:bg-accent/30 hover:shadow-accent/50'
  };

  return (
    <motion.div
      ref={bubbleRef}
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        ...controls 
      }}
      transition={{ 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 200,
        damping: 20
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={cn(
          'rounded-full border-2 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-300',
          'group hover:scale-110',
          sizeClasses[bubble.size],
          colorClasses[bubble.color]
        )}
        animate={{
          scale: isHovered ? 1.15 : 1,
          boxShadow: isHovered 
            ? '0 0 30px rgba(var(--primary), 0.6), 0 0 60px rgba(var(--primary), 0.3)'
            : '0 0 15px rgba(var(--primary), 0.2)'
        }}
        whileHover={{
          y: -5,
          transition: { type: 'spring', stiffness: 400 }
        }}
      >
        <span className="filter drop-shadow-lg">{bubble.icon}</span>
        
        {/* Tooltip */}
        <motion.div
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-border/50 shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: 'none' }}
        >
          <span className="text-sm font-rajdhani font-medium text-foreground whitespace-nowrap">
            {bubble.name}
          </span>
        </motion.div>
      </motion.div>

      {/* Floating animation */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: Math.random() * 2
        }}
        style={{ pointerEvents: 'none' }}
      />
    </motion.div>
  );
};

const NeuralPathways: React.FC = () => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position within container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section id="skills" className="chapter-section min-h-screen py-32 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-accent/5 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-2/3 w-24 h-24 bg-secondary/5 rounded-full blur-2xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-20">
          <motion.h2 
            className={cn(
              'text-5xl md:text-6xl font-space-grotesk font-bold mb-6 relative inline-block',
              theme === 'dark' ? 'neon-text' : 'text-indigo-900'
            )}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            NEURAL PATHWAYS
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.2, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          <motion.p 
            className="text-xl font-inter text-gray-700 dark:text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Interactive molecules of expertise, each skill floating in the digital cosmos, 
            ready to react and combine for extraordinary creations.
          </motion.p>
        </div>

        {/* Floating Bubbles Container */}
        <motion.div
          ref={containerRef}
          className="relative h-[600px] md:h-[700px] w-full"
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {techBubbles.map((bubble, index) => (
            <TechBubble
              key={bubble.name}
              bubble={bubble}
              index={index}
              mousePosition={mousePosition}
              containerRef={containerRef}
            />
          ))}
        </motion.div>

        {/* Mobile Grid Fallback - Hidden on larger screens */}
        <div className="block md:hidden mt-16">
          <div className="grid grid-cols-3 gap-6">
            {techBubbles.map((bubble, index) => {
              const mobileColorClasses = {
                purple: 'bg-primary/20 border-primary/30',
                blue: 'bg-secondary/20 border-secondary/30',
                cyan: 'bg-cyan-500/20 border-cyan-500/30',
                pink: 'bg-accent/20 border-accent/30'
              };
              
              return (
                <motion.div
                  key={`mobile-${bubble.name}`}
                  className={cn(
                    'rounded-full border-2 backdrop-blur-sm flex flex-col items-center justify-center p-4 aspect-square',
                    mobileColorClasses[bubble.color]
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl mb-1">{bubble.icon}</span>
                  <span className="text-xs font-rajdhani font-medium text-center">
                    {bubble.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeuralPathways;