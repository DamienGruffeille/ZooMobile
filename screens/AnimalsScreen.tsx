import { StyleSheet, Text, View } from "react-native";
import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    Connexion: undefined;
    Home: undefined;
    Animaux: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Animaux">;

const AnimalsScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>AnimalsScreen</Text>
        </View>
    );
};

export default AnimalsScreen;

const styles = StyleSheet.create({});
