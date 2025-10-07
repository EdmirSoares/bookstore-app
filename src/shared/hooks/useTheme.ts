import { useThemeStore } from '../stores/themeStore';
import { useColorScheme } from 'nativewind';
import Colors from '@/src/design/tokens/Colors';

/**
 * Hook para acessar e gerenciar o tema do aplicativo
 * Integrado com NativeWind para suporte automático a dark mode
 * @returns Objeto com estado do tema e funções para gerenciá-lo
 */
export const useTheme = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { colorMode, currentTheme, setColorMode, toggleTheme, initializeTheme } = useThemeStore();

  const colors = Colors[currentTheme];

  const setThemeMode = (mode: typeof colorMode) => {
    setColorMode(mode);
  };

  const enhancedToggleTheme = () => {
    toggleTheme();
  };

  return {
    colorMode,
    currentTheme,
    colors,
    isDark: currentTheme === 'dark',
    isLight: currentTheme === 'light',
    isSystemMode: colorMode === 'system',
    
    nativeWindColorScheme: colorScheme,
    
    setColorMode: setThemeMode,
    toggleTheme: enhancedToggleTheme,
    initializeTheme,
    
    setLightMode: () => setThemeMode('light'),
    setDarkMode: () => setThemeMode('dark'),
    setSystemMode: () => setThemeMode('system'),
  };
};

/**
 * Hook para obter uma cor específica do tema atual
 * @param colorKey - Chave da cor no objeto de cores
 * @returns Valor da cor como string
 */
export const useThemeColor = (colorKey: keyof typeof Colors.light) => {
  const { colors } = useTheme();
  return colors[colorKey];
};