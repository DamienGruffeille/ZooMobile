import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Employee from "../interfaces/employee";
import dataStorage from "../functions/dataStorage";

type Props = {};

const Header = (props: Props) => {
    const [employee, setEmployee] = useState<Employee>();

    const getEmployee = async () => {
        const _employee = await dataStorage.getData("employee");

        if (_employee) setEmployee(JSON.parse(_employee));
        console.log("Getting employee : " + _employee);
    };

    useEffect(() => {
        getEmployee();
    }, []);
    return (
        <View style={styles.header}>
            <View style={styles.titleBlock}>
                <Image
                    style={styles.logo}
                    source={require("../assets/logo.png")}
                />
                <Text style={styles.title}>Gestion du Zoo</Text>
            </View>
            <View style={styles.employee}>
                <Text>
                    {employee?.firstName} {employee?.name}
                </Text>
                <Text>Zone : {employee?.zone}</Text>
                <Pressable style={styles.loggoutButton}>
                    <Text>Déconnexion</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: "15%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#70776e",
    },
    titleBlock: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 50,
        height: 50,
        padding: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 5,
    },
    employee: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        height: "100%",
        width: "30%",
    },
    loggoutButton: {
        backgroundColor: "transparent",
    },
});
