import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";

import Header from "../components/Header";
import { UserContext } from "../functions/UserContext";
import { getActionsByEmployee, updateAction } from "../fetchers/actions";
import Action from "../interfaces/action";

type RootStackParamList = {
    Connexion: undefined;
    Home: undefined;
    Animaux: undefined;
    Actions: undefined;
    Evenements: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Actions">;

const ActionsScreen = ({ navigation }: Props) => {
    const { employee } = useContext(UserContext);
    const { token } = useContext(UserContext);
    const [actionsArray, setActionsArray] = useState<Action[] | null>(null);

    const { data: actions, refetch } = useQuery({
        queryKey: ["Actions"],
        queryFn: () => getActionsByEmployee(employee?.name, token),
        enabled: !![employee, token],
    });

    useEffect(() => {
        let actionsToPush: Action[] = [];
        actions
            ?.filter((action) => action.status === "Planifiée")
            .forEach((action) => {
                actionsToPush.push(action);
            });

        setActionsArray(actionsToPush);
    }, [actions]);

    const updateActionSelected = (actionId: string) => {
        updateAction(actionId, token);
        Alert.alert("Action terminée !");
        refetch();
    };

    return (
        <>
            <Header />
            <View style={styles.container}>
                <ScrollView>
                    {actionsArray && actionsArray.length > 0 ? (
                        actionsArray.map((action) => {
                            return (
                                <View style={styles.card} key={action._id}>
                                    <View style={styles.inner}>
                                        <Text>Statut : {action.status}</Text>
                                        <Text>
                                            Date prévue: {action.plannedDate}
                                        </Text>
                                        <Text>Enclos: {action.enclosure}</Text>
                                        <Text>Espèce: {action.specie}</Text>
                                        <Text>Animal: {action.animal}</Text>
                                        <Text>
                                            Observations: {action.observation}
                                        </Text>

                                        <Pressable
                                            style={({ pressed }) => [
                                                { opacity: pressed ? 0.5 : 1 },
                                                styles.button,
                                            ]}
                                            onPress={() =>
                                                updateActionSelected(action._id)
                                            }
                                        >
                                            <Text>Terminer</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            );
                        })
                    ) : (
                        <View style={styles.container}>
                            <View style={styles.card}>
                                <View style={styles.inner}>
                                    <Text>Aucune action à réaliser</Text>
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </View>
        </>
    );
};

export default ActionsScreen;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "85%",
        padding: 5,
        backgroundColor: "#9da79b",
    },

    scroll: {
        flexGrow: 1,
        justifyContent: "center",
        width: Dimensions.get("window").width,
    },

    card: {
        width: "100%",
        // height: "23%",
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

    title: {
        fontSize: 14,
        fontWeight: "bold",
    },

    button: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        padding: 2,
        margin: 2,
    },
});
