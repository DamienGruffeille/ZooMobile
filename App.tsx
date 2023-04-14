import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "./functions/UserContext";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Employee from "./interfaces/employee";
import AnimalsScreen from "./screens/AnimalsScreen";
import ActionsScreen from "./screens/ActionsScreen";
import EventsScreen from "./screens/EventsScreen";

type RootStackParamList = {
    Connexion: undefined;
    Home: undefined;
    Animaux: undefined;
    Actions: undefined;
    Evenements: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

export default function App() {
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [token, setToken] = useState<string | null>(null);

    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <UserContext.Provider
                    value={{ employee, setEmployee, token, setToken }}
                >
                    <Stack.Navigator initialRouteName="Connexion">
                        <Stack.Screen
                            name="Connexion"
                            component={LoginScreen}
                        />
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen
                            name="Animaux"
                            component={AnimalsScreen}
                        />
                        <Stack.Screen
                            name="Actions"
                            component={ActionsScreen}
                        />
                        <Stack.Screen
                            name="Evenements"
                            component={EventsScreen}
                        />
                    </Stack.Navigator>
                </UserContext.Provider>
            </NavigationContainer>
        </QueryClientProvider>

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
