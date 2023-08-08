import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import Mailer from 'react-native-mail';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function VerificationScreen() {

  return (
    <View style={styles.container}>
      <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
        <Text style={styles.text1}>Félicitations</Text>
        <Text style={styles.text2}>Nous procédons à une vérification de vos qualifications</Text>
        <Text style={styles.text3}>Vous recevrez un mail d'ici 5 jours ouvrés</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text1: {
      fontWeight: 'bold',
      fontSize: 70,
      marginBottom: 50,
      marginTop: 200
    },
    text2: {
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'center',
      flex: 1,
    },
    text3: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 50
    },
    text4: {
      justifyContent:'center',
      alignItems: 'center',
      marginBottom: 70
    },
    text4a: {
      fontSize: 20,
      color: 'blue'
    },
    text4b: {
      fontSize: 20,
      color: 'blue'
    }

})
