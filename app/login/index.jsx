import { Pressable, Text, View, Image } from "react-native";
import Colors from "../../constants/Colors";
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import * as Linking from 'expo-linking'
import {useOAuth} from "@clerk/clerk-expo";
import {useCallback} from "react";

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        // Warm up the android browser to improve UX
        // https://docs.expo.dev/guides/authentication/#improving-user-experience
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])
}

WebBrowser.maybeCompleteAuthSession();


export default function LoginScreen() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

    const onPress = useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
            })

            if (createdSessionId) {

            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error('OAuth error', err)
        }
    }, []);

    return (
        <View style={{
            backgroundColor: Colors.WHITE,
            height: '100%',
        }}>
            <Image
                source={require('./../../assets/images/adopt-me.png')}
                style={{
                    width:'100%',
                    height:500,
                }}
            />
            <View style={{
                padding: 20,
                display: 'flex',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontFamily: "outfit-bold",
                    fontSize: 30,
                    textAlign: "center"
                }}>
                    Ready to make a new Friend?
                </Text>
                <Text style={{
                    fontFamily: "outfit",
                    fontSize: 18,
                    textAlign: "center",
                    color:Colors.GRAY,
                }}>
                    Let's adopt the pet which you like !!
                </Text>
                <Pressable
                    onPress={onPress}
                    style={
                    { padding: 14, marginTop: 100, backgroundColor: Colors.PRIMARY, width: '100%', borderRadius: 14 }}
                >
                    <Text style={{fontFamily: 'outfit-medium', fontSize: 20, textAlign: 'center'}}>
                        Get Started
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
