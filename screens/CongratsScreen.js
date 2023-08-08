import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

export default function CongratsScreen({ navigation }) {
  const isDarkMode = useSelector(state => state.darkMode.value)

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}>
        <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>CONGRATS</Text>
        <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>Conffetis et tout</Text>
        <Pressable onPress={() => navigation.navigate('TabNavigator', {screen: 'Agenda'})}><Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>Revenir au menu</Text></Pressable>
    </SafeAreaView>
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
    lightBg: {
        backgroundColor: '#f2f2f2'
    },
    darkText: {
        color: '#fff'
    },
    lightText: {
        color: '#000'
    }

})