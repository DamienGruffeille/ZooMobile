import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Button,
    Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import dataStorage from "../functions/dataStorage";
import Separator from "../components/Separator";
import { UserContext } from "../functions/UserContext";

type RootStackParamList = {
    Connexion: undefined;
    Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Connexion">;

const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginFailed, setLoginFailed] = useState<boolean>(false);

    const { setEmployee } = useContext(UserContext);
    const { setToken } = useContext(UserContext);

    const handleConnexion = async () => {
        console.log("Fetching user info");
        await fetch("http://172.16.130.38:3000/api/employes/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // credentials: "include",
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    setLoginFailed(true);
                    throw new Error("Failed to login");
                }
                if (response.status === 200) {
                    return response.json();
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .then((value) => {
                if (value) {
                    setEmployee(value.employee);
                    dataStorage.storeData(value.token);
                    setToken(value.token);

                    Alert.alert("Vous êtes connecté!");

                    setLoginFailed(false);

                    navigation.navigate("Home");
                }
            });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestion du Zoo</Text>
            <Separator />
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <View>
                {!loginFailed ? (
                    <Text></Text>
                ) : (
                    <Text style={styles.error}>
                        Identifiant/Mot de passe inconnu
                    </Text>
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Identifiant"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                ></TextInput>

                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    textContentType="password"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                ></TextInput>

                <Button title="Valider" onPress={handleConnexion} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    error: {
        color: "red",
        fontWeight: "bold",
    },
});

export default LoginScreen;
