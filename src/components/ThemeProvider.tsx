import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'dark' | 'light' | 'fire' | 'funky';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeConfig: ThemeConfig;
}

interface ThemeConfig {
  name: string;
  background: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentSecondary: string;
  border: string;
  glowColor: string;
  nodeColors: {
    core: string;
    satellite: string;
    data: string;
  };
}

const themes: Record<Theme, ThemeConfig> = {
  dark: {
    name: 'Dark',
    background: 'from-slate-900 via-slate-800 to-slate-900',
    cardBg: 'bg-slate-800/30',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    accent: 'text-cyan-400',
    accentSecondary: 'text-purple-400',
    border: 'border-slate-700/50',
    glowColor: 'rgba(34, 211, 238, 0.4)',
    nodeColors: {
      core: '168, 85, 247',
      satellite: '34, 211, 238',
      data: '34, 197, 94'
    }
  },
  light: {
    name: 'Light',
    background: 'from-gray-50 via-white to-gray-100',
    cardBg: 'bg-white/80',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    accent: 'text-blue-600',
    accentSecondary: 'text-indigo-600',
    border: 'border-gray-200',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    nodeColors: {
      core: '99, 102, 241',
      satellite: '59, 130, 246',
      data: '16, 185, 129'
    }
  },
  fire: {
    name: 'Fire',
    background: 'from-gray-900 via-red-900/20 to-black',
    cardBg: 'bg-red-900/20',
    textPrimary: 'text-white',
    textSecondary: 'text-red-100',
    accent: 'text-red-400',
    accentSecondary: 'text-orange-400',
    border: 'border-red-500/30',
    glowColor: 'rgba(255, 72, 33, 0.4)',
    nodeColors: {
      core: '255, 72, 33',
      satellite: '251, 146, 60',
      data: '239, 68, 68'
    }
  },
  funky: {
    name: 'Funky',
    background: 'from-purple-900 via-pink-900/30 to-indigo-900',
    cardBg: 'bg-purple-900/30',
    textPrimary: 'text-white',
    textSecondary: 'text-purple-100',
    accent: 'text-green-400',
    accentSecondary: 'text-purple-400',
    border: 'border-purple-500/30',
    glowColor: 'rgba(140, 255, 87, 0.4)',
    nodeColors: {
      core: '92, 44, 255',
      satellite: '140, 255, 87',
      data: '255, 80, 9'
    }
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
    themeConfig: themes[theme]
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