import { FlatList, Text } from "react-native";

type TrendingProps = {
    posts: Array<Record<any, any>>;
};

const Trending = ({ posts }: TrendingProps) => {
    return (
        <FlatList
            data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => <Text className="text-3xl text-white">{item.id}</Text>}
            horizontal
        />
    );
};

export default Trending;
