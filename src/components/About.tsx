
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTerminalMode } from '@/hooks/useTerminalMode';

const About = () => {
  const { isTerminalMode } = useTerminalMode();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const typingRef = useRef<HTMLDivElement>(null);
  const aboutMeText = "// I'm a software engineer with a passion for building elegant, performant applications. I specialize in full-stack development with modern JavaScript frameworks, cloud architecture, and DevOps practices. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or hiking with my Friends.";

  useEffect(() => {
    if (inView && isTerminalMode && typingRef.current) {
      let index = 0;
      typingRef.current.textContent = "";
      
      const typeText = () => {
        if (index < aboutMeText.length) {
          if (typingRef.current) {
            typingRef.current.textContent += aboutMeText.charAt(index);
            index++;
            setTimeout(typeText, 20);
          }
        }
      };
      
      typeText();
    }
  }, [inView, isTerminalMode]);

  return (
    <section id="about" ref={ref} className={`section-padding ${isTerminalMode ? 'bg-black' : 'bg-dark'}`}>
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${isTerminalMode ? 'text-neon-green' : 'text-gradient'} ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
            {isTerminalMode ? '> About.me()' : 'About Me'}
          </h2>
          
          <div className="flex flex-col md:flex-row md:space-x-8 items-center">
            <div className={`w-60 h-60 mb-8 md:mb-0 overflow-hidden ${inView ? 'animate-fade-in' : 'opacity-0'} ${isTerminalMode ? 'border-2 border-neon-green' : 'rounded-lg'}`}>
              {isTerminalMode ? (
                <div className="w-full h-full bg-black p-4 overflow-hidden font-mono text-neon-green text-xs">
                  <pre className="text-neon-green">
                    {`/*
 * DEVELOPER PROFILE
 * ----------------
 * Name: Yash Sharma
 * Role: Software Engineer
 * Location: Mumbai, India
 * Skills: Full-Stack Dev
 * Loves: Clean Code, UX
 */`}
                  </pre>
                  <div className="w-24 h-24 mx-auto my-4 border-2 border-dashed border-neon-green flex items-center justify-center">
                    [IMAGE]
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg p-1">
<div className="bg-light-200 w-full h-full rounded-lg flex items-center justify-center">
  <img
  src="https://i.postimg.cc/XYGJMqYg/photo.png"
/>

</div>

                </div>
              )}
            </div>
            
            <div className={`flex-1 ${inView ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
              {isTerminalMode ? (
                <div className="font-mono">
                  <div ref={typingRef} className="text-neon-green text-sm md:text-base whitespace-pre-wrap"></div>
                  <span className="animate-terminal-blink text-neon-green">█</span>
                </div>
              ) : (
                <div className="space-y-4 text-gray-300">
                  <p> 
                    Hello! I'm a Software Engineer with a passion for creating elegant solutions to complex problems.
                  </p>
                  <p>
                    I specialize in full-stack development, working with modern frameworks and tools to build performant, accessible, and user-friendly applications. My expertise includes Angular, React, Node.js, TypeScript, and cloud architecture.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new technologies, contributing to open source, or at GYM. I believe in continuous learning and sharing knowledge with the community.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
