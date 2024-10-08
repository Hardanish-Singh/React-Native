import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout: React.FC = (): React.JSX.Element => (
    <>
        <Stack>
            <Stack.Screen
                name="sign-in"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="sign-up"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
        <StatusBar backgroundColor="#161622" style="light" />
    </>
);

export default AuthLayout;
