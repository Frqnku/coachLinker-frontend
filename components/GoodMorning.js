import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import { useSelector } from 'react-redux'

export default function GoodMorning() {
    const username = useSelector(state => state.users.value.name)
    const isDarkMode = useSelector(state => state.darkMode.value)
  
    return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/utilisateur.png')}/>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Good morning {username} !</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 50
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: 'grey'
    },
    darkText: {
        color: '#fff'
    },
    lightText: {
        color: '#000'
    },
})
