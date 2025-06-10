
import { useTerminalMode } from '@/hooks/useTerminalMode';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/yash-sharma-js' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/yashsharma-js/' },
  { name: 'Twitter', icon: Twitter, url: 'https://x.com/yash_sharma_js' },
  { name: 'Email', icon: Mail, url: 'mailto:yashsharma.js@gmail.com' },
];

const Footer = () => {
  const { isTerminalMode } = useTerminalMode();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className={`py-10 px-4 ${isTerminalMode ? 'bg-black' : 'bg-dark-200'} border-t ${isTerminalMode ? 'border-neon-green/50' : 'border-gray-800'}`}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            {isTerminalMode ? (
              <pre className="font-mono text-neon-green text-sm">
                {`© ${new Date().getFullYear()} <yash.sharma /> // All rights reserved`}
              </pre>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-gradient mb-1">Yash Sharma</h3>
                <p className="text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center mb-6 md:mb-0 md:order-3">
            <Button 
              variant="outline"
              size="icon"
              className={`${isTerminalMode 
                ? 'border-neon-green text-neon-green hover:bg-neon-green/20' 
                : 'border-neon-blue text-neon-blue hover:bg-neon-blue/20'}`}
              onClick={scrollToTop}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <span className={`text-xs mt-2 ${isTerminalMode ? 'text-neon-green' : 'text-gray-400'}`}>
              Back to Top
            </span>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a 
                key={link.name}
                href={link.url}
                aria-label={link.name}
                className={`${isTerminalMode 
                  ? 'text-neon-green hover:text-white' 
                  : 'text-gray-400 hover:text-neon-blue'} transition-colors`}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        
        {!isTerminalMode && (
          <div className="text-center mt-8 text-xs text-gray-500">
            <p>Built with React, Three.js, and TailwindCSS</p>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
