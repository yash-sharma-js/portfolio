
import { useEffect, useState } from 'react';
import { TerminalModeProvider } from '@/hooks/useTerminalMode';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import TerminalToggle from '@/components/TerminalToggle';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  if (!isMounted) return null;

  return (
    <TerminalModeProvider>
      <div className="min-h-screen bg-dark-100 overflow-x-hidden">
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
        <TerminalToggle />
      </div>
    </TerminalModeProvider>
  );
};

export default Index;
