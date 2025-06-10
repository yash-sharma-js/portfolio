
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!isVisible) setIsVisible(true);
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable');
        
      setIsPointer(isClickable);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      <div 
        className={`custom-cursor ${isPointer ? 'scale-150' : ''} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transition: 'transform 0.15s ease-out, opacity 0.3s ease'
        }}
      />
      <div 
        className={`fixed top-0 left-0 w-2 h-2 bg-neon-blue rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transition: 'opacity 0.3s ease'
        }}
      />
    </>
  );
};

export default CustomCursor;
