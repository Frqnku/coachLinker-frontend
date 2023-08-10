import React from 'react'
import { StyleSheet, Text, Pressable, SafeAreaView} from 'react-native'
import { useSelector } from 'react-redux';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function CongratsScreen({ navigation }) {
  const isDarkMode = useSelector(state => state.darkMode.value)

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}>
      <ConfettiCannon count={400} origin={{x: -10, y: 0}} colors={['orange', '#ffd359', 'cream', '#FF711A']} fallSpeed={4000} explosionSpeed={100}/>
        <Text style={[styles.text, styles.congrats]}>Félicitations</Text>
        <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>Votre séance a été reservée avec succès !</Text>
        <Pressable onPress={() => navigation.navigate('TabNavigator', {screen: 'Agenda'})} style={styles.btnBack}><Text style={[styles.text, styles.darkText]}>Revenir au menu</Text></Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      },
    btnBack: {
      width: '80%',
      marginVertical: 25,
      padding: 15,
      backgroundColor: '#FF711A',
      borderRadius: 5,
      alignItems: 'center'
      },
    congrats: {
      fontSize: 30,
      fontWeight: 500,
      color: '#FF711A',
      marginBottom: 10
      },
    text: {
      fontSize: 16
      },
    darkBg: {
      backgroundColor: '#000'
      },
    lightBg: {
      backgroundColor: '#fff'
      },
    darkText: {
      color: '#fff'
      },
    lightText: {
      color: '#000'
    },
})