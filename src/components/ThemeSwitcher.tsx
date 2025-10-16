import React, { useState } from 'react';
import { Palette, Sun, Moon, Circle } from 'lucide-react';
import { useTheme, ThemeMode, ThemeColor } from './ThemeProvider';

export const ThemeSwitcher: React.FC = () => {
  const { mode, color, setMode, setColor, themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const colorOptions: { key: ThemeColor; name: string; color: string }[] = [
    { key: 'cyan', name: 'Cyan', color: '#22d3ee' },
    { key: 'orange', name: 'Orange', color: '#fb923c' },
    { key: 'green', name: 'Green', color: '#4ade80' },
    { key: 'red', name: 'Red', color: '#f87171' },
    { key: 'blue', name: 'Blue', color: '#60a5fa' },
  ];

  return (
    <div className="fixed top-20 right-6 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 rounded-full ${themeConfig.cardBg} ${themeConfig.border} border backdrop-blur-sm hover:scale-110 transition-all duration-300 group shadow-lg`}
        >
          <Palette className={`w-6 h-6 ${themeConfig.accent} group-hover:rotate-12 transition-transform`} />
        </button>

        {isOpen && (
          <div className={`absolute top-16 right-0 ${themeConfig.cardBg} ${themeConfig.border} border backdrop-blur-md rounded-2xl p-5 w-64 shadow-2xl`}>
            <h3 className={`${themeConfig.textPrimary} font-display font-semibold mb-4`}>Theme Settings</h3>

            <div className="mb-5">
              <label className={`${themeConfig.textSecondary} text-sm font-medium mb-2 block`}>Mode</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setMode('dark')}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                    mode === 'dark'
                      ? `${themeConfig.accent} bg-current/10 scale-105`
                      : `${themeConfig.textSecondary} hover:${themeConfig.textPrimary} hover:bg-slate-700/20`
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span className="text-sm font-medium">Dark</span>
                </button>
                <button
                  onClick={() => setMode('light')}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                    mode === 'light'
                      ? `${themeConfig.accent} bg-current/10 scale-105`
                      : `${themeConfig.textSecondary} hover:${themeConfig.textPrimary} hover:bg-slate-700/20`
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span className="text-sm font-medium">Light</span>
                </button>
              </div>
            </div>

            <div>
              <label className={`${themeConfig.textSecondary} text-sm font-medium mb-2 block`}>Color</label>
              <div className="grid grid-cols-5 gap-2">
                {colorOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setColor(option.key)}
                    className={`aspect-square rounded-lg transition-all duration-300 hover:scale-110 relative ${
                      color === option.key ? 'ring-2 ring-offset-2 ring-current scale-110' : ''
                    }`}
                    style={{ backgroundColor: option.color }}
                    title={option.name}
                  >
                    {color === option.key && (
                      <Circle className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white fill-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};