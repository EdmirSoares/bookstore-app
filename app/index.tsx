import { Redirect } from "expo-router";

export default function Index() {
    // Redirect to the Home tab when app loads
    return <Redirect href="/(tabs)/Home" />;
}
