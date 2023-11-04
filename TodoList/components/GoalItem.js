// React Native Imports
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function GoalItem({ text, deleteGoalHandler }) {
        return (
                <View style={styles.goalItemContainer}>
                        <Pressable
                                android_ripple={{ color: "#210644" }}
                                onPress={deleteGoalHandler}
                                style={({ pressed }) => pressed && styles.pressedItem}
                        >
                                <Text style={styles.goalItemText}>{text}</Text>
                        </Pressable>
                </View>
        );
}

const styles = StyleSheet.create({
        goalItemContainer: {
                margin: 10,
                borderRadius: 10,
                backgroundColor: "#5e0acc",
        },
        goalItemText: {
                color: "white",
                padding: 10,
        },
        pressedItem: {
                opacity: 0.5,
        },
});
