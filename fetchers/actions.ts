import axios from "axios";
import { createAxiosConfig } from "../functions/createAxiosConfig";
import Action from "../interfaces/action";

export const getActionsByEmployee = async (
    employeeName: string | undefined,
    token: string | null
) => {
    try {
        if (token) {
            const config = await createAxiosConfig(token);

            const response = await axios.get(
                `http://172.16.130.38:3000/api/actions/employe/${employeeName}`,
                config
            );

            const actions: Action[] = response.data.actions;
            console.log("Actions fetcher : " + actions.length);
            return actions;
        }
    } catch (error: any) {
        console.log(error.message);
    }
};

export const updateAction = async (actionId: string, token: string | null) => {
    try {
        if (token) {
            const config = await createAxiosConfig(token);
            const payLoad = { _id: actionId };

            const response = await axios.put(
                `http://172.16.130.38:3000/api/actions/update`,
                payLoad,
                config
            );

            const updatedAction: Action = response.data.actionUpdated;

            return updatedAction;
        }
    } catch (error: any) {
        console.log(error.message);
    }
};
