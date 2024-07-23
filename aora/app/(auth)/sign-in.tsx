import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { Link } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

export default function SignIn() {
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const submit = async () => {};

    const handleChange = (name: string, value: string) => setForm({ ...form, [name]: value });

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
                        <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">Log in to Aora</Text>
                        <FormField
                            title="Email"
                            value={form.email}
                            handleChangeText={(e: any) => handleChange("email", e)}
                            otherStyles="mt-7"
                            keyboardType="email-address"
                        />
                        <FormField
                            title="Password"
                            value={form.password}
                            handleChangeText={(e: any) => handleChange("password", e)}
                            otherStyles="mt-7"
                        />
                        <CustomButton
                            title="Sign In"
                            handlePress={submit}
                            containerStyles="mt-7"
                            isLoading={isSubmitting}
                        />
                        <View className="flex justify-center pt-5 flex-row gap-2">
                            <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
                            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
                                Signup
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
