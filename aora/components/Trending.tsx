import { Audio, ResizeMode, Video } from "expo-av";
import { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import { icons } from "../constants";

const TrendingItem = ({ item }: any) => {
    const [play, setPlay] = useState(false);

    useEffect(() => {
        Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    }, []);

    return (
        <View className="mr-5">
            {play ? (
                <>
                    {item.video.includes("/storage/buckets") ? (
                        <Video
                            source={{ uri: item.video }}
                            className="flex w-72 h-72 mt-4"
                            resizeMode={ResizeMode.CONTAIN}
                            useNativeControls
                            shouldPlay
                            onPlaybackStatusUpdate={(status: any) => {
                                if (status.didJustFinish) {
                                    setPlay(false);
                                }
                            }}
                        />
                    ) : (
                        <View className="flex w-72 h-72 mt-4">
                            <WebView
                                allowsInlineMediaPlayback
                                source={{
                                    html: `
                                            <div style="width: 100%; height: 100%; background: #161622">
                                                <iframe src="${item.video}?controls=0&autoplay=1&showinfo=0" frameborder="0" allowfullscreen style="width: 100%; height: 100%;"></iframe>
                                            </div>
                                        `,
                                }}
                            />
                        </View>
                    )}
                </>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className="w-full h-72 mt-3 relative flex justify-center items-center"
                >
                    <Image source={{ uri: item.thumbnail }} className="w-72 h-72 mt-3" resizeMode="cover" />
                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const Trending = ({ posts }: any) => {
    return (
        <FlatList
            data={posts}
            horizontal
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <TrendingItem item={item} />}
            onViewableItemsChanged={() => {}}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
        />
    );
};

export default Trending;
