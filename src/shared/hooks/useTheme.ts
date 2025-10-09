import { useThemeStore } from '../stores/themeStore';
import Colors from '@/src/design/tokens/Colors';
import { StyleSheet } from 'react-native';

/**
 * Hook para acessar e gerenciar o tema do aplicativo usando StyleSheet
 * @returns Objeto com estado do tema e funções para gerenciá-lo
 */
export const useTheme = () => {
  const { colorMode, currentTheme, setColorMode, toggleTheme, initializeTheme } = useThemeStore();


  const colors = Colors[currentTheme];


  const createStyles = StyleSheet.create({

    flexRow: {
      flexDirection: 'row',
    },
    flexColumn: {
      flexDirection: 'column',
    },
    flex1: {
      flex: 1,
    },
    centerContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    spaceAround: {
      justifyContent: 'space-around',
    },
    alignCenter: {
      alignItems: 'center',
    },
    

    backgroundPrimary: {
      backgroundColor: colors.background,
    },
    backgroundSurface: {
      backgroundColor: colors.surfaceText,
    },
    backgroundTabBar: {
      backgroundColor: colors.tabBarBackground,
    },
    

    textPrimary: {
      color: colors.text,
    },
    textSurface: {
      color: colors.surfaceText,
    },
    textTint: {
      color: colors.tint,
    },
    

    padding4: { padding: 4 },
    padding6: { padding: 6 },
    padding8: { padding: 8 },
    padding12: { padding: 12 },
    padding16: { padding: 16 },
    padding20: { padding: 20 },
    
    margin2: { margin: 2 },
    margin4: { margin: 4 },
    margin6: { margin: 6 },
    margin8: { margin: 8 },
    margin12: { margin: 12 },
    margin16: { margin: 16 },
    margin20: { margin: 20 },
    

    rounded4: { borderRadius: 4 },
    rounded8: { borderRadius: 8 },
    rounded12: { borderRadius: 12 },
    rounded16: { borderRadius: 16 },
    rounded20: { borderRadius: 20 },
  });

  return {
    colorMode,
    currentTheme,
    colors,
    isDark: currentTheme === 'dark',
    isLight: currentTheme === 'light',
    isSystemMode: colorMode === 'system',
    

    styles: createStyles,
    

    setColorMode,
    toggleTheme,
    initializeTheme,
    

    setLightMode: () => setColorMode('light'),
    setDarkMode: () => setColorMode('dark'),
    setSystemMode: () => setColorMode('system'),
    
    
    createThemedStyle: (lightStyle: any, darkStyle: any) => 
      currentTheme === 'light' ? lightStyle : darkStyle,
    
    getColor: (colorKey: keyof typeof Colors.light) => colors[colorKey],
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