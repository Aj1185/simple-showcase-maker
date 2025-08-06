import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code2, Palette, Zap, Instagram, MessageCircle, FileText, ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import LightTrailCursor from '@/components/LightTrailCursor';
import WorkGallery from '@/components/WorkGallery';
import BookOfGlory from '@/components/BookOfGlory';
import NeuralPathways from '@/components/NeuralPathways';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import avatarImage from '@/assets/avatar-3d.png';


const Index = () => {
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update current section based on scroll position
      const sections = document.querySelectorAll('.chapter-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        if (scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };


  const projects = [
    {
      title: 'Modern E-commerce Platform',
      description: 'A fully responsive e-commerce platform with advanced filtering and payment integration. Website is still under construction not fully deployed',
      tech: ['React', 'Three.js', 'TensorFlow.js'],
      color: 'purple' as const
    },
    {
      title: 'Brain Buddy',
      description: 'BrainBuddy is an innovative AI-powered learning platform designed specifically for students under 15. It transforms traditional study sessions into gamified learning adventures.',
      tech: ['Vue.js', 'D3.js', 'WebGL'],
      color: 'cyan' as const
    },
    {
      title: 'Cyberpunk CMS',
      description: 'Futuristic content management system with AI-powered content generation.',
      tech: ['Next.js', 'OpenAI', 'Prisma'],
      color: 'pink' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <LightTrailCursor />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="max-w-7xl mx-auto">
          <GlassCard className="p-4" intensity="low">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-orbitron font-bold neon-text">
                ./portfolio
              </div>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <div className="flex space-x-6">
                  {['About', 'Skills', 'Projects', 'Certificates', 'Contact'].map((item, index) => (
                    <button
                      key={item}
                      className={cn(
                        'text-sm font-rajdhani font-medium transition-colors duration-300',
                        currentSection === index 
                          ? 'text-primary glow-text' 
                          : 'text-foreground/80 hover:text-primary'
                      )}
                      onClick={() => scrollToSection(item.toLowerCase())}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <Link 
                  to="/resume"
                  className="text-sm font-rajdhani font-medium text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center space-x-1"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                </Link>
                <ThemeToggle variant="icon" size="md" />
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </GlassCard>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <aside
        id="mobile-menu"
        ref={mobileMenuRef}
        className={cn(
          'fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-background/95 backdrop-blur-md border-l border-border/20 z-50 transform transition-transform duration-300 ease-out',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="text-xl font-orbitron font-bold neon-text">
              Menu
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-foreground/80 hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {['About', 'Skills', 'Projects', 'Certificates', 'Contact'].map((item, index) => (
              <button
                key={item}
                className={cn(
                  'block w-full text-left text-lg font-rajdhani font-medium transition-colors duration-300 py-2',
                  currentSection === index 
                    ? 'text-primary glow-text' 
                    : 'text-foreground/80 hover:text-primary'
                )}
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
            <Link 
              to="/resume"
              className="block w-full text-left text-lg font-rajdhani font-medium text-foreground/80 hover:text-primary transition-colors duration-300 py-2 flex items-center space-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText className="w-5 h-5" />
              <span>Resume</span>
            </Link>
            
            <div className="pt-4 border-t border-border/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-rajdhani text-foreground/60">Theme</span>
                <ThemeToggle variant="icon" size="md" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Hero Section */}
      <section 
        id="about" 
        className="chapter-section min-h-screen flex items-center justify-center relative py-20"
        onMouseEnter={() => document.dispatchEvent(new CustomEvent('hero-enter'))}
        onMouseLeave={() => document.dispatchEvent(new CustomEvent('hero-leave'))}
      >
        {/* Animated particle background */}
        <div className="absolute inset-0 particles-bg opacity-40" />
        
        {/* Dynamic light streaks */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-96 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 animate-pulse delay-1000" />
          <div className="absolute bottom-1/3 right-0 w-64 h-0.5 bg-gradient-to-l from-transparent via-accent to-transparent opacity-40 animate-pulse delay-2000" />
          <div className="absolute top-2/3 left-1/3 w-48 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-25 animate-pulse delay-3000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              <GlassCard className="p-8 lg:p-12 max-w-lg" glowColor="purple" intensity="medium">
                {/* Profile Image */}
                <motion.div 
                  className="flex justify-center lg:justify-start mb-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative">
                    <img 
                      src={avatarImage} 
                      alt="Atharva Jangale" 
                      className="w-28 h-28 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-lg animate-pulse delay-500" />
                  </div>
                </motion.div>
                
                {/* Headline */}
                <motion.h1 
                  className={cn(
                    'text-3xl lg:text-4xl font-space-grotesk font-bold mb-4 text-center lg:text-left transition-all duration-300',
                    theme === 'dark'
                      ? 'gradient-text'
                      : 'text-slate-800'
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{ 
                    textShadow: theme === 'dark' ? '0 0 20px rgba(147, 51, 234, 0.3)' : 'none'
                  }}
                >
                  Hi, I'm Atharva Jangale
                </motion.h1>
                
                {/* Tagline */}
                <motion.p 
                  className="text-lg font-inter text-gray-700 dark:text-muted-foreground mb-8 leading-relaxed text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Crafting digital experiences at the edge of technology and design
                </motion.p>
                
                {/* Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Link 
                    to="/resume"
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-xl text-primary font-rajdhani font-semibold transition-all duration-300 hover:scale-105 group"
                  >
                    <FileText className="w-5 h-5" />
                    <span>📄 View Resume</span>
                  </Link>
                  
                  <button 
                    onClick={() => {
                      const element = document.getElementById('contact');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-secondary/20 hover:bg-secondary/30 border border-secondary/40 rounded-xl text-secondary font-rajdhani font-semibold transition-all duration-300 hover:scale-105 group"
                  >
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>🔗 Let's Connect</span>
                  </button>
                </motion.div>
              </GlassCard>
            </motion.div>

            {/* Right Column - About Me */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="w-full"
            >
              <GlassCard className="p-8 lg:p-12" glowColor="cyan" intensity="low">
                <motion.h2 
                  className={cn(
                    'text-2xl lg:text-3xl font-space-grotesk font-bold mb-6',
                    theme === 'dark' ? 'text-accent neon-text' : 'text-slate-800'
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  About Me
                </motion.h2>
                
                <motion.div 
                  className="space-y-4 text-gray-700 dark:text-muted-foreground font-inter leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <p>
                    Engineer by discipline, creative by nature — I build interfaces where code meets art. 
                    Passionate about AI, IoT, and meaningful digital experiences.
                  </p>
                  <p>
                    Every project is an opportunity to push boundaries and create something that doesn't just work, 
                    but inspires and delights users in the digital frontier.
                  </p>
                </motion.div>
              </GlassCard>
            </motion.div>
          </div>
          
          {/* Floating scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs font-rajdhani text-muted-foreground uppercase tracking-wider">Scroll Down</span>
              <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
            </div>
          </motion.div>
        </div>
        
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </section>

      {/* Neural Pathways Skills Section */}
      <NeuralPathways />

      {/* Work Gallery */}
      <WorkGallery />

      {/* Book of Glory */}
      <BookOfGlory />

      {/* Contact Section */}
      <section id="contact" className="chapter-section min-h-screen py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={cn(
            'text-5xl md:text-6xl font-orbitron font-bold mb-6',
            theme === 'dark' ? 'neon-text' : 'text-indigo-900'
          )}>
            ESTABLISH CONNECTION
          </h2>
          <p className="text-xl font-rajdhani text-gray-700 dark:text-muted-foreground mb-16 max-w-2xl mx-auto">
            Ready to build the future together? Let's create something 
            extraordinary that pushes the boundaries of what's possible.
          </p>

          <GlassCard glowColor="purple" className="p-12" intensity="high">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {/* Email - Replace with your email link */}
              <a 
                href="mailto:Atharvajangale778@gmail.com" 
                className="text-center group hover:scale-110 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/40 transition-colors">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-orbitron font-semibold mb-2 text-slate-800 dark:text-white">Email</h3>
                <p className="text-gray-700 dark:text-muted-foreground font-rajdhani">Atharvajangale778@gmail.com</p>
              </a>
              
              {/* LinkedIn - Replace with your LinkedIn profile URL */}
              <a 
                href="https://linkedin.com/in/atharva-jangale" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center group hover:scale-110 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/40 transition-colors">
                  <Linkedin className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-orbitron font-semibold mb-2 text-slate-800 dark:text-white">LinkedIn</h3>
                <p className="text-gray-700 dark:text-muted-foreground font-rajdhani">atharva-jangale</p>
              </a>
              
              {/* GitHub - Replace with your GitHub profile URL */}
              <a 
                href="https://github.com/aj1185" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center group hover:scale-110 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/40 transition-colors">
                  <Github className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-orbitron font-semibold mb-2 text-slate-800 dark:text-white">GitHub</h3>
                <p className="text-gray-700 dark:text-muted-foreground font-rajdhani">aj1185</p>
              </a>

              {/* Instagram - Replace with your Instagram profile URL */}
              <a 
                href="https://instagram.com/aj__1185" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center group hover:scale-110 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-500/40 transition-colors">
                  <Instagram className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="font-orbitron font-semibold mb-2 text-slate-800 dark:text-white">Instagram</h3>
                <p className="text-gray-700 dark:text-muted-foreground font-rajdhani">aj__1185</p>
              </a>

              {/* Discord - Replace with your Discord invite/profile URL */}
              <a 
                href="https://discord.com/users/772346396119924769" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center group hover:scale-110 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-500/40 transition-colors">
                  <MessageCircle className="w-8 h-8 text-indigo-500" />
                </div>
                <h3 className="font-orbitron font-semibold mb-2 text-slate-800 dark:text-white">Discord</h3>
                <p className="text-gray-700 dark:text-muted-foreground font-rajdhani">aj1185</p>
              </a>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-rajdhani text-gray-600 dark:text-muted-foreground">
            © 2025 Atharva Jangale. Crafted in the neon-lit depths of the digital frontier.
          </p>
        </div>
      </footer>

      {/* Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
    </div>
  );
};

export default Index;