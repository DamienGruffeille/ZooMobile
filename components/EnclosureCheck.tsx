import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { UserContext } from "../functions/UserContext";
import { checkEnclosure, getLastEvent } from "../fetchers/events";

type Props = {
    specieId: string | null;
    enclosureId: string | null;
};

const EnclosureCheck = ({ specieId, enclosureId }: Props) => {
    const { employee } = useContext(UserContext);
    const { token } = useContext(UserContext);

    const [derniereVerif, setDerniereVerif] = useState<string>();

    const { data: verif } = useQuery({
        queryKey: ["verification"],
        queryFn: () => getLastEvent(specieId, "Vérification", token),
        enabled: !![enclosureId, token],
    });

    useEffect(() => {
        if (verif) {
            setDerniereVerif(verif.createdAt);
        } else {
            setDerniereVerif("Enclos jamais vérifié");
        }
    }, [verif]);

    const postEnclosureIsChecked = async () => {
        let event = await checkEnclosure(enclosureId, token);

        if (event) setDerniereVerif(event.createdAt);
    };

    return (
        <>
            <Text>Enclos vérifié le : {derniereVerif}</Text>
            {employee?.role === "Vétérinaire" ||
            employee?.role === "Responsable" ? (
                <Pressable
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1 },
                        styles.button,
                    ]}
                    onPress={postEnclosureIsChecked}
                >
                    <Text>Vérifier</Text>
                </Pressable>
            ) : (
                <Text></Text>
            )}
        </>
    );
};

export default EnclosureCheck;

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        padding: 2,
        margin: 2,
        width: "25%",
        alignItems: "center",
    },
});
