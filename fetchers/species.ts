import axios from "axios";
import { createAxiosConfig } from "../functions/createAxiosConfig";
import Specie from "../interfaces/specie";

let species: Specie[] = [];

export const fetchSpeciesByZone = async (
    zone: string | undefined,
    token: string | null
) => {
    try {
        if (token) {
            const config = await createAxiosConfig(token);
            console.log("Fetching species " + zone);
            if (zone !== "toutes") {
                const response = await axios.get(
                    `http://172.16.130.38:3000/api/especes/get/zone/${zone}`,
                    config
                );
                species = response.data;
            } else {
                const response = await axios.get(
                    `http://172.16.130.38:3000/api/especes/get`,
                    config
                );
                species = response.data.species;
            }

            return species;
        }
    } catch (error: any) {
        console.log(error.message);
    }
};
