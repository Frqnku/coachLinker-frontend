import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import { useSelector } from 'react-redux'

export default function GoodMorning() {
    const user = useSelector(state => state.users.value.signUp)
    const isDarkMode = useSelector(state => state.darkMode.value)
    console.log(user.image)
  
    return (
    <View style={styles.container}>
        <Image style={styles.image} source={{uri: user.image}}/>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Good morning {user.firstname} !</Text>
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
