import { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";

import GoalInput from "./components/GoalInput";

export default function App() {
        const [goalsText, setGoalsText] = useState("");
        const [goals, setGoals] = useState([]);

        const goalInputHandler = (enteredText) => setGoalsText(enteredText);

        const addGoalHandler = () => {
                setGoals((currentGoals) => [...currentGoals, goalsText]);
                setGoalsText("");
        };

        return (
                <SafeAreaView style={styles.container}>
                        <View style={styles.appInputContainer}>
                                <GoalInput
                                        placeholder="Enter your goals here"
                                        goalInputHandler={goalInputHandler}
                                        addGoalHandler={addGoalHandler}
                                        goalsText={goalsText}
                                />
                        </View>
                        <View style={styles.goalsContainer}>
                                {goals.map((goal) => {
                                        return (
                                                <View key={goal} style={styles.goalItem}>
                                                        <Text style={{ color: "white" }}>{goal}</Text>
                                                </View>
                                        );
                                })}
                        </View>
                </SafeAreaView>
        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        appInputContainer: {
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: "#cccccc",
        },
        goalsContainer: {
                flex: 3,
        },
        goalItem: {
                margin: 8,
                padding: 8,
                borderRadius: 6,
                backgroundColor: "#5e0acc",
        },
});
