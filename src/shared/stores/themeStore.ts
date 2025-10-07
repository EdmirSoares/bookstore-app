import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { Appearance } from 'react-native';

export type ColorMode = 'light' | 'dark' | 'system';

interface ThemeState {
  colorMode: ColorMode;
  currentTheme: 'light' | 'dark';
  setColorMode: (mode: ColorMode) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

const secureStorage = {
  getItem: async (name: string) => {
    try {
      return await SecureStore.getItemAsync(name);
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: string) => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch {
      console.warn('Failed to save theme preference');
    }
  },
  removeItem: async (name: string) => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch {
      console.warn('Failed to remove theme preference');
    }
  },
};

const getSystemTheme = (): 'light' | 'dark' => {
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
};

const getCurrentTheme = (colorMode: ColorMode): 'light' | 'dark' => {
  if (colorMode === 'system') {
    return getSystemTheme();
  }
  return colorMode;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      colorMode: 'dark',
      currentTheme: getSystemTheme(),
      
      setColorMode: (mode: ColorMode) => {
        set({ 
          colorMode: mode,
          currentTheme: getCurrentTheme(mode)
        });
      },
      
      toggleTheme: () => {
        const { colorMode } = get();
        if (colorMode === 'system') {

          const systemTheme = getSystemTheme();
          const newMode = systemTheme === 'dark' ? 'light' : 'dark';
          set({ 
            colorMode: newMode,
            currentTheme: newMode 
          });

        } else {

          const newMode = colorMode === 'dark' ? 'light' : 'dark';
          set({ 
            colorMode: newMode,
            currentTheme: newMode 
          });

        }
      },
      
      initializeTheme: () => {
        const { colorMode } = get();
        set({ 
          currentTheme: getCurrentTheme(colorMode) 
        });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => secureStorage),
      onRehydrateStorage: () => (state) => {

        if (state) {
          state.initializeTheme();
        }
      },
    }
  )
);

Appearance.addChangeListener(({ colorScheme }) => {
  const { colorMode, setColorMode } = useThemeStore.getState();
  if (colorMode === 'system') {
    useThemeStore.setState({ 
      currentTheme: colorScheme === 'dark' ? 'dark' : 'light' 
    });
  }
});