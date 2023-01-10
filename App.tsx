import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import { UserContext } from "./functions/UserContext";
import { useState } from "react";
import Employee from "./interfaces/employee";
import AnimalsScreen from "./screens/AnimalsScreen";
import ActionsScreen from "./screens/ActionsScreen";

type RootStackParamList = {
    Connexion: undefined;
    Home: undefined;
    Animaux: undefined;
    Actions: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    const [employee, setEmployee] = useState<Employee | null>(null);

    return (
        <NavigationContainer>
            <UserContext.Provider value={{ employee, setEmployee }}>
                <Stack.Navigator initialRouteName="Connexion">
                    <Stack.Screen name="Connexion" component={LoginScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Animaux" component={AnimalsScreen} />
                    <Stack.Screen name="Actions" component={ActionsScreen} />
                </Stack.Navigator>
            </UserContext.Provider>
        </NavigationContainer>

        //     <View style={styles.container}>
        //         <Text style={styles.title}>Gestion du Zoo</Text>
        //         <Separator />
        //         <Image style={styles.logo} source={require("./assets/logo.png")} />
        //         <LoginBox />
        //         <StatusBar style="auto" />
        //     </View>
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
