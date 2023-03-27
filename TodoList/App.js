// React Imports
import { useState } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Platform } from "react-native";

// Component Imports
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
        const [goals, setGoals] = useState([]);

        const addGoalHandler = (goalsText) => {
                setGoals((currentGoals) => [...currentGoals, { text: goalsText, id: Math.random().toString() }]);
        };

        return (
                <SafeAreaView style={styles.container}>
                        <View style={styles.appInputContainer}>
                                <GoalInput
                                        placeholder="Enter your goals here"
                                        addGoalHandler={addGoalHandler}
                                        title="Add Me"
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
