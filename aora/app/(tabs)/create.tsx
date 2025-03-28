import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { icons } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createVideoPost } from "@/lib/appwrite";
import { useEvent } from "expo";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Create: React.FC = (): React.JSX.Element => {
    const { user } = useGlobalContext();
    const [uploading, setUploading] = useState<boolean>(false);
    const [form, setForm] = useState<Record<string, any>>({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
    });
    const player = useVideoPlayer(form?.video?.uri, (player) => {
        player.loop = true;
    });
    const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });

    const openPicker = async (selectType: string) => {
        const result = await DocumentPicker.getDocumentAsync({
            type: selectType === "image" ? ["image/png", "image/jpg"] : ["video/mp4", "video/gif"],
        });
        if (!result.canceled) {
            if (selectType === "image") {
                setForm({
                    ...form,
                    thumbnail: result.assets[0],
                });
            }
            if (selectType === "video") {
                setForm({
                    ...form,
                    video: result.assets[0],
                });
            }
        } else {
            setTimeout(() => {
                Alert.alert("Document picked", JSON.stringify(result, null, 2));
            }, 100);
        }
    };

    const submit = async () => {
        if (form.prompt === "" || form.title === "" || !form.thumbnail || !form.video) {
            return Alert.alert("Please provide all fields");
        }
        setUploading(true);
        try {
            await createVideoPost({
                ...form,
                userId: user.$id,
            });
            Alert.alert("Success", "Post uploaded successfully");
            router.push("/home");
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setForm({
                title: "",
                video: null,
                thumbnail: null,
                prompt: "",
            });
            setUploading(false);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
                <ScrollView className="px-4 my-6" automaticallyAdjustKeyboardInsets>
                    <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
                    <FormField
                        title="Video Title"
                        value={form.title}
                        placeholder="Give your video a catchy title..."
                        handleChangeText={(e) => setForm({ ...form, title: e })}
                        otherStyles="mt-10"
                    />
                    <View className="mt-7 space-y-2">
                        <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
                        <TouchableOpacity
                            onPress={() => {
                                if (isPlaying) {
                                    player.pause();
                                } else {
                                    player.play();
                                }
                                openPicker("video");
                            }}
                        >
                            {form.video ? (
                                <VideoView
                                    className="w-full h-64 rounded-2xl"
                                    player={player}
                                    allowsFullscreen
                                    allowsPictureInPicture
                                />
                            ) : (
                                <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                                    <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                                        <Image
                                            source={icons.upload}
                                            resizeMode="contain"
                                            alt="upload"
                                            className="w-1/2 h-1/2"
                                        />
                                    </View>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View className="mt-7 space-y-2">
                        <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>
                        <TouchableOpacity onPress={() => openPicker("image")}>
                            {form.thumbnail ? (
                                <Image
                                    source={{ uri: form.thumbnail.uri }}
                                    resizeMode="cover"
                                    className="w-full h-64 rounded-2xl"
                                />
                            ) : (
                                <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                                    <Image
                                        source={icons.upload}
                                        resizeMode="contain"
                                        alt="upload"
                                        className="w-5 h-5"
                                    />
                                    <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                    <FormField
                        title="AI Prompt"
                        value={form.prompt}
                        placeholder="The AI prompt of your video...."
                        handleChangeText={(e) => setForm({ ...form, prompt: e })}
                        otherStyles="mt-7"
                    />
                    <CustomButton
                        title="Submit & Publish"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={uploading}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Create;
