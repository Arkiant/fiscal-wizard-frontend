import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  text: string;
  duration?: number; // Default 3000ms
  children: React.ReactNode;
}

export default function Tooltip({ text, duration = 3000, children }: TooltipProps) {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleTouch = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setShow(true);
    timeoutRef.current = setTimeout(() => {
      setShow(false);
    }, duration);
  };

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Trigger element */}
      <div
        onTouchStart={handleTouch}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
      >
        {children}
      </div>
      
      {/* Tooltip - Mobile only */}
      {show && (
        <div className="md:hidden absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            {text}
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-900"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}