import React from "react";
import { View, StyleSheet, Image, Text, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../config/colors";

export default function ListItem({ image, title, subTitle, ImageComponent, onPress, renderRightActions }) {
        return (
                <Swipeable renderRightActions={renderRightActions}>
                        <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
                                <View style={styles.container}>
                                        {ImageComponent}
                                        {image && <Image style={styles.image} source={image} />}
                                        <View style={styles.detailContainer}>
                                                <Text style={styles.title}>{title}</Text>
                                                {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
                                        </View>
                                </View>
                        </TouchableHighlight>
                </Swipeable>
        );
}

const styles = StyleSheet.create({
        container: {
                flexDirection: "row",
        },
        detailContainer: {
                marginLeft: 10,
                justifyContent: "center",
        },
        image: {
                width: 70,
                height: 70,
                borderRadius: 35,
        },
        subTitle: {
                color: colors.medium,
        },
        title: {
                fontWeight: "500",
        },
});
