import React from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { GlitchText } from './GlitchText';

interface RoadmapNavProps {
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (id: string) => void;
  setIsResumeModalOpen: (open: boolean) => void;
  skateboardPosition: number;
}

export const RoadmapNav: React.FC<RoadmapNavProps> = ({
  activeSection,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
  setIsResumeModalOpen,
  skateboardPosition
}) => {
  const { themeConfig } = useTheme();

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'offbeat', label: 'Offbeat' },
    { id: 'music', label: 'Music' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 ${themeConfig.cardBg} backdrop-blur-md`}>
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="text-xl font-display font-bold">
            <GlitchText text="ALEX" className={`${themeConfig.accent} font-bold`} />
          </div>

          {/* Desktop Roadmap Navigation */}
          <nav className="hidden lg:block relative min-w-[800px]">
            <svg className="absolute w-full h-16 pointer-events-none" style={{ top: '8px' }}>
              <defs>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={`${themeConfig.accentHex}99`} />
                  <stop offset="100%" stopColor={`${themeConfig.accentHex}33`} />
                </linearGradient>
              </defs>
              <path
                d="M 40 32 L 760 32"
                stroke="url(#roadGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 40 32 L 760 32"
                stroke={`${themeConfig.accentHex}22`}
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* Skateboard indicator */}
            <div
              className="absolute pointer-events-none transition-all duration-300 ease-out z-10"
              style={{
                left: `calc(40px + ${Math.min(95, skateboardPosition) * 7.2}px)`,
                top: '20px'
              }}
            >
              <svg width="48" height="24" viewBox="0 0 48 24" className="drop-shadow-xl">
                <rect x="8" y="10" width="32" height="4" rx="2" fill={themeConfig.accentHex} />
                <circle cx="12" cy="19" r="3.5" fill="#374151" />
                <circle cx="36" cy="19" r="3.5" fill="#374151" />
                <circle cx="12" cy="19" r="1.8" fill="#9ca3af" />
                <circle cx="36" cy="19" r="1.8" fill="#9ca3af" />
              </svg>
            </div>

            <div className="flex items-center justify-between relative">
              {navItems.map((item) => (
                <div key={item.id} className="relative group z-20">
                  <button
                    onClick={() => item.id === 'resume' ? setIsResumeModalOpen(true) : scrollToSection(item.id)}
                    className="relative flex flex-col items-center transition-all duration-300"
                  >
                    <div className={`relative px-3 py-1.5 rounded-lg font-semibold text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                      activeSection === item.id
                        ? `${themeConfig.accent.replace('text-', 'bg-')} text-white shadow-lg scale-110`
                        : `${themeConfig.cardBg} ${themeConfig.border} border ${themeConfig.textSecondary} group-hover:${themeConfig.accent} group-hover:scale-105`
                    }`}>
                      {item.label}
                      {activeSection === item.id && (
                        <div className={`absolute inset-0 rounded-lg ${themeConfig.accent.replace('text-', 'bg-')} opacity-30 animate-ping`}></div>
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 ${themeConfig.textSecondary} hover:${themeConfig.accent} transition-colors`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-6 pb-4">
            <div className="relative">
              <div className={`absolute left-12 top-0 bottom-0 w-1 rounded-full ${themeConfig.accent.replace('text-', 'bg-')} opacity-20`}></div>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'resume') {
                        setIsResumeModalOpen(true);
                      } else {
                        scrollToSection(item.id);
                      }
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center w-full py-3 transition-all duration-300 group ${
                      activeSection === item.id ? 'scale-105' : ''
                    }`}
                  >
                    <div className={`relative w-6 h-6 rounded-full mr-6 flex-shrink-0 transition-all duration-300 ${
                      activeSection === item.id
                        ? `${themeConfig.accent.replace('text-', 'bg-')} shadow-lg`
                        : `${themeConfig.cardBg} ${themeConfig.border} border-2 group-hover:border-current`
                    }`}>
                      {activeSection === item.id && (
                        <div className={`absolute inset-0 rounded-full ${themeConfig.accent.replace('text-', 'bg-')} opacity-50 animate-ping`}></div>
                      )}
                    </div>
                    <span className={`font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ${
                      activeSection === item.id
                        ? themeConfig.accent
                        : `${themeConfig.textSecondary} group-hover:${themeConfig.accent}`
                    }`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
