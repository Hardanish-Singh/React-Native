import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export default function App() {
        return (
                <SafeAreaView style={styles.container}>
                        <View>
                                <Text style={styles.heading}>TODO LIST</Text>
                        </View>
                </SafeAreaView>
        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: "#1E1A3C",
        },
        heading: {
                color: "#fff",
                fontSize: 20,
                fontWeight: "600",
        },
});
