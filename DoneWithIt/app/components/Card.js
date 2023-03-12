import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import colors from "../config/colors";

export default function Card({ title, subtitle, image }) {
        return (
                <View style={styles.card}>
                        <Image style={styles.image} source={image} />
                        <View styles={styles.detailContainer}>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={styles.subTitle}>{subtitle}</Text>
                        </View>
                </View>
        );
}

const styles = StyleSheet.create({
        card: {
                borderRadius: 15,
                backgroundColor: colors.white,
                marginBottom: 20,
                overflow: "hidden",
        },
        image: {
                width: "100%",
                height: 200,
        },
        detailContainer: {
                padding: 20,
        },
        title: {
                margin: 5,
        },
        subTitle: {
                color: colors.secondary,
                fontWeight: "bold",
                margin: 5,
        },
});
