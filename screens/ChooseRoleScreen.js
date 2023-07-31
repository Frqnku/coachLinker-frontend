import React from 'react'
import { StyleSheet, Text, View} from 'react-native'

export default function ChooseRoleScreen() {
  return (
    <View style={styles.container}>
        <Text>ChooseRoleScreen</Text>
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
