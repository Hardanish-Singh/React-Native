import React from "react";
import { View, StyleSheet, Image, Text, TouchableHighlight } from "react-native";

import colors from "../config/colors";

export default function ListItem({ image, title, subTitle, onPress }) {
        return (
                <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
                        <View style={styles.container}>
                                <Image style={styles.image} source={image} />
                                <View>
                                        <Text style={styles.title}>{title}</Text>
                                        <Text style={styles.subTitle}>{subTitle}</Text>
                                </View>
                        </View>
                </TouchableHighlight>
        );
}

const styles = StyleSheet.create({
        container: {
                flexDirection: "row",
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
