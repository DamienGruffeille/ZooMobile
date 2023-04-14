import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { SelectList } from "react-native-dropdown-select-list";

import Header from "../components/Header";
import { UserContext } from "../functions/UserContext";
import Specie from "../interfaces/specie";
import { fetchSpeciesByZone } from "../fetchers/species";
import EnclosureCheck from "../components/EnclosureCheck";
import SpecyPosition from "../components/SpecyPosition";
import AnimalPosition from "../components/AnimalPosition";

type RootStackParamList = {
    Connexion: undefined;
    Home: undefined;
    Animaux: undefined;
    Actions: undefined;
    Evenements: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Animaux">;

const AnimalsScreen = ({ navigation }: Props) => {
    const { employee } = useContext(UserContext);
    const { token } = useContext(UserContext);

    const [speciesList, setSpeciesList] = useState([{ key: "", value: "" }]);
    const [selectedSpecie, setSelectedSpecie] = useState<string | null>(null);

    const { data: species, refetch } = useQuery({
        queryKey: ["Species"],
        queryFn: () => fetchSpeciesByZone(employee?.zone, token),
        enabled: !![employee, token],
    });

    useEffect(() => {
        let speciesArray = [{ key: "", value: "" }];
        species?.map((specy) =>
            speciesArray.push({ key: specy._id, value: specy.name })
        );
        setSpeciesList(speciesArray);
    }, [species]);

    useEffect(() => {
        console.log(selectedSpecie);
    }, [selectedSpecie]);

    return (
        <>
            <Header />
            <View style={styles.container}>
                <ScrollView>
                    <SelectList
                        setSelected={(key: any) => setSelectedSpecie(key)}
                        data={speciesList}
                        save="key"
                    />
                    {species &&
                        species
                            .filter((specy) => specy._id === selectedSpecie)
                            .map((specy) => {
                                return (
                                    <>
                                        {/* Bloc Enclos */}
                                        <View style={styles.card} key={1}>
                                            <View style={styles.inner}>
                                                <Text>
                                                    Enclos :{" "}
                                                    {specy.enclosure.name}
                                                </Text>
                                                <Text>
                                                    Zone :{" "}
                                                    {specy.enclosure.zone}
                                                </Text>
                                                <Text>
                                                    Superficie :{" "}
                                                    {
                                                        specy.enclosure
                                                            .surface_area
                                                    }
                                                </Text>
                                                <EnclosureCheck
                                                    specieId={specy._id}
                                                    enclosureId={
                                                        specy.enclosure._id
                                                    }
                                                />
                                            </View>
                                        </View>

                                        {/* Bloc Espèce */}
                                        <View style={styles.card} key={2}>
                                            <View style={styles.inner}>
                                                <Text>
                                                    Espèce : {specy.name}
                                                </Text>
                                                <Text>
                                                    {specy.dangerous === true
                                                        ? "Dangereux"
                                                        : "Non dangereux"}
                                                </Text>
                                                <Text>
                                                    {specy.sociable === true
                                                        ? "Sociable"
                                                        : "Non sociable"}
                                                </Text>
                                                <SpecyPosition
                                                    specyId={specy._id}
                                                />
                                            </View>
                                        </View>

                                        <AnimalPosition
                                            specy={selectedSpecie}
                                        />
                                    </>
                                );
                            })}
                </ScrollView>
            </View>
        </>
    );
};

export default AnimalsScreen;

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
