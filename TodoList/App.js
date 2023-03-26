import { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";

import GoalInput from "./components/GoalInput";

export default function App() {
        const [goalsText, setGoalsText] = useState("");
        const [goals, setGoals] = useState([]);

        const goalInputHandler = (enteredText) => setGoalsText(enteredText);

        const addGoalHandler = () => setGoals((currentGoals) => [...currentGoals, goalsText]);

        return (
                <SafeAreaView style={styles.container}>
                        <View style={styles.inputContainer}>
                                <GoalInput
                                        placeholder="Enter your goals here"
                                        goalInputHandler={goalInputHandler}
                                        addGoalHandler={addGoalHandler}
                                />
                        </View>
                        <View style={styles.goalsContainer}>
                                {goals.map((goal) => {
                                        return <Text>{goal}</Text>;
                                })}
                        </View>
                </SafeAreaView>
        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        inputContainer: {
                flex: 1,
                backgroundColor: "yellow",
        },
        goalsContainer: {
                flex: 5,
        },
});
