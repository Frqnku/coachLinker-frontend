import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import Mailer from 'react-native-mail';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useSelector } from 'react-redux';

export default function VerificationScreen() {

const isDarkMode = useSelector(state => state.darkMode.value)

  return (
    <View style={styles.container}>
      <ConfettiCannon count={400} origin={{x: -10, y: 0}} colors={['orange', '#ffd359', 'cream', '#FF711A']} fallSpeed={4000} explosionSpeed={100} fadeOut={true}/>
        <Text style={[styles.text1, isDarkMode ? styles.darkText1 : styles.lightText1]}>Félicitations</Text>
        <Text style={[styles.text2, isDarkMode ? styles.darkText : styles.lightText]}>Nous procédons à une vérification de vos qualifications</Text>
        <Text style={[styles.text3, isDarkMode ? styles.darkText : styles.lightText]}>Vous recevrez un mail d'ici 5 jours ouvrés</Text>
    </View>
  )
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

background: {
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
},
    
text1: {
  fontWeight: 'bold',
  fontSize: 60,
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
   
darkText: {
  color: '#FFFFFF'
},

lightText: {
  color:  'black'
},

darkText1: {
  color: '#FF711A'
},
lightText1: {
  color: "#FF711A"
},

})
