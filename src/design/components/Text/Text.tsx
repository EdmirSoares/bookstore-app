import { useTheme } from '@/src/shared/hooks/useTheme';
import { ThemeProps } from '../../../shared/types/components';
import { Text as DefaultText } from 'react-native';

type TextProps = ThemeProps & DefaultText['props'];

export function Text(props: TextProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const { colors } = useTheme();

    return <DefaultText style={[style, { color: colors.text }]} {...otherProps} />;
}
