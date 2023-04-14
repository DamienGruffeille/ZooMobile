import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchAnimalsBySpecy } from "../fetchers/animals";
import Animal from "../interfaces/animal";
import { UserContext } from "../functions/UserContext";

type Props = {
    specy: string | null;
};

const AnimalPosition = ({ specy }: Props) => {
    const { token } = useContext(UserContext);

    const [animalsArray, setAnimalsArray] = useState<Animal[]>([]);

    /** Fetch des animaux appartenant à l'espèce sélectionnée */
    const { data: animals } = useQuery({
        queryKey: ["Animals", specy],
        queryFn: () => fetchAnimalsBySpecy(specy, token),
        enabled: !!specy,
    });

    useEffect(() => {
        if (animals) setAnimalsArray(animals);
    }, [animals]);

    return (
        <>
            {animalsArray &&
                animalsArray.map((animal) => {
                    return (
                        <View style={styles.card} key={animal._id}>
                            <View style={styles.inner}>
                                <Text>{animal.name}</Text>
                                <Text>{animal.position}</Text>
                            </View>
                        </View>
                    );
                })}
        </>
    );
};

export default AnimalPosition;

const styles = StyleSheet.create({
    card: {
        width: "50%",
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
});
