// React Imports
import { useState, useCallback } from "react";
// React Native Imports
import { TextInput, Button, StyleSheet, View } from "react-native";

export default function GoalInput({ placeholder, addGoalHandler, title }) {
        const [goalsText, setGoalsText] = useState("");
        const goalInputHandler = (enteredText) => setGoalsText(enteredText);

        const handlePress = useCallback(() => {
                addGoalHandler(goalsText);
                setGoalsText("");
        }, [goalsText]);

        return (
                <View style={styles.goalsInputContainer}>
                        <TextInput
                                style={styles.textInput}
                                placeholder={placeholder}
                                value={goalsText}
                                onChangeText={goalInputHandler}
                        />
                        <Button
                                title={title}
                                onPress={handlePress}
                        />
                </View>
        );
}

const styles = StyleSheet.create({
        goalsInputContainer: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
        },
        textInput: {
                borderWidth: 1,
                width: "80%",
                height: "100%",
                marginLeft: 20,
        },
});
