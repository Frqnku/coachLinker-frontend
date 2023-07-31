import React from 'react'
import { StyleSheet, Text, View} from 'react-native'

export default function CoachingStudent() {
  return (
    <View style={styles.container}>
        <Text>CoachingStudent</Text>
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