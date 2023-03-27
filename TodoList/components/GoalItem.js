// React Imports
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function GoalItem({ text, deleteGoalHandler }) {
        return (
                <Pressable onPress={deleteGoalHandler}>
                        <View style={styles.goalItemContainer}>
                                <Text style={styles.goalItemText}>{text}</Text>
                        </View>
                </Pressable>
        );
}

const styles = StyleSheet.create({
        goalItemContainer: {
                margin: 8,
                padding: 8,
                borderRadius: 6,
                backgroundColor: "#5e0acc",
        },
        goalItemText: {
                color: "white",
        },
});
