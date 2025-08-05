import { Download, ArrowLeft, Award, Briefcase, GraduationCap, Code, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '@/components/GlassCard';
import LightTrailCursor from '@/components/LightTrailCursor';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';

const Resume = () => {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Atharva_Jangale_Resume.pdf';
    link.click();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      period: '2023 - Present',
      description: 'Leading development of enterprise-scale applications with React, Node.js, and cloud technologies.',
      achievements: ['Architected microservices handling 1M+ requests/day', 'Reduced deployment time by 60%', 'Led team of 5 developers']
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Innovations',
      period: '2021 - 2023', 
      description: 'Specialized in creating responsive, user-centric web applications with modern frameworks.',
      achievements: ['Improved page load times by 40%', 'Implemented design system used across 10+ projects', 'Mentored junior developers']
    },
    {
      title: 'Software Engineer Intern',
      company: 'StartupX',
      period: '2020 - 2021',
      description: 'Contributed to full-stack development and gained experience in agile methodologies.',
      achievements: ['Built 5+ feature modules', 'Participated in code reviews', 'Learned modern development practices']
    }
  ];

  const education = [
    {
      degree: 'Master of Computer Science',
      institution: 'Tech University',
      period: '2019 - 2021',
      gpa: '3.8/4.0',
      highlights: ['Machine Learning Specialization', 'Research in Quantum Computing', 'Dean\'s List']
    },
    {
      degree: 'Bachelor of Software Engineering',
      institution: 'Engineering College',
      period: '2015 - 2019',
      gpa: '3.6/4.0',
      highlights: ['Computer Science Society President', 'Published research paper', 'Graduated Magna Cum Laude']
    }
  ];

  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'] },
    { category: 'Cloud & DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'] },
    { category: 'Tools & Others', items: ['Git', 'GraphQL', 'REST APIs', 'WebGL', 'Three.js'] }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <LightTrailCursor />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="max-w-7xl mx-auto">
          <GlassCard className="p-4" intensity="low">
            <div className="flex justify-between items-center">
              <Link 
                to="/"
                className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden md:inline font-rajdhani font-medium">Back to Portfolio</span>
                <span className="md:hidden font-rajdhani font-medium">Portfolio</span>
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex">
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
            <Link 
              to="/"
              className="block w-full text-left text-lg font-rajdhani font-medium text-foreground/80 hover:text-primary transition-colors duration-300 py-2 flex items-center space-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
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
      <section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className={cn(
            'text-5xl md:text-6xl font-orbitron font-bold mb-6 transition-all duration-300',
            theme === 'dark' ? 'gradient-text hero-glow' : 'text-slate-800'
          )}>
            RESUME.EXE
          </h1>
          <p className="text-xl font-rajdhani text-gray-700 dark:text-muted-foreground mb-8 max-w-2xl mx-auto">
            A comprehensive overview of my professional journey, skills, and achievements 
            in the realm of software engineering and digital innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleDownload}
              className="font-rajdhani font-medium"
              size="lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </section>

      {/* PDF Viewer Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <GlassCard className="p-8" glowColor="purple">
            <div className="text-center mb-8">
              <h2 className={cn(
                'text-3xl font-orbitron font-bold mb-4',
                theme === 'dark' ? 'neon-text' : 'text-indigo-900'
              )}>
                DOCUMENT VIEWER
              </h2>
              <p className="text-gray-700 dark:text-muted-foreground font-rajdhani">
                Interactive PDF preview with full document access
              </p>
            </div>
            
            <div className="relative bg-muted/20 rounded-lg overflow-hidden" style={{ height: '600px' }}>
              <iframe
                src="/resume.pdf"
                className="w-full h-full border-0"
                title="Resume PDF"
              />
              <div className="absolute inset-0 pointer-events-none border-2 border-primary/20 rounded-lg" />
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={cn(
              'text-4xl md:text-5xl font-orbitron font-bold mb-6',
              theme === 'dark' ? 'neon-text' : 'text-indigo-900'
            )}>
              PROFESSIONAL EXPERIENCE
            </h2>
            <p className="text-lg font-rajdhani text-gray-700 dark:text-muted-foreground max-w-3xl mx-auto">
              A chronological journey through my professional evolution in the tech industry.
            </p>
          </div>

          <div className="space-y-8">
            {experience.map((job, index) => (
              <GlassCard key={index} className="p-8" glowColor="blue">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-orbitron font-bold text-slate-800 dark:text-white mb-2">
                          {job.title}
                        </h3>
                        <p className="text-lg font-rajdhani font-medium text-primary">
                          {job.company}
                        </p>
                      </div>
                      <span className="text-sm font-rajdhani text-gray-600 dark:text-muted-foreground bg-muted/30 px-3 py-1 rounded-full mt-2 md:mt-0">
                        {job.period}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-muted-foreground font-rajdhani mb-4 leading-relaxed">
                      {job.description}
                    </p>
                    
                    <div className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm font-rajdhani text-gray-700 dark:text-foreground">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={cn(
              'text-4xl md:text-5xl font-orbitron font-bold mb-6',
              theme === 'dark' ? 'neon-text' : 'text-indigo-900'
            )}>
              ACADEMIC FOUNDATION
            </h2>
            <p className="text-lg font-rajdhani text-gray-700 dark:text-muted-foreground max-w-3xl mx-auto">
              Educational background that laid the groundwork for technological expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <GlassCard key={index} className="p-8" glowColor="cyan">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-orbitron font-bold text-slate-800 dark:text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-lg font-rajdhani font-medium text-accent mb-2">
                      {edu.institution}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-rajdhani text-gray-600 dark:text-muted-foreground">
                        {edu.period}
                      </span>
                      <span className="text-sm font-rajdhani font-medium text-primary">
                        GPA: {edu.gpa}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {edu.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm font-rajdhani text-gray-700 dark:text-foreground">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={cn(
              'text-4xl md:text-5xl font-orbitron font-bold mb-6',
              theme === 'dark' ? 'neon-text' : 'text-indigo-900'
            )}>
              TECHNICAL ARSENAL
            </h2>
            <p className="text-lg font-rajdhani text-gray-700 dark:text-muted-foreground max-w-3xl mx-auto">
              A comprehensive collection of tools, technologies, and methodologies mastered through experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <GlassCard key={index} className="p-6" glowColor="pink">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Code className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-orbitron font-bold text-slate-800 dark:text-white">
                    {skillGroup.category}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {skillGroup.items.map((skill, i) => (
                    <div key={i} className="text-center">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-rajdhani font-medium">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-rajdhani text-gray-600 dark:text-muted-foreground">
            © 2025 Atharva Jangale. Document compiled with precision and technical excellence.
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

export default Resume;