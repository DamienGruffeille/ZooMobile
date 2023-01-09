import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import { useState } from "react";

import dataStorage from "../functions/dataStorage";

type Props = {};

const LoginBox = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginFailed, setLoginFailed] = useState<boolean>(false);

    const handleConnexion = async ({ navigation }: any) => {
        await fetch("http://172.27.144.1:3000/api/employes/login", {
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
                    dataStorage.storeData(value);
                    setLoginFailed(false);
                }
            });

        if (!loginFailed) navigation.navigate("Home");
    };

    // const data = async () => {
    //     const token = await dataStorage.getData("token");
    //     const employee = await dataStorage.getData("employee");

    //     console.log("App token" + token);
    //     console.log("App employé" + employee);
    // };

    // data();

    return (
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
    );
};

const styles = StyleSheet.create({
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

export default LoginBox;
