import { router, usePathname } from "expo-router";
import { useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

type SearchInputProps = {
    initialQuery?: string;
    refetch?: () => void; // A function to refresh the current route with new query parameters.
};

const SearchInput: React.FC<SearchInputProps> = ({ initialQuery }: SearchInputProps) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || "");

    const handleSubmit = () => {
        if (query === "") {
            return Alert.alert("Missing Query", "Please input something to search results across database");
        }
        if (pathname.startsWith("/search")) {
            // Update the current route query params.
            router.setParams({ query });
        } else {
            // Navigate to the provided href using a push operation if possible.
            router.push(`/search/${query}`);
        }
    };

    return (
        <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={query}
                placeholder="Search a video topic"
                placeholderTextColor="#CDCDE0"
                onChangeText={(e) => setQuery(e)}
                onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity onPress={handleSubmit}>
                <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;
