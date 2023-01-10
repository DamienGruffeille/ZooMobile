import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import dataStorage from "../functions/dataStorage";
import Employee from "../interfaces/employee";
import Header from "../components/Header";

type RootStackParamList = {
    Connexion: undefined;
    Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = () => {
    const [employee, setEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        const getEmployee = async () => {
            console.log("Getting employee");
            if (employee === null) {
                const _employee = await dataStorage.getData("employee");
                if (_employee) setEmployee(JSON.parse(_employee));
            }
        };

        getEmployee();
    }, [employee]);
    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.card}>
                {employee ? (
                    <>
                        <Text>
                            {employee.firstName} {employee.name}
                        </Text>
                        <Text>Zone: {employee.zone}</Text>
                    </>
                ) : (
                    <Text></Text>
                )}
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#9da79b",
        flex: 1,
    },

    card: {
        backgroundColor: "#dae2d8",
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },
});
