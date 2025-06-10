
import { useState, useEffect } from 'react';
import { useTerminalMode } from '@/hooks/useTerminalMode';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isTerminalMode } = useTerminalMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-100/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a 
          href="#home" 
          className={`text-xl md:text-2xl font-bold ${isTerminalMode ? 'text-neon-green' : 'text-gradient'}`}
        >
          {isTerminalMode ? "> _dev_" : "Dev"}
        </a>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className={`relative py-2 ${
                  isTerminalMode 
                    ? 'text-neon-green hover:underline' 
                    : 'text-gray-300 hover:text-neon-blue'
                } transition-colors duration-300`}
              >
                {isTerminalMode ? `[${index}]_${item.label}` : item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 ${isTerminalMode ? 'bg-black' : 'bg-dark-100/95 backdrop-blur-lg'} border-t border-gray-800`}>
          <ul className="flex flex-col py-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={`block py-3 px-6 ${
                    isTerminalMode 
                      ? 'text-neon-green' 
                      : 'text-gray-300 hover:text-neon-blue'
                  } transition-colors duration-300`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isTerminalMode ? `[${index}]_${item.label}` : item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
