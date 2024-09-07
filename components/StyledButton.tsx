import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function StyledButton({ title, onPress, style }: { title: string; onPress: () => void; style?: any; }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: '#efcff9',
                padding: 10,
                borderRadius: 5,
                width: '100%',
                ...style,
            }}>
            <Text style={{
                color: '#792a91',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
            }}>{title}</Text>




        </TouchableOpacity>
    )
}