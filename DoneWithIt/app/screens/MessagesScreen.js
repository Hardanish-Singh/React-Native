import React, { useState } from "react";
import { FlatList } from "react-native";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import Screen from "../components/Screen";

const initialMessages = [
        {
                id: 1,
                title: "T1",
                description: "D1",
                image: require("../assets/mosh.jpg"),
        },
        {
                id: 2,
                title: "T2",
                description: "D2",
                image: require("../assets/mosh.jpg"),
        },
];

export default function MessagesScreen(props) {
        const [messages, setMessages] = useState(initialMessages);
        const [refreshing, setRefresing] = useState(false);

        const handleDelete = (item) => {
                const newMessages = messages.filter((m) => m.id !== item.id);
                setMessages(newMessages);
        };
        return (
                <Screen>
                        <FlatList
                                data={messages}
                                keyExtractor={(message) => message.id}
                                renderItem={({ item }) => (
                                        <ListItem
                                                title={item.title}
                                                subTitle={item.description}
                                                image={item.image}
                                                onPress={() => console.log("Message Selected", item)}
                                                renderRightActions={() => (
                                                        <ListItemDeleteAction onPress={() => handleDelete(item)} />
                                                )}
                                        />
                                )}
                                ItemSeparatorComponent={ListItemSeparator}
                                refreshing={refreshing}
                                onRefresh={() => {
                                        setMessages([
                                                {
                                                        id: 2,
                                                        title: "T2",
                                                        description: "D2",
                                                        image: require("../assets/mosh.jpg"),
                                                },
                                        ]);
                                }}
                        />
                </Screen>
        );
}
