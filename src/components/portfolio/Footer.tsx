import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            {/* Logo and Description */}
            <div className="text-center md:text-left mb-6 md:mb-0">
              <button
                onClick={scrollToTop}
                className="text-2xl font-bold mb-2 hover:text-primary-glow transition-colors duration-300"
              >
                John Smith
              </button>
              <p className="text-primary-foreground/80">
                Full Stack Developer crafting digital experiences
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold mb-3">Navigation</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary-foreground transition-colors duration-300">About</button></li>
                <li><button onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary-foreground transition-colors duration-300">Skills</button></li>
                <li><button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary-foreground transition-colors duration-300">Projects</button></li>
                <li><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary-foreground transition-colors duration-300">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Web Development</li>
                <li>Mobile Apps</li>
                <li>UI/UX Design</li>
                <li>Consulting</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Technologies</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>React & Next.js</li>
                <li>Node.js & Python</li>
                <li>AWS & Docker</li>
                <li>TypeScript</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Contact Info</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>San Francisco, CA</li>
                <li>john.smith@example.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Available for hire</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/80">
            <p className="flex items-center gap-1 mb-4 md:mb-0">
              Made with <Heart className="w-4 h-4 text-red-400" fill="currentColor" /> by John Smith
            </p>
            <p>
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;