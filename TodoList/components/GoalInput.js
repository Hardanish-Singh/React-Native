import { TextInput, Button, StyleSheet, View } from "react-native";

export default function GoalInput({ placeholder, goalInputHandler, addGoalHandler, goalsText }) {
        return (
                <View style={styles.goalsInputContainer}>
                        <TextInput
                                style={styles.textInput}
                                placeholder={placeholder}
                                value={goalsText}
                                onChangeText={goalInputHandler}
                        />
                        <Button title="Add Me" onPress={addGoalHandler} />
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
                marginLeft: 5,
        },
});
