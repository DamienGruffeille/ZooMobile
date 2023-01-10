import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import Header from "../components/Header";
import { UserContext } from "../functions/UserContext";

type RootStackParamList = {
    Connexion: undefined;
    Home: undefined;
    Animaux: undefined;
    Actions: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
    const { employee } = useContext(UserContext);

    function goToAnimalPage() {
        navigation.navigate("Animaux");
    }

    return (
        <>
            <Header />
            <View style={styles.container}>
                <View style={styles.card}>
                    {employee ? (
                        <>
                            <View style={styles.inner}>
                                <Text>
                                    {employee.firstName} {employee.name}
                                </Text>

                                <Text>Zone: {employee.zone}</Text>
                            </View>
                        </>
                    ) : (
                        <Text></Text>
                    )}
                </View>

                <Pressable style={styles.card} onPress={goToAnimalPage}>
                    <View style={styles.inner}>
                        <Text>Gestion des animaux</Text>
                    </View>
                </Pressable>

                <View style={styles.card}>
                    <View style={styles.inner}>
                        <Text>Actions</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.inner}>
                        <Text>Evènements</Text>
                    </View>
                </View>
            </View>
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "85%",
        padding: 5,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9da79b",
    },

    card: {
        width: "48%",
        height: "48%",
        padding: 5,
        margin: 3,
        borderRadius: 10,
        backgroundColor: "#dae2d8",
    },

    inner: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
