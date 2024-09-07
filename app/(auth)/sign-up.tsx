import * as React from 'react'
import { useState } from 'react'
import { TextInput, Button, KeyboardAvoidingView, Platform, View, Text, Alert } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import StyledButton from '../../components/StyledButton'
import SignInWithOAuth from '../../components/SignInWithOAuth';

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [pendingVerification, setPendingVerification] = useState(false)
    const [code, setCode] = useState('')

    const onSignUpPress = async () => {
        if (!isLoaded) {
            return
        }

        try {
            await signUp.create({
                emailAddress,
                password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            setPendingVerification(true)
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            Alert.alert('Error:', err.errors[0].message);
        }
    }

    const onPressVerify = async () => {
        if (!isLoaded) {
            return
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            })

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId })
                router.replace('/')
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2))
            }
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            Alert.alert('Error:', 'You entered the wrong code.', err.errors[0].message)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{
                flex: 1,
                backgroundColor: '#3b064b',
                paddingHorizontal: 30,
                justifyContent: 'center',
            }}
        >
            <MaterialIcons
                name="video-chat"
                size={160}
                color="#e7b6f6"
                style={{ alignSelf: 'center', paddingBottom: 20 }}
            />
            {!pendingVerification && (
                <View style={{
                    gap: 10,
                }}>
                    <Text
                        style={{
                            color: '#ac6bc0',
                            textAlign: 'center',
                            marginBottom: 10,
                        }}
                    >
                        Enter your email and password below to get started.
                    </Text>
                    <TextInput
                        autoCapitalize="none"
                        value={emailAddress}
                        placeholder="Email..."
                        onChangeText={(email) => setEmailAddress(email)}
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
                        onChangeText={(password) => setPassword(password)}
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
                    <StyledButton title="Sign Up" onPress={onSignUpPress} />
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
                            Aready have an account?
                        </Text>
                        <Link
                            href="/sign-in"
                            style={{
                                color: '#b79cbf',
                                fontWeight: 'bold',
                                decorator: 'underline',
                                textDecorationLine: 'underline',
                                fontSize: 26,
                            }}
                        >
                            <Text>Sign in</Text>
                        </Link>
                    </View>
                </View>
            )}
            {pendingVerification && (
                <View style={{ gap: 10 }}>
                    <Text
                        style={{
                            color: '#ac6bc0',
                            textAlign: 'center',
                            marginBottom: 10,
                        }}>
                        A Verification code has been sent to your email. Please enter it below.
                    </Text>
                    <TextInput
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
                        value={code}
                        placeholder="Code..."
                        onChangeText={(code) => setCode(code)} />
                    <StyledButton title="Verify Email" onPress={onPressVerify} />
                </View>
            )}
        </KeyboardAvoidingView>
    )
}