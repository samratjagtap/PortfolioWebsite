import React, { useState, useEffect } from 'react';

interface MultilingualNameProps {
  className?: string;
}

export const MultilingualName: React.FC<MultilingualNameProps> = ({ className = '' }) => {
  const [currentName, setCurrentName] = useState('ALEX');
  const [isGlitching, setIsGlitching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const names = [
    { name: 'ALEX', language: 'English' },
    { name: 'アレックス', language: 'Japanese' },
    { name: 'एलेक्स', language: 'Hindi' },
    { name: 'أليكس', language: 'Arabic' },
    { name: 'ΑΛΕΞ', language: 'Greek' },
    { name: '알렉스', language: 'Korean' },
    { name: 'АЛЕКС', language: 'Bulgarian' }
  ];

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const triggerGlitch = (targetName: string) => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    let iterations = 0;
    const maxIterations = 15;

    const interval = setInterval(() => {
      setCurrentName(
        targetName
          .split('')
          .map((char, index) => {
            if (index < iterations) return targetName[index];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('')
      );

      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setCurrentName(targetName);
        setIsGlitching(false);
      }
    }, 80);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % names.length;
      const nextName = names[nextIndex].name;
      
      triggerGlitch(nextName);
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <span
      className={`${className} inline-block transition-all duration-200 min-w-[200px]`}
      style={{
        textShadow: isGlitching 
          ? '2px 0 #ff0000, -2px 0 #00ffff, 0 2px #ffff00' 
          : 'none',
        fontFamily: names[currentIndex].language === 'Japanese' || names[currentIndex].language === 'Korean' ? 'serif' : 'inherit',
      }}
    >
      {currentName}
    </span>
  );
};