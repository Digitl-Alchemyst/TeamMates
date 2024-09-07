import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Text, TextInput, View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import StyledButton from '../../components/StyledButton';
import SignInWithOAuth from '../../components/SignInWithOAuth';

export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/');
            } else {
                // See https://clerk.com/docs/custom-flows/error-handling
                // for more info on error handling
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err: any) {
            Alert.alert(
                { Error: { err } },
                'You entered an invalid email or password. Please try again.'
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, emailAddress, password]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{
                flex: 1,
                backgroundColor: '#3b064b',
                paddingHorizontal: 30,
                justifyContent: 'center',

                gap: 10,
            }}
        >
            <MaterialIcons
                name="video-chat"
                size={160}
                color="#e7b6f6"
                style={{ alignSelf: 'center', paddingBottom: 20 }}
            />

            <TextInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                onChangeText={emailAddress => setEmailAddress(emailAddress)}
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#e7b6f6',
                    borderRadius: 5,

                    color: '#2b1b30',
                    backgroundColor: '#f7e7fc',
                    fontSize: 16,
                    width: '100%',
                }}
            />
            <TextInput
                value={password}
                placeholder="Password..."
                secureTextEntry={true}
                onChangeText={password => setPassword(password)}
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#e7b6f6',
                    borderRadius: 5,
                    color: '#2b1b30',
                    backgroundColor: '#f7e7fc',
                    fontSize: 16,
                    width: '100%',
                }}
            />
            <View
                style={{
                    borderBottomColor: '#815090',
                    borderBottomWidth: 1,
                    marginVertical: 10,
                }}
            />
            <StyledButton
                title="Sign In"
                onPress={onSignInPress}
            />
            <Text style={{ color: '#e7b6f6', textAlign: 'center' }}>
                OR
            </Text>
            <SignInWithOAuth />
            <View
                style={{
                    borderBottomColor: '#815090',
                    borderBottomWidth: 1,
                    marginVertical: 10,
                }}
            />

            <View style={{
                alignItems: 'center',

            }}>
                <Text
                    style={{
                        color: '#ac6bc0',
                    }}
                >
                    Don't have an account?
                </Text>
                <Link
                    href="/sign-up"
                    style={{
                        color: '#b79cbf',
                        fontWeight: 'bold',
                        decorator: 'underline',
                        textDecorationLine: 'underline',
                        fontSize: 26,
                    }}
                >
                    <Text>Sign up</Text>
                </Link>
            </View>
        </KeyboardAvoidingView>
    );
}
