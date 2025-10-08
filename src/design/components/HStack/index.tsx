import { StyleSheet, View, ViewStyle } from "react-native";

interface HStackProps {
    children: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
}

export const HStack = ({ children, style }: HStackProps) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
