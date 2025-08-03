import React, { useEffect, useState } from 'react';

interface CursorDot {
  x: number;
  y: number;
  opacity: number;
  id: number;
}

export const CursorTrail: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dots, setDots] = useState<CursorDot[]>([]);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let moveTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setMousePos(newPos);
      setIsMoving(true);

      // Add new dot with reduced frequency for better performance
      if (Math.random() < 0.3) {
        const newDot: CursorDot = {
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          opacity: 0.8,
          id: Date.now() + Math.random(),
        };

        setDots(prev => [...prev.slice(-3), newDot]); // Keep only 4 dots max
      }

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => setIsMoving(false), 150);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animate dots with better performance
    const interval = setInterval(() => {
      setDots(prev => 
        prev.map(dot => ({
          ...dot,
          opacity: dot.opacity - 0.2,
        })).filter(dot => dot.opacity > 0)
      );
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
      clearTimeout(moveTimeout);
    };
  }, []);

  return (
    <>
      {/* Main cursor - simple and smooth */}
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          left: mousePos.x - 6,
          top: mousePos.y - 6,
          transform: `scale(${isMoving ? 1.2 : 1})`,
        }}
      >
        <div className={`w-3 h-3 rounded-full border transition-all duration-200 ${
          isMoving 
            ? 'border-cyan-400 bg-cyan-400/30 shadow-sm shadow-cyan-400/50' 
            : 'border-slate-400/60 bg-slate-400/10'
        }`} />
      </div>

      {/* Center dot */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: mousePos.x - 1,
          top: mousePos.y - 1,
        }}
      >
        <div className={`w-0.5 h-0.5 rounded-full transition-all duration-100 ${
          isMoving ? 'bg-cyan-400' : 'bg-slate-400/80'
        }`} />
      </div>

      {/* Subtle trail dots */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: dot.x - 2,
            top: dot.y - 2,
            opacity: dot.opacity,
          }}
        >
          <div 
            className="w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400/60 to-purple-400/60"
            style={{
              boxShadow: `0 0 4px rgba(34, 211, 238, ${dot.opacity * 0.3})`,
            }}
          />
        </div>
      ))}
    </>
  );
};