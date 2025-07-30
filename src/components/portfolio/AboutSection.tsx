import { Card } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of experience building 
                scalable web applications. I love turning complex problems into simple, 
                beautiful designs.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing 
                to open source projects, or enjoying a good cup of coffee while reading about 
                the latest industry trends.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Problem Solver
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Team Player
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Continuous Learner
                </span>
              </div>
            </div>
            
            <Card className="p-8 shadow-soft border-0 bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Experience</h3>
              
              <div className="space-y-6">
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold text-foreground">Senior Full Stack Developer</h4>
                  <p className="text-primary text-sm font-medium">TechCorp Inc. • 2022 - Present</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Leading development of enterprise applications using React, Node.js, and AWS
                  </p>
                </div>
                
                <div className="border-l-2 border-primary/60 pl-4">
                  <h4 className="font-semibold text-foreground">Full Stack Developer</h4>
                  <p className="text-primary text-sm font-medium">StartupXYZ • 2020 - 2022</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Built and maintained multiple client projects using modern web technologies
                  </p>
                </div>
                
                <div className="border-l-2 border-primary/40 pl-4">
                  <h4 className="font-semibold text-foreground">Frontend Developer</h4>
                  <p className="text-primary text-sm font-medium">WebStudio • 2019 - 2020</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Focused on creating responsive and accessible user interfaces
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;