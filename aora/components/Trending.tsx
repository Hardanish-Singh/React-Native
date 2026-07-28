import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import { icons } from "../constants";

const TrendingItem: React.FC<any> = ({ item }: any) => {
    const player = useVideoPlayer(item.video, (player) => {
        player.loop = true;
    });
    const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });
    const [isVideoPlaying, setIsVideoPlaying] = useState(isPlaying);

    return (
        <View className="mr-5">
            {isVideoPlaying ? (
                <>
                    {item.video.includes("/storage/buckets") ? (
                        <VideoView
                            className="flex w-72 h-72 mt-4"
                            player={player}
                            allowsFullscreen
                            allowsPictureInPicture
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
                    onPress={() => {
                        if (isPlaying) {
                            player.pause();
                        } else {
                            player.play();
                        }
                        setIsVideoPlaying(true);
                    }}
                    className="w-full h-72 mt-3 relative flex justify-center items-center"
                >
                    <Image source={{ uri: item.thumbnail }} className="w-72 h-72 mt-3" resizeMode="cover" />
                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const Trending: React.FC<any> = ({ posts }: any) => (
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

export default Trending;
