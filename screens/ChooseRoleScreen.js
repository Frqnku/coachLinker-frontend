import React from 'react'
import { StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native'
import { useSelector } from 'react-redux';

export default function ChooseRoleScreen({ navigation }) {
  const isDarkMode = useSelector(state => state.darkMode.value)

  // fonction à créer : si je clique sur Je suis coach, je passe dans User : isCoach à true.

  return (
        <SafeAreaView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}>
        <View style={[styles.cards, isDarkMode ? styles.darkCard : styles.lightCard]}>
          <View style={styles.top}>
              <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Pourquoi venir ici ?</Text>
            </View>
            
            <View style={styles.bottom}>
              <Pressable style={styles.btnLocation} onPress={() => navigation.navigate('AddInfoStudent')}>
                <Text style={[styles.text, styles.darkText]}>Je recherche un coach</Text>
              </Pressable>
  
              <Pressable style={styles.btnLocation} onPress={() => navigation.navigate('AddInfoCoach')}>
                <Text style={[styles.text, styles.darkText]}>Je suis coach</Text>
              </Pressable>
            </View>
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cards: {
      width: '80%',
      paddingVertical: 25,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 5
    },
    bottom: {
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: 200,
      marginTop: 15
    },
    btnLocation: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      height: 70,
      backgroundColor: '#F4A100',
      borderRadius: 5
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
    text: {
        fontSize: 16,
        fontWeight: 500
    },
    title: {
        fontSize: 20,
        fontWeight: 600
    },
})

