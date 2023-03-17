import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

export default function ListItemDeleteAction({ onPress }) {
        return (
                <Pressable style={styles.container} onPress={onPress}>
                        <View>
                                <MaterialCommunityIcons name="trash-can" size={35} color={colors.white} />
                        </View>
                </Pressable>
        );
}

const styles = StyleSheet.create({
        container: {
                backgroundColor: colors.danger,
                width: 70,
                justifyContent: "center",
                alignItems: "center",
        },
});
