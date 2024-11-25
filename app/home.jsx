import {Pressable, Text, View} from "react-native";
import {Link} from "expo-router";

export default function Home() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{
                fontSize: 40,
                fontFamily: "outfit-bold",
            }}>Pet App :: Home</Text>

        </View>
    );
}
