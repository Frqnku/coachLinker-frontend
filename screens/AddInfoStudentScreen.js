import React from 'react'
import { StyleSheet, Text, View, Pressable} from 'react-native'
import GoodMorning from '../components/GoodMorning';

export default function AddInfoStudentScreen({navigation}) {

  const handleSubmit = () => {

navigation.navigate('TabNavigator')
  }

  return (
    <View style={styles.container}>
        <GoodMorning/>
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
    },
    darkBg: {
      backgroundColor: '#000'
    },
    darkText: {
        color: '#fff'
    },
    darkCard: {
        backgroundColor: '#2E2E2E'
    },
    lightBg: {
        backgroundColor: '#f2f2f2'
    },
    lightCard: {
        backgroundColor: '#fff'
    },
    lightText: {
        color: '#000'
    },
})