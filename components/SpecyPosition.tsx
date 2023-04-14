import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { UserContext } from "../functions/UserContext";
import {
    getLastMovement,
    putSpecieInside,
    putSpecieOutside,
} from "../fetchers/events";

type Props = {
    specyId: string | null;
};

const SpecyPosition = ({ specyId }: Props) => {
    const { token } = useContext(UserContext);

    const [lastPosition, setLastPosition] = useState<string>();

    /** Fetch du dernier Event "mouvement" de l'espèce */
    const { data: position, refetch } = useQuery({
        queryKey: ["Position", specyId],
        queryFn: () => getLastMovement(specyId, "Entrée", "Sortie", token),
        enabled: !!specyId,
    });

    useEffect(() => {
        setLastPosition(position?.eventType);
    }, [position]);

    const changeSpeciePosition = async (specy: string | null) => {
        let event;
        if (lastPosition === "Entrée") {
            if (token && specy)
                event = await putSpecieOutside(specy, [], token);
        } else {
            if (token && specy) event = await putSpecieInside(specy, [], token);
        }

        if (event) {
            setLastPosition(event.eventType);
        }
    };

    return (
        <>
            <Text>
                Position actuelle :{" "}
                {lastPosition === "Entrée" ? "Dedans" : "Dehors"}
            </Text>
            <Pressable
                style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1 },
                    styles.button,
                ]}
                onPress={() => changeSpeciePosition(specyId)}
            >
                <Text>{lastPosition === "Entrée" ? "Sortir" : "Rentrer"}</Text>
            </Pressable>
        </>
    );
};

export default SpecyPosition;

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
