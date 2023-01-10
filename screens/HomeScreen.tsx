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

const HomeScreen = (props: Props) => {
    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.card}>
                <Text>Récapitulatif des tâches :</Text>
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
