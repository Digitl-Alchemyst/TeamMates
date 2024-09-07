
import { Tabs, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '@clerk/clerk-expo'

export default function CallRoutesLayout() {
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
        return <Redirect href={"/(auth)/sign-in"} />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tabs screenOptions={(route) => ({

                header: () => null,
                tabBarStyle: {
                    backgroundColor: '#2c0538',
                    display: route.name === '[id]' ? 'none' : 'flex',
                },
                tabBarActiveTintColor: '#ac5dc4',
                tabBarInactiveTintColor: '#d5aee1',

                
                tabBarLabelStyle: {
                    zIndex: 100,
                    padding: 5,
                },
            })}>
                <Tabs.Screen name="index" options={{
                    title: 'Calls',
                    tabBarLabel: 'Calls',
                    tabBarIcon: ({ color }) => (
                        <IonIcons name="call-outline" size={24} color={color} />
                    )
                }} />
                <Tabs.Screen name="join" options={{
                    title: 'Join Call',
                    tabBarLabel: 'Join Call',
                    headerTitle: 'Enter Assembly ID',
                    tabBarIcon: ({ color }) => (
                        <IonIcons name="enter-outline" size={24} color={color} />
                    )
                }} />
            </Tabs >
        </SafeAreaView>
    )
}