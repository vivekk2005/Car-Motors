import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'day' | 'night';

interface ThemeContextType {
  theme: Theme;
  isNight: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = (localStorage.getItem('a_one_motors_theme') || localStorage.getItem('anu_motors_theme')) as Theme | null;
      if (stored === 'day' || stored === 'night') {
        return stored;
      }
      // System preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'day';
      }
    }
    // Default to night mode for cinematic automotive impact
    return 'night';
  });

  useEffect(() => {
    const root = document.documentElement;
    // Enable smooth color transition class
    root.classList.add('theme-transitioning');
    
    if (theme === 'night') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    try {
      localStorage.setItem('a_one_motors_theme', theme);
    } catch {
      // storage unavailable
    }

    const timer = setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 800);

    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'night' ? 'day' : 'night'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, isNight: theme === 'night', toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
