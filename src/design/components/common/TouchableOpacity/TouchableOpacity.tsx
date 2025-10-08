import { ThemeProps } from "../../../../shared/types/components";
import { TouchableOpacity as DefaultTouchableOpacity } from "react-native";

type TouchableOpacityProps = ThemeProps &
    React.ComponentProps<typeof DefaultTouchableOpacity>;

export function TouchableOpacity(props: TouchableOpacityProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;

    return (
        <DefaultTouchableOpacity
            style={style}
            {...otherProps}
        />
    );
}
