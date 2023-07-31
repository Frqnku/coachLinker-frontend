import React from 'react'
import { StyleSheet, Text, View} from 'react-native'

export default function AddInfoCoachScreen() {
  return (
    <View style={styles.container}>
        <Text>AddInfoCoachScreen</Text>
        <Pressable onPress={navigation.navigate('Verification')}>
            <Text>Go to Home</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
