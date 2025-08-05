import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

// Tech skill data with the requested 16 technologies
const techSkills = [
  { name: 'Figma', icon: '🎨', color: 'purple' },
  { name: 'HTML', icon: '🌐', color: 'blue' },
  { name: 'Google Cloud', icon: '☁️', color: 'cyan' },
  { name: 'Next.js', icon: '⚡', color: 'pink' },
  { name: 'TypeScript', icon: '📘', color: 'blue' },
  { name: 'Git', icon: '🔀', color: 'purple' },
  { name: 'GitHub', icon: '🐙', color: 'cyan' },
  { name: 'Node.js', icon: '🟢', color: 'pink' },
  { name: 'Canva', icon: '🎯', color: 'purple' },
  { name: 'Firebase', icon: '🔥', color: 'blue' },
  { name: 'SQL', icon: '🗃️', color: 'cyan' },
  { name: 'C++', icon: '⚙️', color: 'pink' },
  { name: 'MS Office', icon: '📊', color: 'blue' },
  { name: 'Vercel', icon: '▲', color: 'purple' },
  { name: 'React', icon: '⚛️', color: 'cyan' },
  { name: 'Supabase', icon: '💾', color: 'pink' }
];

const NeuralPathways: React.FC = () => {
  const { theme } = useTheme();

  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    fpsLimit: 60,
    particles: {
      number: { 
        value: 16,
        density: {
          enable: true,
          area: 800
        }
      },
      shape: {
        type: "circle" as const
      },
      color: {
        value: ["#8b5cf6", "#06b6d4", "#ec4899", "#3b82f6"]
      },
      opacity: {
        value: 0.8,
        random: {
          enable: true,
          minimumValue: 0.6
        }
      },
      size: { 
        value: 60,
        random: { 
          enable: true, 
          minimumValue: 45 
        }
      },
      stroke: {
        width: 2,
        color: {
          value: ["#8b5cf6", "#06b6d4", "#ec4899", "#3b82f6"]
        }
      },
      move: { 
        enable: true, 
        speed: 0.8,
        direction: "none" as const,
        random: true,
        straight: false,
        outModes: {
          default: "bounce" as const
        },
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      },
      life: {
        duration: {
          sync: false,
          value: 3
        },
        count: 0,
        delay: {
          random: {
            enable: true,
            minimumValue: 0.5
          },
          value: 1
        }
      }
    },
    interactivity: {
      detectsOn: "canvas" as const,
      events: {
        onHover: { 
          enable: true, 
          mode: "repulse" as const
        },
        onClick: { 
          enable: true, 
          mode: "repulse" as const
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 120,
          duration: 0.4,
          factor: 100,
          speed: 1,
          maxSpeed: 50,
          easing: "ease-out-quad" as const
        },
        grab: {
          distance: 400,
          links: {
            opacity: 1
          }
        }
      }
    },
    detectRetina: true,
    responsive: [
      {
        maxWidth: 767,
        options: {
          particles: { 
            number: { value: 0 } 
          }
        }
      }
    ],
    background: {
      color: "transparent"
    }
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
            ready to repel from your cursor like charged particles in this neural network.
          </motion.p>
        </div>

        {/* Desktop: React TSParticles Bubble Field */}
        <motion.div
          className="hidden md:block relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Particles
            id="neural-pathways"
            init={particlesInit}
            options={particlesOptions}
            className="relative h-[600px] md:h-[700px] w-full cursor-crosshair"
            style={{
              background: 'transparent'
            }}
          />
          
          {/* Skill labels overlay - positioned absolutely to match particles */}
          <div className="absolute inset-0 pointer-events-none">
            {techSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="absolute flex flex-col items-center justify-center"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="text-4xl mb-2 filter drop-shadow-lg">
                  {skill.icon}
                </div>
                <div className="bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-rajdhani font-medium text-foreground border border-border/50">
                  {skill.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile: Grid Fallback */}
        <div className="block md:hidden">
          <div className="grid grid-cols-2 gap-6">
            {techSkills.map((skill, index) => {
              const mobileColorClasses = {
                purple: 'bg-primary/20 border-primary/30 hover:bg-primary/30 hover:shadow-lg hover:shadow-primary/25',
                blue: 'bg-secondary/20 border-secondary/30 hover:bg-secondary/30 hover:shadow-lg hover:shadow-secondary/25',
                cyan: 'bg-cyan-500/20 border-cyan-500/30 hover:bg-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/25',
                pink: 'bg-accent/20 border-accent/30 hover:bg-accent/30 hover:shadow-lg hover:shadow-accent/25'
              };
              
              return (
                <motion.div
                  key={`mobile-${skill.name}`}
                  className={cn(
                    'rounded-2xl border-2 backdrop-blur-sm flex flex-col items-center justify-center p-6 transition-all duration-300',
                    mobileColorClasses[skill.color]
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="text-3xl mb-3 filter drop-shadow-lg">{skill.icon}</span>
                  <span className="text-sm font-rajdhani font-medium text-center leading-tight">
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
          
          {/* Mobile Instructions */}
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-rajdhani text-muted-foreground">
              Tap each skill to see interaction
            </p>
          </motion.div>
        </div>

        {/* Desktop Instructions */}
        <motion.div 
          className="hidden md:block text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-rajdhani text-muted-foreground">
            Move your cursor to see the neural network respond • Click to create ripples
          </p>
        </motion.div>
      </div>

      {/* 
        CONFIGURATION NOTES for react-tsparticles:
        - To add new skills: Add entries to techSkills array and increase particles.number.value
        - To adjust repulsion distance: Modify interactivity.modes.repulse.distance
        - To change repulsion strength: Adjust interactivity.modes.repulse.factor
        - Bubble sizes: Change particles.size.value and minimumValue
        - Movement speed: Modify particles.move.speed
        - Colors: Update particles.color.value array with CSS custom property values
      */}
    </section>
  );
};

export default NeuralPathways;