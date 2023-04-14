import axios from "axios";
import { createAxiosConfig } from "../functions/createAxiosConfig";
import IEvent from "../interfaces/event";

export const getEventsByZone = async (
    zoneId: string | undefined,
    token: string | null
) => {
    try {
        if (token) {
            const config = await createAxiosConfig(token);
            if (zoneId !== "toutes") {
                const response = await axios.get(
                    `http://172.16.130.38:3000/api/evenements/zones/${zoneId}`,
                    config
                );
                if (response.data) {
                    const events: IEvent[] = response.data.events;
                    return events;
                } else {
                    return null;
                }
            } else {
                const response = await axios.get(
                    "http://172.16.130.38:3000/api/evenements/get",
                    config
                );
                if (response.data) {
                    const events: IEvent[] = response.data.events;
                    return events;
                } else {
                    return null;
                }
            }
        }
    } catch (error: any) {
        console.log(error.message);
    }
};

export const getLastEvent = async (
    specieId: string | null,
    eventType: string | null,
    token: string | null
) => {
    try {
        if (token) {
            const response = await axios.get(
                `http://172.16.130.38:3000/api/evenements/especes/last`,
                {
                    params: { _id: specieId, eventType: eventType },
                    headers: { Authorization: "Bearer " + token },
                }
            );
            if (response.data.events) {
                const event: IEvent = response.data.events;
                return event;
            } else {
                return null;
            }
        }
    } catch (error: any) {
        console.log(error.message);
    }
};

let event: IEvent;
export const checkEnclosure = async (
    enclosureId: string | null,
    token: string | null
) => {
    const payLoad = {
        enclosure: enclosureId,
        observations: [],
    };
    try {
        if (token && enclosureId) {
            const config = await createAxiosConfig(token);
            await axios
                .post(
                    "http://172.16.130.38:3000/api/enclos/verifier",
                    payLoad,
                    config
                )
                .then((response) => {
                    console.log("Ok vérification enregistrée", response.data);
                    event = response.data.event;
                })
                .catch((error) => {
                    console.log("Vérification non enregistrée", error.message);
                });
            return event;
        }
    } catch (error: any) {
        console.log(error.message);
    }
};

export const getLastMovement = async (
    specieId: string | null,
    eventType: string | null,
    eventType2: string | null,
    token: string | null
) => {
    const response = await axios.get(
        `http://172.16.130.38:3000/api/evenements/especes/last`,
        {
            params: {
                _id: specieId,
                eventType: eventType,
                eventType2: eventType2,
            },
            headers: { Authorization: "Bearer " + token },
        }
    );
    if (response.data.events) {
        const event: IEvent = response.data.events;
        return event;
    } else {
        return null;
    }
};

export const putSpecieOutside = async (
    specieId: string,
    stillInsideAnimals: string[],
    token: string
) => {
    const config = await createAxiosConfig(token);
    const payLoad = {
        _id: specieId,
        stillInsideAnimals: stillInsideAnimals,
    };

    await axios
        .put("http://172.16.130.38:3000/api/especes/sortir", payLoad, config)
        .then((response) => {
            console.log("Ok post effectué", response.data);
            event = response.data.newEvent;
        })
        .catch((error) => {
            console.log("Post non effectué", error.message);
        });
    return event;
};

export const putSpecieInside = async (
    specieId: string,
    stillOutsideAnimals: string[],
    token: string
) => {
    const payLoad = {
        _id: specieId,
        stillOutsideAnimals: stillOutsideAnimals,
    };
    const config = await createAxiosConfig(token);
    await axios
        .put("http://172.16.130.38:3000/api/especes/rentrer", payLoad, config)
        .then((response) => {
            console.log("Ok post effectué", response.data);
            event = response.data.newEvent;
        })
        .catch((error) => {
            console.log("Post non effectué", error.message);
        });
    return event;
};
