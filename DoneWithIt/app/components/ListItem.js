import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import colors from "../config/colors";

export default function ListItem({ image, title, subTitle }) {
        return (
                <View style={styles.container}>
                        <Image style={styles.image} source={image} />
                        <View>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={styles.subTitle}>{subTitle}</Text>
                        </View>
                </View>
        );
}

const styles = StyleSheet.create({
        container: {
                flexDirection: "row",
                // marginVertical: 50,
        },
        image: {
                width: 70,
                height: 70,
                borderRadius: 35,
                marginRight: 10,
        },
        subTitle: {
                color: colors.medium,
        },
        title: {
                fontWeight: "500",
        },
});
