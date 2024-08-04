import { Audio /*ResizeMode, Video*/ } from "expo-av";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import { icons } from "../constants";

const VideoCard = ({ video }: any) => {
    const {
        title,
        thumbnail,
        users: { avatar, username: creator },
        video: videoUrl,
    } = video;
    const [play, setPlay] = useState(false);

    useEffect(() => {
        Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    }, []);

    return (
        <View className="flex flex-col items-center px-4 mb-14">
            <View className="flex flex-row gap-3 items-start">
                <View className="flex justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                        <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
                    </View>

                    <View className="flex justify-center flex-1 ml-3 gap-y-1">
                        <Text className="font-psemibold text-sm text-white" numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                            {creator}
                        </Text>
                    </View>
                </View>

                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                </View>
            </View>

            {play ? (
                // <Video
                //     source={{ uri: videoUrl }}
                //     className="w-full h-60 rounded-xl mt-3"
                //     resizeMode={ResizeMode.CONTAIN}
                //     useNativeControls
                //     shouldPlay
                //     onPlaybackStatusUpdate={(status: any) => {
                //         if (status.didJustFinish) {
                //             setPlay(false);
                //         }
                //     }}
                // />
                <View className="flex w-full h-60 rounded-xl mt-3">
                    <WebView
                        allowsInlineMediaPlayback
                        source={{
                            html: `
                            <div style="width: 100%; height: 100%; background: #161622">
                                <iframe src="${videoUrl}?controls=0&autoplay=1&showinfo=0" frameborder="0" allowfullscreen style="width: 100%; height: 100%;"></iframe>
                            </div>
                            `,
                        }}
                    />
                </View>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
                >
                    <Image source={{ uri: thumbnail }} className="w-full h-full rounded-xl mt-3" resizeMode="cover" />

                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default VideoCard;
