import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TextInput, Pressable, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { backend_address } from '../backendAddress';

export default function BookScreen({ navigation }) {
    const bookedCoach = useSelector(state => state.coachs.value.bookedCoach)
    const [planningCoach, setPlanningCoach] = useState([])

    useEffect(() => {
        fetch(`${backend_address}/plannings`, {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({coachID: bookedCoach})
        })
        .then(response => response.json())
        .then(data => {
            setPlanningCoach(data.data.days)
        })
    }, [])

    console.log(planningCoach)
    const planning = planningCoach.map((day, i )=> {
        <View key={i}>
            <Text>{day}</Text>
            <Text>{day}</Text>
        </View>
    })
    console.log(planning)

  return (
    <View style={styles.container}>
        <Pressable style={styles.btnBack} onPress={() => navigation.navigate('TabNavigator', {screen: 'Menu'})}><Text>Retour</Text></Pressable>
        <Text>BookScreen</Text>
        <Text>{bookedCoach}</Text>
        <Text>{planning}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 15
    },
    btnBack: {
        height: 50,
        width: 100,
        backgroundColor: 'red'
    }
})