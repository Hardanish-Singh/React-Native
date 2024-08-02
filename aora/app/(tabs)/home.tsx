import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import { StatusBar } from "expo-status-bar";
import { images } from "../../constants";

export default function Home() {
    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item }) => <Text className="text-3xl text-white">{item.id}</Text>}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-4">
                        <View className="flex justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                                <Text className="text-2xl font-psemibold text-white">JSMastery</Text>
                            </View>
                            <View className="mt-1.5">
                                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
                            </View>
                        </View>

                        <SearchInput />

                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-lg font-pregular text-gray-100 mb-3">Latest Videos</Text>
                            <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => <EmptyState title="No Videos Found" subtitle="No videos created yet" />}
            />
            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
}
