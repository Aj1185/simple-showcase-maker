import { useState } from 'react';
import { ExternalLink, Download, Eye, Calendar, Award, ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  thumbnail: string;
  downloadUrl: string;
  description: string;
}

const WorkGallery = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [certificateIndex, setCertificateIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Mock data - in real app, this would come from your backend/Supabase
  const allProjects: Project[] = [
    {
      id: '1',
      title: 'E-commerce Platform',
      summary: 'Interactive 3D visualization of neural network architectures with real-time training data and performance metrics.',
      description: 'A comprehensive neural network visualization tool built with React and Three.js. Features real-time training visualization, architecture editing, and performance analytics.',
      tech: ['React', 'Three.js', 'TensorFlow.js', 'WebGL'],
      image: '/api/placeholder/400/250',
      liveUrl: 'https://neon-genesis.vercel.app/',
      githubUrl: 'https://github.com/ankushkhakale/Neon-Genesis.git',
      featured: true
    },
    {
      id: '2',
      title: 'Quantum Dashboard',
      summary: 'Real-time quantum computing metrics dashboard with holographic data representation and predictive analytics.',
      description: 'Advanced dashboard for quantum computing systems with real-time monitoring, holographic visualization, and ML-powered predictions.',
      tech: ['Vue.js', 'D3.js', 'WebGL', 'Python'],
      image: '/api/placeholder/400/250',
      liveUrl: 'https://quantum-dash.demo',
      featured: true
    },
    {
      id: '3',
      title: 'Cyberpunk CMS',
      summary: 'Futuristic content management system with AI-powered content generation and blockchain verification.',
      description: 'Next-generation CMS with AI content generation, blockchain-based verification, and cyberpunk-themed interface.',
      tech: ['Next.js', 'OpenAI', 'Prisma', 'Blockchain'],
      image: '/api/placeholder/400/250',
      githubUrl: 'https://github.com/user/cyber-cms',
      featured: true
    },
    {
      id: '4',
      title: 'AI Trading Bot',
      summary: 'Automated cryptocurrency trading system using machine learning algorithms and sentiment analysis.',
      description: 'Sophisticated trading bot leveraging ML algorithms, sentiment analysis, and technical indicators for automated trading.',
      tech: ['Python', 'TensorFlow', 'API Integration', 'Docker'],
      image: '/api/placeholder/400/250',
      featured: false
    },
    {
      id: '5',
      title: 'VR Space Explorer',
      summary: 'Virtual reality application for exploring procedurally generated galaxies and cosmic phenomena.',
      description: 'Immersive VR experience featuring procedural galaxy generation, realistic physics, and educational content.',
      tech: ['Unity', 'C#', 'VR SDK', 'Procedural Generation'],
      image: '/api/placeholder/400/250',
      featured: false
    },
    {
      id: '6',
      title: 'Blockchain Validator',
      summary: 'Decentralized validation network for smart contracts with automated security analysis.',
      description: 'Distributed system for validating smart contracts using formal verification and automated security audits.',
      tech: ['Solidity', 'Node.js', 'Web3', 'Formal Verification'],
      image: '/api/placeholder/400/250',
      featured: false
    },
    {
      id: '7',
      title: 'Quantum Encryption',
      summary: 'Post-quantum cryptography implementation for secure communication protocols.',
      description: 'Advanced encryption system using post-quantum algorithms to ensure security against quantum computing threats.',
      tech: ['Rust', 'Cryptography', 'Quantum Algorithms', 'Security'],
      image: '/api/placeholder/400/250',
      featured: false
    },
    {
      id: '8',
      title: 'Neural Style Transfer',
      summary: 'Real-time artistic style transfer using advanced neural networks and GPU acceleration.',
      description: 'AI-powered application for real-time artistic style transfer with custom model training and optimization.',
      tech: ['PyTorch', 'CUDA', 'Computer Vision', 'GPU Computing'],
      image: '/api/placeholder/400/250',
      featured: false
    }
  ];

  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      date: '2024-01-15',
      thumbnail: '/api/placeholder/200/150',
      downloadUrl: '/certificates/aws-architect.pdf',
      description: 'Advanced cloud architecture and solution design certification'
    },
    {
      id: '2',
      title: 'Machine Learning Engineer',
      issuer: 'Google Cloud',
      date: '2023-11-20',
      thumbnail: '/api/placeholder/200/150',
      downloadUrl: '/certificates/gcp-ml.pdf',
      description: 'Professional machine learning engineering certification'
    },
    {
      id: '3',
      title: 'Cybersecurity Specialist',
      issuer: 'CompTIA',
      date: '2023-09-10',
      thumbnail: '/api/placeholder/200/150',
      downloadUrl: '/certificates/comptia-sec.pdf',
      description: 'Advanced cybersecurity and threat analysis certification'
    },
    {
      id: '4',
      title: 'Full Stack Developer',
      issuer: 'Meta',
      date: '2023-07-05',
      thumbnail: '/api/placeholder/200/150',
      downloadUrl: '/certificates/meta-fullstack.pdf',
      description: 'Professional full-stack development certification'
    }
  ];

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setVisibleProjects(prev => Math.min(prev + 3, allProjects.length));
      setLoading(false);
    }, 800);
  };

  const handleCardHover = (cardId: string, isEntering: boolean) => {
    if (isEntering) {
      const event = new CustomEvent('card-hover', { 
        detail: { 
          cardId,
          color: 'neon-purple',
          action: 'enter'
        } 
      });
      document.dispatchEvent(event);
    }
  };

  const nextCertificate = () => {
    setCertificateIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCertificate = () => {
    setCertificateIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <div 
      key={project.id}
      className="group cursor-pointer relative overflow-hidden"
      onMouseEnter={() => handleCardHover(project.id, true)}
      onMouseLeave={() => handleCardHover(project.id, false)}
      onClick={() => setSelectedProject(project)}
    >
      <GlassCard 
        className="project-card h-full"
        glowColor="purple"
      >
        <div className="aspect-video bg-muted/20 rounded-lg mb-4 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <h3 className="text-xl font-orbitron font-bold mb-3 text-indigo-900 dark:text-white group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-700 dark:text-muted-foreground font-rajdhani leading-relaxed mb-4 line-clamp-3">
          {project.summary}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 2).map((tech) => (
              <span 
                key={tech}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-rajdhani"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 2 && (
                     <span className="px-2 py-1 bg-muted/30 text-gray-600 dark:text-muted-foreground text-xs rounded-full font-rajdhani">
                +{project.tech.length - 2}
              </span>
            )}
          </div>
          
          <Button variant="ghost" size="sm" className="text-primary hover:text-white">
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
        </div>
        
        {/* Hover border effect */}
        <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/50 transition-all duration-300 pointer-events-none" />
      </GlassCard>
    </div>
  );

  const CertificateCard = ({ certificate, index }: { certificate: Certificate; index: number }) => (
    <div 
      className={`flex-shrink-0 w-48 cursor-pointer transition-all duration-300 ${
        index === certificateIndex ? 'scale-105' : 'scale-95 opacity-70'
      }`}
      onClick={() => setSelectedCertificate(certificate)}
    >
      <GlassCard className="p-4" glowColor="blue">
        <div className="aspect-[4/3] bg-muted/20 rounded-lg mb-3 overflow-hidden">
          <img 
            src={certificate.thumbnail} 
            alt={certificate.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="font-orbitron font-semibold text-sm mb-1 line-clamp-2 text-slate-800 dark:text-white">
          {certificate.title}
        </h4>
        <p className="text-xs text-gray-600 dark:text-muted-foreground font-rajdhani">
          {certificate.issuer}
        </p>
      </GlassCard>
    </div>
  );

  return (
    <section id="gallery" className="min-h-screen py-32 relative">
      {/* Digital Artifacts Section */}
      <div id="digital-artifacts" className="mb-32">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Featured Projects */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-orbitron font-bold mb-6 text-indigo-900 dark:neon-text">
              DIGITAL ARTIFACTS
            </h2>
            <p className="text-xl font-rajdhani text-gray-700 dark:text-muted-foreground max-w-3xl mx-auto">
              Crystallized innovation. Each project a testament to the fusion of 
              human creativity and machine precision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {allProjects.slice(0, visibleProjects).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {visibleProjects < allProjects.length && (
            <div className="text-center">
              <Button 
                onClick={handleLoadMore}
                disabled={loading}
                variant="violet"
                size="lg"
                className="font-rajdhani font-medium"
              >
                {loading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Load More Projects
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Digital Credentials Section */}
      <div id="digital-credentials">
        {/* Certificates Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-indigo-900 dark:neon-text">
              DIGITAL CREDENTIALS
            </h2>
            <p className="text-lg font-rajdhani text-gray-700 dark:text-muted-foreground max-w-2xl mx-auto">
              Verified expertise across the digital frontier. Each certification 
              a milestone in the endless journey of technological mastery.
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={prevCertificate}
                className="text-primary hover:text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <div className="flex space-x-4 overflow-hidden">
                {certificates.map((certificate, index) => (
                  <CertificateCard 
                    key={certificate.id} 
                    certificate={certificate} 
                    index={index}
                  />
                ))}
              </div>

              <Button 
                variant="ghost" 
                size="icon"
                onClick={nextCertificate}
                className="text-primary hover:text-white"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex justify-center space-x-2">
              {certificates.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === certificateIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCertificateIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass-panel sm:max-w-2xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-orbitron font-bold text-indigo-900 dark:neon-text">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="font-rajdhani text-gray-700 dark:text-muted-foreground">
                  {selectedProject.summary}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full aspect-video object-cover rounded-lg"
                />
                
                <p className="font-rajdhani text-slate-700 dark:text-foreground leading-relaxed">
                  {selectedProject.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-rajdhani font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {selectedProject.liveUrl && (
                    <Button variant="cyan" asChild>
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {selectedProject.githubUrl && (
                    <Button variant="outline" asChild>
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Source Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Certificate Details Modal */}
      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="glass-panel sm:max-w-lg">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-orbitron font-bold text-indigo-900 dark:neon-text">
                  {selectedCertificate.title}
                </DialogTitle>
                <DialogDescription className="font-rajdhani text-gray-700 dark:text-muted-foreground">
                  Issued by {selectedCertificate.issuer}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <img 
                  src={selectedCertificate.thumbnail} 
                  alt={selectedCertificate.title}
                  className="w-full aspect-[4/3] object-cover rounded-lg"
                />
                
                <div className="flex items-center space-x-4 text-sm font-rajdhani">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-primary" />
                    <span>{selectedCertificate.issuer}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{new Date(selectedCertificate.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <p className="font-rajdhani text-gray-700 dark:text-muted-foreground">
                  {selectedCertificate.description}
                </p>
                
                <Button variant="cyan" className="w-full" asChild>
                  <a href={selectedCertificate.downloadUrl} download>
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default WorkGallery;