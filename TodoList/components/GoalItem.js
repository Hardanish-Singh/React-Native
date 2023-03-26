// React Imports
import { View, Text, StyleSheet } from "react-native";

export default function GoalItem({ text }) {
        return (
                <View style={styles.goalItemContainer}>
                        <Text style={styles.goalItemText}>{text}</Text>
                </View>
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
