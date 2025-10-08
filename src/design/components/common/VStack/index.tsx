import { StyleSheet, View, ViewStyle } from "react-native";

interface VStackProps {
    children: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
}

export const VStack = ({ children, style }: VStackProps) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
});
