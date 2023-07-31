import React from 'react'
import { StyleSheet, Text, View, Pressable} from 'react-native'

export default function AddInfoCoachScreen() {

  const handleSubmit = () => {

    navigation.navigate('Verification')
  }

  return (
    <View style={styles.container}>
        <Text>AddInfoCoachScreen</Text>
        <Pressable onPress={handleSubmit}>
            <Text>Valider</Text>
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
