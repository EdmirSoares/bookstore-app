import { View, StyleSheet } from 'react-native';
import React from 'react';
import { HStack } from '../common/HStack';
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity } from '../common/TouchableOpacity/TouchableOpacity';
import { useTheme } from '@/src/shared/hooks/useTheme';
import { Text } from '../common/Text/Text';
const Header = ({ user }: { user: { name: string } }) => {
    const { colors, currentTheme, toggleTheme, styles:createStyles } = useTheme();

    const styles = StyleSheet.create({
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
            backgroundColor: currentTheme === 'light' ? colors.neutral['50'] : colors.backgroundForeground,
        },
    });

    return (
        <HStack style={styles.container}>
            <Text style={styles.text}>Olá, {user.name}</Text>
            <TouchableOpacity onPress={toggleTheme} style={styles.TouchableOpacity}>
                {currentTheme === 'light' ? (
                    <Feather name="sun" size={16} color={colors.primary['400']} />
                ) : (
                    <Feather name="moon" size={16} color={colors.neutral['100']} />
                )}
            </TouchableOpacity>
            
        </HStack>
    );
};

export default Header;
