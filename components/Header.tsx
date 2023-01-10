import { Pressable, StyleSheet, Text, View, Image, Alert } from "react-native";
import React from "react";
import dataStorage from "../functions/dataStorage";
import { StackActions, useNavigation } from "@react-navigation/native";

type Props = {};

const Header = () => {
    const navigation = useNavigation();

    const doUserLogOut = async () => {
        await dataStorage
            .removeKeys()
            .then(async () => {
                const currentUser = await dataStorage.getData("employee");

                if (currentUser === null) {
                    Alert.alert("Success!", "Utilisateur déconnecté");
                }

                navigation.dispatch(StackActions.popToTop());
            })
            .catch((error) => {
                Alert.alert("Error!", error.message);
            });
    };

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
                <Pressable onPress={doUserLogOut} style={styles.loggoutButton}>
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
