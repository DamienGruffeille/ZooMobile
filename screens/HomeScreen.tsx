import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import dataStorage from "../functions/dataStorage";
import Employee from "../interfaces/employee";

type RootStackParamList = {
    Connexion: undefined;
    Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = (props: Props) => {
    const [employee, setEmployee] = useState<Employee>();

    const getEmployee = async () => {
        const _employee = await dataStorage.getData("employee");

        if (_employee) setEmployee(JSON.parse(_employee));
    };

    useEffect(() => {
        getEmployee();
    }, []);

    return (
        <View style={styles.background}>
            <View style={styles.topCard}>
                <Text>
                    Bienvenue {employee?.firstName} {employee?.name}
                </Text>
                <Pressable style={styles.loggoutButton}>
                    <Text>Déconnexion</Text>
                </Pressable>
            </View>

            <View style={styles.card}>
                <Text>Récapitulatif des tâches :</Text>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#70776e",
        flex: 1,
    },
    topCard: {
        backgroundColor: "#dae2d8",
        padding: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    card: {
        backgroundColor: "#dae2d8",
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },

    loggoutButton: {
        backgroundColor: "transparent",
        height: 15,
        width: 100,
    },
});
