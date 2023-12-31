import React from 'react'
import { StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../reducers/users';

export default function ChooseRoleScreen({ navigation }) {
  const dispatch = useDispatch()
  const isDarkMode = useSelector(state => state.darkMode.value)

  // fonction à créer : si je clique sur Je suis coach, je passe dans User : isCoach à true.
  const chooseCoach = () => {
    dispatch(signUp({isCoach: true}))
    navigation.navigate('AddInfoCoach')
  }

  const chooseStudent = () => {
    dispatch(signUp({isCoach: false}))
    navigation.navigate('AddInfoStudent')
  }

  return (
        <SafeAreaView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}>
        <View style={[styles.cards, isDarkMode ? styles.darkCard : styles.lightCard]}>
          <View style={styles.top}>
              <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Pourquoi venir ici ?</Text>
            </View>
            
            <View style={styles.bottom}>
              <Pressable style={[ isDarkMode ? styles.darkbutton : styles.lightbutton]} onPress={chooseStudent}>
                <Text style={[styles.text, styles.darkText]}>Je recherche un coach</Text>
              </Pressable>
  
              <Pressable style={[ isDarkMode ? styles.darkbutton : styles.lightbutton]} onPress={chooseCoach}>
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
    cards: {
      width: '80%',
      paddingVertical: 25,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 5,
      elevation: 15,
      shadowColor: '#FF6100',
      shadowOffset: { width: 50, height: 15 },
      shadowOpacity: 0.0001,
    },
    text: {
      fontSize: 16,
      fontWeight: 500
    },
    title: {
      fontSize: 20,
      fontWeight: 600
    },
    // darkmode
    darkBg: {
      backgroundColor: '#000'
    },
    lightBg: {
      backgroundColor: '#f2f2f2'
    },
    darkbutton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
      height: 40,
      backgroundColor: '#BF5000',
      borderRadius: 25,
      marginTop: 10,
      elevation: 15,
      shadowColor: '#FF6100',
      shadowOffset: { width: 50, height: 5 },
      shadowOpacity: 0.0001,
    },
    lightbutton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
      height: 40,
      backgroundColor: '#FF711A',
      borderRadius: 25,
      marginTop: 10,
      elevation: 15,
      shadowColor: '#FF6100',
      shadowOffset: { width: 50, height: 5 },
      shadowOpacity: 0.0001,
    },
    darkCard: {
      backgroundColor: '#2E2E2E'
    },
    lightCard: {
      backgroundColor: '#fff'
    },
    darkText: {
        color: '#fff'
    },
    lightText: {
        color: '#000'
    },
})

