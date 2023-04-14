import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { DateTime } from "react-intl-datetime-format";

import Header from "../components/Header";
import { UserContext } from "../functions/UserContext";
import { getEventsByZone } from "../fetchers/events";

import IEvent from "../interfaces/event";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    Connexion: undefined;
    Home: undefined;
    Animaux: undefined;
    Actions: undefined;
    Evenements: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Evenements">;

const EventsScreen = ({ navigation }: Props) => {
    const { employee } = useContext(UserContext);
    const { token } = useContext(UserContext);

    const [selectedZone, setSelectedZone] = useState<string>();
    const [eventsToDisplay, setEventsToDisplay] = useState<IEvent[]>([]);

    useEffect(() => {
        if (employee) setSelectedZone(employee.zone);
    }, [employee]);

    /** Fetch les évènements de la zone sélectionnée (par défaut celle de l'employé) */
    const { data: eventsByZone } = useQuery({
        queryKey: ["EventsByZone", selectedZone],
        queryFn: () => getEventsByZone(selectedZone, token),
        enabled: !!selectedZone,
    });

    useEffect(() => {
        if (eventsByZone) setEventsToDisplay(eventsByZone);
    }, [eventsByZone]);

    return (
        <>
            <Header />
            <View style={styles.container}>
                <ScrollView>
                    {eventsToDisplay && eventsToDisplay.length > 0 ? (
                        eventsToDisplay.map((event) => {
                            return (
                                <View style={styles.card} key={event._id}>
                                    <View style={styles.inner}>
                                        <Text>
                                            Enclos: {event.enclosure.name}
                                        </Text>
                                        <Text>Espèce: {event.specie}</Text>
                                        <Text>Type: {event.eventType}</Text>
                                        <Text>
                                            Animaux:{" "}
                                            {event.animal.map((animal) => {
                                                return animal + " ";
                                            })}
                                        </Text>
                                        <Text>
                                            <>
                                                Créé le:{" "}
                                                {new Date(
                                                    event.createdAt
                                                ).toLocaleString("fr-FR", {
                                                    weekday: "short",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                })}{" "}
                                                par {event.createdBy}
                                            </>
                                        </Text>
                                    </View>
                                </View>
                            );
                        })
                    ) : (
                        <View style={styles.container}>
                            <View style={styles.card}>
                                <View style={styles.inner}>
                                    <Text>Aucun évènement à afficher</Text>
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </View>
        </>
    );
};

export default EventsScreen;

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
});
