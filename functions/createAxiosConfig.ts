import dataStorage from "./dataStorage";

export const createAxiosConfig = async (token: string) => {
    // const _token = await dataStorage.getData("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    return config;
};
