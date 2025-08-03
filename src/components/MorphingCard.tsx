import React, { useState } from 'react';

interface MorphingCardProps {
  children: React.ReactNode;
  className?: string;
  hoverColor?: string;
}

export const MorphingCard: React.FC<MorphingCardProps> = ({ 
  children, 
  className = '', 
  hoverColor = 'cyan' 
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 transition-all duration-500 hover:border-${hoverColor}-500/50 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      {isHovered && (
        <div
          className={`absolute w-32 h-32 bg-gradient-to-r from-${hoverColor}-400/20 to-purple-400/20 rounded-full blur-xl transition-all duration-300`}
          style={{
            left: mousePos.x - 64,
            top: mousePos.y - 64,
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};