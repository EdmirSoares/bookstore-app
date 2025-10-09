import { View, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { HStack } from '../common/HStack';
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity } from '../common/TouchableOpacity/TouchableOpacity';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { Text } from '../common/Text/Text';

interface Header {
    isHome: boolean;
    screen: {
        user?: {
            name: string;
        };
        title?: string;
        hasGoBack?: boolean;
        buttonAction?: () => void;
    };
}
const Header = ({ isHome = false, screen }: Header) => {
    const { colors, currentTheme, toggleTheme, styles: createStyles } = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: createStyles.padding16.padding,
                    paddingVertical: createStyles.padding20.padding,
                },
                text: {
                    textAlign: 'center',
                    fontSize: 24,
                    fontFamily: 'PoppinsBold',
                },
                TouchableOpacity: {
                    padding: createStyles.padding12.padding,
                    borderRadius: 999,
                    backgroundColor:
                        currentTheme === 'light'
                            ? colors.neutral['50']
                            : colors.backgroundForeground,
                },
                TouchableOpacityGoBack: {
                    padding: createStyles.padding12.padding,
                    borderRadius: 999,
                },
                TouchableOpacityAction: {
                    padding: createStyles.padding12.padding,
                    borderRadius: 999,
                    backgroundColor: colors.primary['400'] + '33',
                },
            }),
        [colors, createStyles, currentTheme]
    );

    return (
        <>
            {isHome && screen.user ? (
                <HStack style={styles.container}>
                    <Text style={styles.text}>Olá, {screen.user.name}</Text>
                    <TouchableOpacity onPress={toggleTheme} style={styles.TouchableOpacity}>
                        {currentTheme === 'light' ? (
                            <Feather name="sun" size={16} color={colors.primary['400']} />
                        ) : (
                            <Feather name="moon" size={16} color={colors.neutral['100']} />
                        )}
                    </TouchableOpacity>
                </HStack>
            ) : (
                <HStack style={styles.container}>
                    <Text style={styles.text}>{screen.title || ''}</Text>
                    <TouchableOpacity
                        onPress={screen.buttonAction}
                        style={styles.TouchableOpacityAction}>
                        <Feather name="plus" size={16} color={colors.neutral['100']} />
                    </TouchableOpacity>
                </HStack>
            )}
        </>
    );
};

export default Header;
