import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy, Calendar, Users } from 'lucide-react';
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
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const nextPage = () => {
    if (currentPage < hackathonData.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };


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

        {/* Book Container */}
        <motion.div
          initial={{ rotateY: 0, scale: 0.9, opacity: 0.8 }}
          animate={isInView ? 
            { rotateY: isBookOpen ? -25 : -15, scale: 1, opacity: 1 } : 
            { rotateY: 0, scale: 0.9, opacity: 0.8 }
          }
          transition={{ duration: 1.2, ease: "easeOut" }}
          onAnimationComplete={() => {
            if (!isBookOpen && isInView) {
              setIsBookOpen(true);
            }
          }}
          className="relative max-w-5xl mx-auto perspective-1000"
          style={{ perspective: "1000px" }}
        >
          {/* Book Cover/Spine */}
          <div className="relative">
            <GlassCard 
              glowColor="purple" 
              className="relative w-full h-[600px] md:h-[700px] overflow-hidden"
              intensity="high"
            >
              {/* Book Binding Effect */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-primary/20 to-transparent"></div>
              <div className="absolute left-4 top-0 bottom-0 w-1 bg-primary/40"></div>
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-primary/30"></div>
              
              {/* Book Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Left Page - Hackathon Image */}
                <motion.div 
                  className="relative p-8 flex flex-col justify-center"
                  key={`left-${currentPage}`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`image-${currentPage}`}
                      initial={{ x: 300, opacity: 0, rotateY: 90 }}
                      animate={{ x: 0, opacity: 1, rotateY: 0 }}
                      exit={{ x: -300, opacity: 0, rotateY: -90 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full h-full flex flex-col"
                    >
                      <div className="relative flex-1 rounded-lg overflow-hidden mb-6 shadow-2xl">
                        <img 
                          src={hackathonData[currentPage]?.image}
                          alt={hackathonData[currentPage]?.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-orbitron font-bold text-lg mb-2">
                            {hackathonData[currentPage]?.name}
                          </h3>
                          <div className="flex items-center gap-4 text-white/80 text-sm">
                            <div className="flex items-center gap-1">
                              <Trophy className="w-4 h-4" />
                              <span className="font-rajdhani">{hackathonData[currentPage]?.role}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span className="font-rajdhani">{hackathonData[currentPage]?.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Right Page - Certificate & Details */}
                <motion.div 
                  className="relative p-8 border-l border-border/20 flex flex-col justify-center"
                  key={`right-${currentPage}`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`cert-${currentPage}`}
                      initial={{ x: 300, opacity: 0, rotateY: 90 }}
                      animate={{ x: 0, opacity: 1, rotateY: 0 }}
                      exit={{ x: -300, opacity: 0, rotateY: -90 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full h-full flex flex-col"
                    >
                      {/* Certificate Image */}
                      <div className="relative flex-1 rounded-lg overflow-hidden mb-6 shadow-2xl border-2 border-primary/20">
                        <img 
                          src={hackathonData[currentPage]?.certificate}
                          alt={`${hackathonData[currentPage]?.name} Certificate`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                      </div>

                      {/* Achievement Details */}
                      <div className="space-y-4">
                        <h4 className="text-xl font-orbitron font-bold text-slate-800 dark:text-white">
                          Achievement Details
                        </h4>
                        <p className="text-gray-700 dark:text-muted-foreground font-rajdhani leading-relaxed">
                          {hackathonData[currentPage]?.description}
                        </p>
                        
                        {/* Achievement Stats */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/20">
                          <div className="text-center">
                            <div className="text-2xl font-orbitron font-bold text-primary mb-1">
                              #{currentPage + 1}
                            </div>
                            <div className="text-sm font-rajdhani text-gray-600 dark:text-muted-foreground">
                              Achievement
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-orbitron font-bold text-accent mb-1">
                              {2024 - currentPage}
                            </div>
                            <div className="text-sm font-rajdhani text-gray-600 dark:text-muted-foreground">
                              Year
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Page Navigation */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                <motion.button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={cn(
                    "p-3 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed",
                    "bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30"
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                {/* Page Indicators */}
                <div className="flex gap-2">
                  {hackathonData.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={cn(
                        "w-3 h-3 rounded-full transition-all duration-300",
                        index === currentPage 
                          ? "bg-primary shadow-lg shadow-primary/40" 
                          : "bg-gray-400 dark:bg-gray-600 hover:bg-primary/60"
                      )}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextPage}
                  disabled={currentPage === hackathonData.length - 1}
                  className={cn(
                    "p-3 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed",
                    "bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30"
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Page Number */}
              <div className="absolute top-6 right-6 text-sm font-rajdhani text-gray-600 dark:text-muted-foreground">
                Page {currentPage + 1} of {hackathonData.length}
              </div>
            </GlassCard>
          </div>
        </motion.div>

        {/* Mobile Swipe Instruction */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center mt-8 lg:hidden"
        >
          <p className="text-sm font-rajdhani text-gray-600 dark:text-muted-foreground">
            Swipe or use arrows to turn pages
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BookOfGlory;