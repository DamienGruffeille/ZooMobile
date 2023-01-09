import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import Separator from "./components/Separator";

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestion du Zoo</Text>
            <Separator />
            <Image style={styles.logo} source={require("./assets/logo.png")} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
