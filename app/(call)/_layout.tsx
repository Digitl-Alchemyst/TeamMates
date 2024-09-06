import { View, Text } from 'react-native'
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CallRoutesLayout() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tabs screenOptions={{
                header: () => null,
            }}>

            </Tabs >
        </SafeAreaView>
    )
}