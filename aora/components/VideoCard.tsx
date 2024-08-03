import { Text, View } from "react-native";

const VideoCard = ({ video }: any) => {
    return (
        <View className="flex flex-col items-center px-4 mb-14">
            <Text className="text-3xl text-white">{video?.title}</Text>
        </View>
    );
};

export default VideoCard;
