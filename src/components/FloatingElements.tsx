import React from 'react';
import { Code2, Smartphone, Globe, Zap, Camera, Video } from 'lucide-react';

export const FloatingElements: React.FC = () => {
  const elements = [
    { icon: Code2, delay: 0, position: 'top-20 left-20' },
    { icon: Smartphone, delay: 1, position: 'top-40 right-32' },
    { icon: Globe, delay: 2, position: 'bottom-40 left-32' },
    { icon: Zap, delay: 3, position: 'bottom-20 right-20' },
    { icon: Camera, delay: 4, position: 'top-1/2 left-10' },
    { icon: Video, delay: 5, position: 'top-1/3 right-10' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {elements.map(({ icon: Icon, delay, position }, index) => (
        <div
          key={index}
          className={`absolute ${position} opacity-20 hover:opacity-40 transition-all duration-1000`}
          style={{
            animation: `float 6s ease-in-out infinite ${delay}s`,
          }}
        >
          <Icon className="w-8 h-8 text-cyan-400" />
        </div>
      ))}
    </div>
  );
};