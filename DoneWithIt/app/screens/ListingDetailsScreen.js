import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import ListItem from "../components/ListItem";

import colors from "../config/colors";

export default function ListingDetailsScreen(props) {
        return (
                <View>
                        <Image style={styles.image} source={require("../assets/jacket.jpg")} />
                        <View style={styles.detailsContainer}>
                                <Text style={styles.title}>Red jacket for sale</Text>
                                <Text style={styles.price}>$100</Text>
                                <ListItem
                                        image={require("../assets/mosh.jpg")}
                                        title="Mosh Hamedani"
                                        subTitle="5 Listings"
                                />
                        </View>
                </View>
        );
}

const styles = StyleSheet.create({
        detailsContainer: {
                padding: 20,
        },
        image: {
                width: "100%",
                height: 300,
        },
        price: {
                color: colors.secondary,
                fontWeight: "bold",
                fontSize: 20,
                marginVertical: 10,
        },
        title: {
                fontSize: 24,
                fontWeight: 500,
        },
});
