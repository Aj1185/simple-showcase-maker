import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';


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
        type: "image" as const,
        image: [
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/figma.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/html5.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/googlecloud.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/nextdotjs.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/typescript.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/git.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/github.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/nodedotjs.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/canva.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/firebase.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/mysql.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/cplusplus.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/microsoftoffice.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/vercel.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/react.svg", width: 60, height: 60 },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/supabase.svg", width: 60, height: 60 }
        ]
      },
      opacity: {
        value: 0.9,
        random: {
          enable: true,
          minimumValue: 0.7
        }
      },
      size: { 
        value: 60,
        random: { 
          enable: true, 
          minimumValue: 45 
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
            number: { value: 8 } 
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

        {/* Unified Logo Bubble Field */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Particles
            id="neural-pathways"
            init={particlesInit}
            options={particlesOptions}
            className="relative h-[500px] md:h-[700px] w-full cursor-crosshair"
            style={{
              background: 'transparent'
            }}
          />
        </motion.div>

        {/* Instructions */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-rajdhani text-muted-foreground">
            <span className="hidden md:inline">Move your cursor to see the neural network respond • Click to create ripples</span>
            <span className="md:hidden">Tap the floating logos to see them repel</span>
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