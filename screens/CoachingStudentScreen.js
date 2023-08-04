import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import GoodMorning from '../components/GoodMorning';

export default function CoachingStudentScreen() {

  return (
    <View style={styles.container}>
      <GoodMorning/>
        <Text>CoachingStudentScreen</Text>
        {/* afficher les coaching à venir et coaching passés */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15
  }
})