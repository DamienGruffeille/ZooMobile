import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value: any) => {
    try {
        await AsyncStorage.setItem("token", JSON.stringify(value.token));
        await AsyncStorage.setItem("employee", JSON.stringify(value.employee));
    } catch (e) {
        console.log("StoreData : " + e);
    }
};

const getData = async (dataType: string) => {
    try {
        const data = await AsyncStorage.getItem(dataType);

        return data != null ? data : null;
    } catch (e) {
        console.log("GetData : " + e);
    }
};

export default { storeData, getData };
