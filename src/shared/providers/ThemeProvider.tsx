import React, { useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import { useThemeStore } from '../stores/themeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { currentTheme, colorMode, initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  useEffect(() => {
    setColorScheme(currentTheme);
  }, [currentTheme, setColorScheme]);

  return <>{children}</>;
};