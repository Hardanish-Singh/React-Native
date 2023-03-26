import { TextInput, Button, StyleSheet, View } from "react-native";

export default function GoalInput({ placeholder, goalInputHandler, addGoalHandler }) {
        return (
                <View style={{ flexDirection: "row" }}>
                        <TextInput style={styles.textInput} placeholder={placeholder} onChangeText={goalInputHandler} />
                        <Button title="Add Me" onPress={addGoalHandler} />
                </View>
        );
}

const styles = StyleSheet.create({
        textInput: {
                borderWidth: 1,
                width: "80%",
        },
});
