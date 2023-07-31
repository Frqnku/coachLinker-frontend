import React from 'react'
import { StyleSheet, Text, View, Pressable} from 'react-native'

export default function AddInfoStudentScreen({navigation}) {
  
  const handleSubmit = () => {

    navigation.navigate('TabNavigator')
  }

  return (
    <View style={styles.container}>
        <Text>AddInfoStudentScreen</Text>
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