import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

import colors from "../config/colors";

export default function AppButton({ title, onPress }) {
        return (
                <Pressable style={styles.button} onPress={onPress}>
                        <Text style={styles.text}>{title}</Text>
                </Pressable>
        );
}

const styles = StyleSheet.create({
        button: {
                backgroundColor: colors.primary,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
                width: "100%",
        },
        text: {
                color: colors.white,
                fontSize: 18,
                textTransform: "uppercase",
                fontWeight: "bold",
        },
});
