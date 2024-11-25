import {Pressable, Text, View} from "react-native";
import {Link, Redirect, useRootNavigationState} from "expo-router";
import {useUser} from "@clerk/clerk-expo";

export default function Index() {

  const {user} = useUser();
  //const rootnavigationState = useRootNavigationState();

  return user && (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        {user?
            <Redirect href={'/home'}/>
            : <Redirect href={'/login/index'}/>
        }
      <Text style={{
          fontSize: 40,
          fontFamily: "outfit-bold",
      }}>Pet App :: Initial  Testing</Text>

        <Link href={'/login'}>
            <Text style={{}}>
                Go to LogIn Screen
            </Text>
        </Link>
    </View>
  );
}
