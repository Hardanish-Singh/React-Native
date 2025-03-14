module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo", "module:@react-native/babel-preset"],
        plugins: [
            "nativewind/babel",
            [
                "module:react-native-dotenv",
                {
                    moduleName: "@env",
                    path: ".env",
                },
            ],
        ],
    };
};
