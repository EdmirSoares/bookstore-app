import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    ToastAndroid,
} from "react-native";
import Logo from "@/assets/images/brand/logo.png";
import React, { useState } from "react";
import { useAuth } from "@/src/shared/providers/AuthProvider";
import { TouchableOpacity } from "@/src/design/components/TouchableOpacity/TouchableOpacity";

export default function LoginScreen() {
    const {  user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        try {
            //await login(email, password);
        } catch (err) {
            console.error("Erro no login:", err);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        source={Logo}
                        style={{
                            width: 200,
                            alignSelf: "center",
                            resizeMode: "contain",
                        }}
                    />
                </View>

                <View style={{ flex: 2 }}>
                    <Text style={styles.title}>Bem-vindo(a)</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 32,
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 24,
        fontWeight: "900",
        textAlign: "center",
        marginBottom: 30,
    },
    input: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
