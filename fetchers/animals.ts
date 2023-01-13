import axios from "axios";

import { createAxiosConfig } from "../functions/createAxiosConfig";
import Animal from "../interfaces/animal";

let animals: Animal[];

export const fetchAnimalsBySpecy = async (
    specie: string | null,
    token: string | null
) => {
    try {
        if (specie && token) {
            const config = await createAxiosConfig(token);
            console.log("Fetching animals " + specie);

            const response = await axios.get(
                `http://172.16.130.38:3000/api/animaux/get/specie/${specie}`,
                config
            );
            animals = response.data.animals;

            return animals;
        }
    } catch (error: any) {
        console.log(error.message);
    }
};
