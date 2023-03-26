import { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, FlatList, Platform } from "react-native";

import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

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
                                        renderItem={(itemData) => <GoalItem text={itemData.item.text} />}
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
                paddingTop: Platform.OS === "android" ? 50 : 0,
        },
        appInputContainer: {
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: "#cccccc",
        },
        goalsContainer: {
                flex: 3,
        },
});
