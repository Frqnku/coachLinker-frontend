import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import Mailer from 'react-native-mail';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function VerificationScreen() {

  const handleSendEmail = () => {
    Mailer.mail(
      {
        subject: 'Sujet de l\'e-mail',
        recipients: ['recipient1@example.com', 'recipient2@example.com'],
        body: 'Contenu de l\'e-mail',
        isHTML: true, // Définissez-le sur true si vous souhaitez utiliser du contenu HTML
      },
      (error, event) => {
        if (error) {
          console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        } else {
          console.log('E-mail envoyé avec succès!', event);
        }
      },
    )
  }
  return (
    <View style={styles.container}>
      <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
        <Text style={styles.text1}>Félicitations</Text>
        <Text style={styles.text2}>Nous procédons à une vérification de vos qualifications</Text>
        <Text style={styles.text3}>Vous recevrez un mail d'ici 5 jours ouvrés</Text>
        <View style={styles.text4} onPress={handleSendEmail}>
          <Text style={styles.text4a}>Vous n'avez pas reçu de mail?</Text>
          <Text style={styles.text4b}>Renvoyer</Text>
        </View>
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
