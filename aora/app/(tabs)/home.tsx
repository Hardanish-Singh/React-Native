import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

const Home: React.FC = (): JSX.Element => {
    const { user } = useGlobalContext();
    const { data: posts, refetch: refetchAllPosts } = useAppwrite(getAllPosts);
    const { data: latestPosts, refetch: refetchLatestPosts } = useAppwrite(getLatestPosts);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetchAllPosts();
        await refetchLatestPosts();
        setRefreshing(false);
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item: any) => item.$id}
                renderItem={({ item }) => <VideoCard video={item} />}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-4">
                        <View className="flex justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">Welcome back, </Text>
                                <Text className="text-2xl font-psemibold text-white">{user?.username}</Text>
                            </View>
                            <View className="mt-1.5">
                                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
                            </View>
                        </View>
                        <SearchInput />
                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-lg font-pregular text-gray-100 mb-3">Latest Videos</Text>
                            <Trending posts={latestPosts ?? []} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => <EmptyState title="No Videos Found" subtitle="No videos created yet" />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};

export default Home;
