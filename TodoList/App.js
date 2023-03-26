import { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, FlatList } from "react-native";

import GoalInput from "./components/GoalInput";

export default function App() {
        const [goalsText, setGoalsText] = useState("");
        const [goals, setGoals] = useState([]);

        const goalInputHandler = (enteredText) => setGoalsText(enteredText);

        const addGoalHandler = () => {
                setGoals((currentGoals) => [...currentGoals, { text: goalsText, id: Math.random().toString() }]);
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
                                <FlatList
                                        data={goals}
                                        renderItem={(itemData) => {
                                                return (
                                                        <View style={styles.goalItemContainer}>
                                                                <Text style={styles.goalItemText}>
                                                                        {itemData.item.text}
                                                                </Text>
                                                        </View>
                                                );
                                        }}
                                        keyExtractor={(item) => item.id}
                                        alwaysBounceVertical={false}
                                />
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
