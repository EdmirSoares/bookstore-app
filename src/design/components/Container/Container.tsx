import { useTheme } from '@/src/shared/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = ({ children }: { children: React.ReactNode }) => {
    const { colors } = useTheme();

    return (
        <SafeAreaView
        edges={['top']}
        style={{ flex: 1, backgroundColor: colors.background }}>
            {children}
        </SafeAreaView>
    );
};
