// React Imports
import { useState } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Platform } from "react-native";

// Component Imports
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
        const [goals, setGoals] = useState([]);

        const addGoalHandler = (text) =>
                setGoals((currentGoals) => [...currentGoals, { text, id: Math.random().toString() }]);

        const deleteGoalHandler = (id) => setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id));

        return (
                <SafeAreaView style={styles.container}>
                        <View style={styles.inputContainer}>
                                <GoalInput
                                        placeholder="Enter your goals here"
                                        addGoalHandler={addGoalHandler}
                                        title="Add"
                                />
                        </View>
                        <View style={styles.goalsContainer}>
                                <FlatList
                                        data={goals}
                                        renderItem={(itemData) => (
                                                <GoalItem
                                                        text={itemData.item.text}
                                                        deleteGoalHandler={deleteGoalHandler.bind(
                                                                this,
                                                                itemData.item.id
                                                        )}
                                                />
                                        )}
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
        inputContainer: {
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: "#cccccc",
        },
        goalsContainer: {
                flex: 3,
        },
});
