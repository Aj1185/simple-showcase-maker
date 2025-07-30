import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FuturisticToggle } from '@/components/ui/futuristic-toggle';
import { Link } from '@/components/ui/link';
import GlassCard from '@/components/GlassCard';

const InteractiveShowcase = () => {
  const [toggleStates, setToggleStates] = useState({
    setting1: false,
    setting2: true,
    setting3: false
  });

  return (
    <section className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold mb-6 text-indigo-900 dark:neon-text">
            INTERFACE PROTOCOLS
          </h2>
          <p className="text-xl font-rajdhani text-gray-700 dark:text-muted-foreground max-w-3xl mx-auto">
            Interactive elements designed for the future. Each component responds 
            with precision and elegance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Toggle Switches */}
          <GlassCard glowColor="cyan" className="p-8">
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-cyan-700 dark:text-neon-cyan">
              Neural Switches
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-rajdhani text-slate-700 dark:text-foreground">Dark Mode Protocol</span>
                <FuturisticToggle 
                  checked={toggleStates.setting1}
                  onCheckedChange={(checked) => setToggleStates(prev => ({ ...prev, setting1: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-rajdhani text-slate-700 dark:text-foreground">Stealth Navigation</span>
                <FuturisticToggle 
                  checked={toggleStates.setting2}
                  onCheckedChange={(checked) => setToggleStates(prev => ({ ...prev, setting2: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-rajdhani text-slate-700 dark:text-foreground">Quantum Acceleration</span>
                <FuturisticToggle 
                  checked={toggleStates.setting3}
                  onCheckedChange={(checked) => setToggleStates(prev => ({ ...prev, setting3: checked }))}
                />
              </div>
            </div>
          </GlassCard>

          {/* Enhanced Buttons */}
          <GlassCard glowColor="purple" className="p-8">
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-purple-700 dark:text-primary">
              Command Matrix
            </h3>
            <div className="space-y-4">
              <Button variant="cyan" className="w-full font-rajdhani font-medium">
                Initialize Cyan Protocol
              </Button>
              <Button variant="magenta" className="w-full font-rajdhani font-medium">
                Execute Magenta Sequence
              </Button>
              <Button variant="violet" className="w-full font-rajdhani font-medium">
                Activate Violet Matrix
              </Button>
            </div>
          </GlassCard>

          {/* Form Inputs */}
          <GlassCard glowColor="pink" className="p-8">
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-pink-700 dark:text-accent">
              Data Input Interface
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-rajdhani font-medium mb-2 text-slate-700 dark:text-foreground">
                  Neural Network ID
                </label>
                <Input placeholder="Enter your neural ID..." />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-medium mb-2 text-slate-700 dark:text-foreground">
                  Access Code
                </label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-medium mb-2 text-slate-700 dark:text-foreground">
                  Quantum Frequency
                </label>
                <Input placeholder="440.00 Hz" />
              </div>
            </div>
          </GlassCard>

          {/* Enhanced Links */}
          <GlassCard glowColor="blue" className="p-8">
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-blue-700 dark:text-secondary">
              Hyperlink Nexus
            </h3>
            <div className="space-y-4">
              <div>
                <Link variant="glow" href="#" className="block font-rajdhani font-medium text-lg">
                  Neural Documentation →
                </Link>
                <p className="text-sm text-gray-600 dark:text-muted-foreground mt-1 font-rajdhani">
                  Access the complete neural network specifications
                </p>
              </div>
              <div>
                <Link variant="glow" href="#" className="block font-rajdhani font-medium text-lg">
                  Quantum API Gateway →
                </Link>
                <p className="text-sm text-gray-600 dark:text-muted-foreground mt-1 font-rajdhani">
                  Interface with quantum computing protocols
                </p>
              </div>
              <div>
                <Link variant="glow" href="#" className="block font-rajdhani font-medium text-lg">
                  Holographic Terminal →
                </Link>
                <p className="text-sm text-gray-600 dark:text-muted-foreground mt-1 font-rajdhani">
                  Enter the immersive command interface
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default InteractiveShowcase;