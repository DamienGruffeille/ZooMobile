import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const Separator = () => {
    return <View style={styles.separator}></View>;
};

export default Separator;

const styles = StyleSheet.create({
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: "#4b4844",
        marginTop: 10,
        marginBottom: 10,
    },
});
