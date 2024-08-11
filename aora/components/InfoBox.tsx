import { Text, View } from "react-native";

type InfoBoxProps = {
    title?: any;
    subtitle?: string;
    containerStyles?: string;
    titleStyles?: string;
};

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }: InfoBoxProps) => {
    return (
        <View className={containerStyles}>
            <Text className={`text-white text-center font-psemibold ${titleStyles}`}>{title}</Text>
            <Text className="text-sm text-gray-100 text-center font-pregular">{subtitle}</Text>
        </View>
    );
};

export default InfoBox;
