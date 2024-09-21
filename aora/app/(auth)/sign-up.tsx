import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

const SignUp: React.FC = (): React.JSX.Element => {
    const { setUser, setIsLoggedIn } = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (name: string, value: string) => setForm({ ...form, [name]: value });

    const submit = async () => {
        if (form.username === "" || form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        setSubmitting(true);
        try {
            const result = await createUser(form.email, form.password, form.username);
            setUser(result);
            setIsLoggedIn(true);
            Alert.alert("Success", "User signed up and signed in successfully");
            router.replace("/home");
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
                <ScrollView automaticallyAdjustKeyboardInsets>
                    <View
                        className="w-full flex justify-center h-full px-4 my-6"
                        style={{
                            minHeight: Dimensions.get("window").height - 100,
                        }}
                    >
                        <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[34px]" />

                        <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">Sign Up to Aora</Text>

                        <FormField
                            title="Username"
                            value={form.username}
                            handleChangeText={(e) => handleChange("username", e)}
                            otherStyles="mt-10"
                        />

                        <FormField
                            title="Email"
                            value={form.email}
                            handleChangeText={(e) => handleChange("email", e)}
                            otherStyles="mt-7"
                            keyboardType="email-address"
                        />

                        <FormField
                            title="Password"
                            value={form.password}
                            handleChangeText={(e) => handleChange("password", e)}
                            otherStyles="mt-7"
                        />

                        <CustomButton
                            title="Sign Up"
                            handlePress={submit}
                            containerStyles="mt-7"
                            isLoading={isSubmitting}
                        />

                        <View className="flex justify-center pt-5 flex-row gap-2">
                            <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
                            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
                                Login
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignUp;
