import React, { useState } from 'react';
import { Palette, Sun, Moon, Flame, Zap } from 'lucide-react';
import { useTheme, Theme } from './ThemeProvider';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions = [
    { key: 'dark' as Theme, name: 'Dark', icon: Moon, color: 'bg-slate-800' },
    { key: 'light' as Theme, name: 'Light', icon: Sun, color: 'bg-white' },
    { key: 'fire' as Theme, name: 'Fire', icon: Flame, color: 'bg-red-600' },
    { key: 'funky' as Theme, name: 'Funky', icon: Zap, color: 'bg-gradient-to-r from-green-400 to-purple-500' },
  ];

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
    
    // Add a fun animation effect
    document.body.style.transition = 'all 0.5s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 500);
  };

  return (
    <div className="fixed top-20 right-6 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 rounded-full ${themeConfig.cardBg} ${themeConfig.border} border backdrop-blur-sm hover:scale-110 transition-all duration-300 group`}
          style={{
            boxShadow: `0 0 20px ${themeConfig.glowColor}`,
          }}
        >
          <Palette className={`w-6 h-6 ${themeConfig.accent} group-hover:rotate-12 transition-transform`} />
        </button>

        {isOpen && (
          <div className={`absolute top-16 right-0 ${themeConfig.cardBg} ${themeConfig.border} border backdrop-blur-sm rounded-2xl p-4 min-w-48 animate-in slide-in-from-top-2 duration-300`}>
            <h3 className={`${themeConfig.textPrimary} font-display font-semibold mb-3`}>Choose Theme</h3>
            <div className="space-y-2">
              {themeOptions.map(({ key, name, icon: Icon, color }) => (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                    theme === key 
                      ? `${themeConfig.accent} bg-current/10` 
                      : `${themeConfig.textSecondary} hover:${themeConfig.textPrimary}`
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{name}</span>
                  {theme === key && (
                    <div className={`ml-auto w-2 h-2 rounded-full ${themeConfig.accent.replace('text-', 'bg-')}`} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};