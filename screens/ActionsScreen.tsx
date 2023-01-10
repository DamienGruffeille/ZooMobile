import { StyleSheet, Text, View } from "react-native";
import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    Connexion: undefined;
    Home: undefined;
    Animaux: undefined;
    Actions: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Actions">;

const ActionsScreen = ({ navigation }: Props) => {
    return (
        <View>
            <Text>ActionsScreen</Text>
        </View>
    );
};

export default ActionsScreen;

const styles = StyleSheet.create({});
