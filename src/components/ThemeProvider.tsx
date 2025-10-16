import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light';
export type ThemeColor = 'cyan' | 'orange' | 'green' | 'red' | 'blue';

interface ThemeContextType {
  mode: ThemeMode;
  color: ThemeColor;
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
  themeConfig: ThemeConfig;
}

interface ThemeConfig {
  mode: ThemeMode;
  color: ThemeColor;
  background: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentHex: string;
  border: string;
  nodeColor: string;
}

const getThemeConfig = (mode: ThemeMode, color: ThemeColor): ThemeConfig => {
  const isDark = mode === 'dark';

  const colorMap = {
    cyan: {
      accent: isDark ? 'text-cyan-400' : 'text-cyan-600',
      accentHex: isDark ? '#22d3ee' : '#0891b2',
      nodeColor: isDark ? '34, 211, 238' : '8, 145, 178'
    },
    orange: {
      accent: isDark ? 'text-orange-400' : 'text-orange-600',
      accentHex: isDark ? '#fb923c' : '#ea580c',
      nodeColor: isDark ? '251, 146, 60' : '234, 88, 12'
    },
    green: {
      accent: isDark ? 'text-green-400' : 'text-green-600',
      accentHex: isDark ? '#4ade80' : '#16a34a',
      nodeColor: isDark ? '74, 222, 128' : '22, 163, 74'
    },
    red: {
      accent: isDark ? 'text-red-400' : 'text-red-600',
      accentHex: isDark ? '#f87171' : '#dc2626',
      nodeColor: isDark ? '248, 113, 113' : '220, 38, 38'
    },
    blue: {
      accent: isDark ? 'text-blue-400' : 'text-blue-600',
      accentHex: isDark ? '#60a5fa' : '#2563eb',
      nodeColor: isDark ? '96, 165, 250' : '37, 99, 235'
    }
  };

  return {
    mode,
    color,
    background: isDark ? 'from-slate-900 to-slate-950' : 'from-white to-slate-50',
    cardBg: isDark ? 'bg-slate-800/40' : 'bg-white/80',
    textPrimary: isDark ? 'text-white' : 'text-slate-900',
    textSecondary: isDark ? 'text-slate-400' : 'text-slate-600',
    accent: colorMap[color].accent,
    accentHex: colorMap[color].accentHex,
    border: isDark ? 'border-slate-700/50' : 'border-slate-300/50',
    nodeColor: colorMap[color].nodeColor
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [color, setColor] = useState<ThemeColor>('cyan');

  useEffect(() => {
    const savedMode = localStorage.getItem('portfolio-mode') as ThemeMode;
    const savedColor = localStorage.getItem('portfolio-color') as ThemeColor;
    if (savedMode) setMode(savedMode);
    if (savedColor) setColor(savedColor);
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-mode', mode);
    localStorage.setItem('portfolio-color', color);
    document.documentElement.setAttribute('data-mode', mode);
    document.documentElement.setAttribute('data-color', color);
  }, [mode, color]);

  const value = {
    mode,
    color,
    setMode,
    setColor,
    themeConfig: getThemeConfig(mode, color)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};