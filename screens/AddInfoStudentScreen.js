import React from 'react'
import { StyleSheet, Text, View, Pressable} from 'react-native'

export default function AddInfoStudentScreen({navigation}) {
  return (
    <View style={styles.container}>
        <Text>AddInfoStudentScreen</Text>
        <Pressable onPress={navigation.navigate('TabNavigator')}>
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