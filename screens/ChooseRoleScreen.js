import React from 'react'
import { StyleSheet, Text, View, Pressable} from 'react-native'

export default function ChooseRoleScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Text>ChooseRoleScreen</Text>
        <Pressable onPress={() => navigation.navigate('AddInfoStudent')}>
          <Text>Je recherche un coach</Text>
        </Pressable >
        <Pressable onPress={() => navigation.navigate('AddInfoCoach')}>
          <Text>Je suis coach</Text>
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
