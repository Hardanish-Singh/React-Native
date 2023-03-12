import React from "react";
import { StyleSheet, ImageBackground, View, Image, Text } from "react-native";

import AppButton from "../components/AppButton";

export default function WelcomeScreen() {
        return (
                <ImageBackground style={styles.imageBackgroundContainer} source={require("../assets/background.jpg")}>
                        <View style={styles.logoContainer}>
                                <Image style={styles.logo} source={require("../assets/logo-red.png")} />
                                <Text style={styles.tagline}>Sell What You Don't Need</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                                <AppButton
                                        title="Login"
                                        color="primary"
                                        onPress={() => console.log("Login Button Clicked")}
                                />
                                <AppButton
                                        title="Register"
                                        color="secondary"
                                        onPress={() => console.log("Register Button Clicked")}
                                />
                        </View>
                </ImageBackground>
        );
}

const styles = StyleSheet.create({
        imageBackgroundContainer: {
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
        },
        buttonContainer: {
                padding: 20,
                width: "100%",
        },
        logo: {
                width: 100,
                height: 100,
        },
        logoContainer: {
                position: "absolute",
                top: 70,
                alignItems: "center",
        },
        tagline: {
                fontSize: 25,
                fontWeight: "600",
                paddingVertical: 20,
        },
});
