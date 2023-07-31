import React from 'react'
import { StyleSheet, Text, View} from 'react-native'

export default function ActivateLocationScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Text>ActivateLocationScreen</Text>
        <Pressable onPress={navigation.navigate('ChooseRole')}>
                <Text>Next page</Text>
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
