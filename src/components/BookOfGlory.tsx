import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Calendar, Users } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';
import GlassCard from '@/components/GlassCard';
import { cn } from '@/lib/utils';

interface HackathonAchievement {
  id: number;
  name: string;
  role: string;
  date: string;
  image: string;
  certificate: string;
  description: string;
}

const hackathonData: HackathonAchievement[] = [
  {
    id: 1,
    name: "TechCrunch Disrupt 2024",
    role: "Winner - Best Innovation",
    date: "March 2024",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
    certificate: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    description: "Developed an AI-powered solution for sustainable urban planning that won first place among 200+ teams."
  },
  {
    id: 2,
    name: "Global AI Challenge",
    role: "Finalist - Machine Learning Track",
    date: "January 2024",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    certificate: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
    description: "Created a real-time sentiment analysis tool that reached top 10 among 500+ global participants."
  },
  {
    id: 3,
    name: "CodeForGood Hackathon",
    role: "Winner - Social Impact Award",
    date: "November 2023",
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=400&h=300&fit=crop",
    certificate: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    description: "Built an accessibility-focused web platform that helps connect volunteers with elderly community members."
  }
];

const BookOfGlory = () => {
  const ref = useRef(null);
  const flipBookRef = useRef<any>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Auto-flip to first page after initial animation
  useEffect(() => {
    if (isInView && flipBookRef.current) {
      const timer = setTimeout(() => {
        try {
          flipBookRef.current?.pageFlip()?.flipNext();
        } catch (error) {
          console.log('Auto-flip not available yet');
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="min-h-screen py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold mb-6 neon-text">
            BOOK OF GLORY
          </h2>
          <p className="text-xl font-rajdhani text-gray-700 dark:text-muted-foreground max-w-2xl mx-auto">
            Chronicles of innovation, competition, and triumph in the digital arena.
            Each page tells a story of challenges conquered and boundaries pushed.
          </p>
        </motion.div>

        {/* FlipBook Container with Animation */}
        <motion.div
          ref={ref}
          initial={{ rotateY: -90, opacity: 0, scale: 0.8 }}
          animate={isInView ? { rotateY: 0, opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center"
        >
          <GlassCard 
            glowColor="purple" 
            className="p-8 relative"
            intensity="high"
          >
            <HTMLFlipBook
              ref={flipBookRef}
              width={350}
              height={500}
              size="stretch"
              minWidth={300}
              maxWidth={400}
              minHeight={400}
              maxHeight={600}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={false}
              className="mx-auto"
              usePortrait={true}
              startPage={0}
              startZIndex={1}
              autoSize={false}
              showPageCorners={true}
              disableFlipByClick={false}
              drawShadow={true}
              flippingTime={800}
              useMouseEvents={true}
              swipeDistance={30}
              clickEventForward={true}
              style={{
                filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))',
              }}
            >
              {/* Cover Page */}
              <div className="w-full h-full bg-gradient-to-br from-background via-background to-muted/20 border border-border/20 rounded-r-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <Trophy className="w-20 h-20 text-primary mx-auto mb-6" />
                  <h3 className="text-3xl font-orbitron font-bold text-foreground mb-4">
                    Book of Glory
                  </h3>
                  <p className="text-muted-foreground font-rajdhani">
                    Digital Achievements & Victories
                  </p>
                  <div className="mt-8 text-sm font-rajdhani text-muted-foreground">
                    Tap to open →
                  </div>
                </div>
              </div>

              {/* Achievement Pages - Each spread has image on right, details on left */}
              {hackathonData.map((achievement, index) => [
                // Right page: Hackathon image
                <div key={`image-${achievement.id}`} className="w-full h-full bg-background border border-border/20 rounded-l-lg relative overflow-hidden">
                  <div className="p-6 h-full flex flex-col justify-center">
                    <div className="relative flex-1 rounded-lg overflow-hidden shadow-2xl">
                      <img 
                        src={achievement.image}
                        alt={achievement.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-orbitron font-bold text-lg mb-2">
                          {achievement.name}
                        </h3>
                        <div className="flex flex-col gap-2 text-white/80 text-sm">
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            <span className="font-rajdhani">{achievement.role}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="font-rajdhani">{achievement.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>,

                // Left page: Certificate & details
                <div key={`cert-${achievement.id}`} className="w-full h-full bg-background border border-border/20 rounded-r-lg relative overflow-hidden">
                  <div className="p-6 h-full flex flex-col">
                    {/* Certificate Image */}
                    <div className="relative h-1/2 rounded-lg overflow-hidden mb-4 shadow-lg border-2 border-primary/20">
                      <img 
                        src={achievement.certificate}
                        alt={`${achievement.name} Certificate`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                    </div>

                    {/* Achievement Details */}
                    <div className="flex-1 space-y-3">
                      <h4 className="text-lg font-orbitron font-bold text-foreground">
                        Achievement Details
                      </h4>
                      <p className="text-muted-foreground font-rajdhani text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                      
                      {/* Achievement Stats */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/20">
                        <div className="text-center">
                          <div className="text-xl font-orbitron font-bold text-primary mb-1">
                            #{index + 1}
                          </div>
                          <div className="text-xs font-rajdhani text-muted-foreground">
                            Achievement
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-orbitron font-bold text-accent mb-1">
                            {2024 - index}
                          </div>
                          <div className="text-xs font-rajdhani text-muted-foreground">
                            Year
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ]).flat()}

              {/* Back Cover */}
              <div className="w-full h-full bg-gradient-to-br from-background via-background to-muted/20 border border-border/20 rounded-l-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <Users className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-orbitron font-bold text-foreground mb-4">
                    The Journey Continues
                  </h3>
                  <p className="text-muted-foreground font-rajdhani text-sm">
                    More achievements await in the digital frontier
                  </p>
                </div>
              </div>
            </HTMLFlipBook>
          </GlassCard>
        </motion.div>

        {/* Instructions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-sm font-rajdhani text-muted-foreground">
            <span className="hidden md:inline">Click page corners or use arrow keys to flip pages</span>
            <span className="md:hidden">Tap page corners or swipe to flip pages</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BookOfGlory;