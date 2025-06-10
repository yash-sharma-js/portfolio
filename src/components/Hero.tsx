
import { useEffect, useRef, useState } from 'react';
import { useTerminalMode } from '@/hooks/useTerminalMode';
import ThreeBackground from './ThreeBackground';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const { isTerminalMode } = useTerminalMode();
  const [showText, setShowText] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const terminalTextRef = useRef<string>("");
  const terminalSubtextRef = useRef<string>("");
  const [terminalText, setTerminalText] = useState("");
  const [terminalSubtext, setTerminalSubtext] = useState("");

  useEffect(() => {
    const timeout1 = setTimeout(() => setShowText(true), 500);
    const timeout2 = setTimeout(() => setShowSubtext(true), 1500);
    const timeout3 = setTimeout(() => setShowCTA(true), 2500);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  // Terminal effect
  useEffect(() => {
    if (isTerminalMode && showText) {
      terminalTextRef.current = "const developer = 'John Doe';";
      let index = 0;
      
      const interval = setInterval(() => {
        setTerminalText(terminalTextRef.current.substring(0, index));
        index++;
        
        if (index > terminalTextRef.current.length) {
          clearInterval(interval);
        }
      }, 70);
      
      return () => clearInterval(interval);
    } else {
      setTerminalText("");
    }
  }, [isTerminalMode, showText]);
  
  useEffect(() => {
    if (isTerminalMode && showSubtext) {
      terminalSubtextRef.current = "console.log('Building Scalable Ideas in Code');";
      let index = 0;
      
      const interval = setInterval(() => {
        setTerminalSubtext(terminalSubtextRef.current.substring(0, index));
        index++;
        
        if (index > terminalSubtextRef.current.length) {
          clearInterval(interval);
        }
      }, 50);
      
      return () => clearInterval(interval);
    } else {
      setTerminalSubtext("");
    }
  }, [isTerminalMode, showSubtext]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      {!isTerminalMode && <ThreeBackground />}
      
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center z-10">
        {isTerminalMode ? (
          // Terminal Mode
          <div className="flex flex-col items-center">
            <div className="w-full md:w-[600px] border border-neon-green rounded-md shadow-lg shadow-neon-green/20 bg-black/80 p-4">
              <div className="flex items-center mb-2 border-b border-neon-green pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-neon-green opacity-70">terminal@portfolio ~ </span>
              </div>
              <div className="font-mono text-neon-green text-left">
                <p className="mb-2">&gt; whoami</p>
                <p className="mb-4">developer_portfolio</p>
                <p className="mb-2">&gt; {terminalText}<span className={`${terminalText.length === terminalTextRef.current.length ? 'hidden' : 'animate-terminal-blink'}`}>█</span></p>
                {showSubtext && <p className="mb-2">&gt; {terminalSubtext}<span className={`${terminalSubtext.length === terminalSubtextRef.current.length ? 'hidden' : 'animate-terminal-blink'}`}>█</span></p>}
                {showSubtext && terminalSubtext.length === terminalSubtextRef.current.length && <p>&gt; <span className="animate-terminal-blink">█</span></p>}
              </div>
            </div>
            
            {showCTA && (
              <Button 
                variant="outline"
                className="mt-8 border-neon-green text-neon-green hover:bg-neon-green/20 animate-fade-in"
              >
                <a href="#about" className="flex items-center">
                  cd ./about <ArrowDown className="ml-2 w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        ) : (
          // Normal Mode
          <>
            <h1 
              className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gradient mb-4 ${showText ? 'animate-fade-in' : 'opacity-0'}`}
            >
              Yash Sharma
            </h1>
            
            {showSubtext && (
              <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 animate-fade-in">
                Building <span className="text-neon-blue font-bold">Scalable Ideas</span> in Code
              </h2>
            )}
            
            {showCTA && (
              <Button 
                className="mt-8 bg-transparent border border-neon-blue text-neon-blue hover:bg-neon-blue/20 animate-fade-in hover-card"
              >
                <a href="#about" className="flex items-center">
                  Explore <ArrowDown className="ml-2 w-4 h-4" />
                </a>
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
