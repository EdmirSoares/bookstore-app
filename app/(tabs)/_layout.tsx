// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Redirect } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function TabLayout() {

    /* if (!isLoggedIn) {
        return <Redirect href="/(loggedOut)" />;
    } */

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                headerShadowVisible: false,
                tabBarActiveTintColor: "#1f2937",
                tabBarInactiveTintColor: "#a5a5a5ff",
                tabBarStyle: {
                    position: "absolute",
                    left: 20,
                    right: 20,
                    bottom: 0,
                    height: 120,
                    borderRadius: 32,
                    backgroundColor: "#ebebeb",
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowColor: "#000",
                    shadowOpacity: 0,
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 0,
                },
                tabBarIconStyle: {
                    marginTop: 10,
                },
            }}
        >
            <Tabs.Screen
                name="Home/index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="route" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="Users/index"
                options={{
                    title: "Usuários",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="map" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Books/index"
                options={{
                    title: "Livros",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="map" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
