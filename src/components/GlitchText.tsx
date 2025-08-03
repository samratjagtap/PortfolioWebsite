import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  const [glitchText, setGlitchText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const triggerGlitch = () => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    let iterations = 0;
    const maxIterations = 10;

    const interval = setInterval(() => {
      setGlitchText(
        text
          .split('')
          .map((char, index) => {
            if (index < iterations) return text[index];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('')
      );

      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setGlitchText(text);
        setIsGlitching(false);
      }
    }, 50);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerGlitch();
    }, Math.random() * 5000 + 2000);

    return () => clearTimeout(timer);
  }, [isGlitching]);

  return (
    <span
      className={`${className} cursor-pointer transition-all duration-200 hover:text-cyan-400`}
      onClick={triggerGlitch}
      style={{
        textShadow: isGlitching 
          ? '2px 0 #ff0000, -2px 0 #00ffff, 0 2px #ffff00' 
          : 'none',
      }}
    >
      {glitchText}
    </span>
  );
};