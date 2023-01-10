import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (token: string) => {
    try {
        console.log("storeData : " + JSON.stringify(token));
        await AsyncStorage.setItem("token", JSON.stringify(token));
    } catch (e) {
        console.log("StoreData : " + e);
    }
};

const getData = async (dataType: string) => {
    try {
        const data = await AsyncStorage.getItem(dataType);
        console.log("GetData : " + data);

        return data != null ? data : null;
    } catch (e) {
        console.log("GetData : " + e);
    }
};

const removeKeys = async () => {
    const keys = ["token"];
    try {
        await AsyncStorage.multiRemove(keys);
    } catch (e) {
        console.log("ClearAll : " + e);
    }
};

export default { storeData, getData, removeKeys };
