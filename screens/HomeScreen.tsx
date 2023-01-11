import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";

import Header from "../components/Header";
import { UserContext } from "../functions/UserContext";
import { getActionsByEmployee } from "../fetchers/actions";
import Action from "../interfaces/action";

type RootStackParamList = {
    Connexion: undefined;
    Home: undefined;
    Animaux: undefined;
    Actions: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
    const { employee } = useContext(UserContext);
    const { token } = useContext(UserContext);

    const [actionsDoneToday, setActionsDoneToday] = useState<Action[]>([]);
    const [numberOfActionsToDoToday, setNumberOfActionsToDoToday] =
        useState<number>(0);
    const [numberOfActionsLate, setNumberOfActionsLate] = useState<number>(0);

    function goToAnimalPage() {
        navigation.navigate("Animaux");
    }

    const { data: actions } = useQuery({
        queryKey: ["Actions"],
        queryFn: () => getActionsByEmployee(employee?.name, token),
        enabled: !![employee, token],
    });

    useEffect(() => {
        let actionsDoneToday: Action[] = [];
        let actionsToDoLate: Action[] = [];
        let actionsToDoToday: Action[] = [];

        const today = new Date();
        const beginningOfToday = today.setHours(0, 0, 0, 0);
        const endOfToday = today.setHours(23, 59, 59, 59);

        actions
            ?.filter(
                (action) =>
                    Date.parse(action.updatedAt) >= beginningOfToday &&
                    Date.parse(action.updatedAt) <= endOfToday &&
                    action.status === "Terminée"
            )
            .forEach((action) => {
                actionsDoneToday.push(action);
            });

        actions
            ?.filter(
                (action) =>
                    action.status === "Planifiée" &&
                    Date.parse(action.plannedDate) < beginningOfToday
            )
            .forEach((action) => {
                actionsToDoLate.push(action);
            });

        actions
            ?.filter(
                (action) =>
                    action.status === "Planifiée" &&
                    Date.parse(action.plannedDate) <= endOfToday &&
                    Date.parse(action.plannedDate) >= beginningOfToday
            )
            .forEach((action) => {
                actionsToDoToday.push(action);
            });

        setActionsDoneToday(actionsDoneToday);
        setNumberOfActionsLate(actionsToDoLate.length);
        setNumberOfActionsToDoToday(actionsToDoToday.length);
    }, [actions]);

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
                                <Text style={styles.title}>Actions : </Text>
                                <Text>
                                    {actionsDoneToday.length +
                                        " actions terminées"}
                                </Text>

                                <Text>
                                    {numberOfActionsLate + " actions en retard"}
                                </Text>

                                <Text>
                                    {numberOfActionsToDoToday +
                                        " actions prévues ce jour"}
                                </Text>
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

    title: {
        fontSize: 14,
        fontWeight: "bold",
    },
});
