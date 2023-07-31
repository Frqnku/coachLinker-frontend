import React from 'react'
import { StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentLocation, updateStatus } from '../reducers/users';
import * as Location from 'expo-location';

export default function ActivateLocationScreen({ navigation }) {
  const dispatch = useDispatch()
  const isDarkMode = useSelector(state => state.darkMode.value)

  const acceptPermission =  async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if(status === 'granted') {
      Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
            dispatch(updateCurrentLocation({latitude: location.coords.latitude, longitude: location.coords.longitude}));
            navigation.navigate('ChooseRole')
      })
    } else {
      dispatch(updateStatus(false))
      navigation.navigate('ChooseRole')
    }
  }

  const denyPermission = () => {
    dispatch(updateStatus(false))
    navigation.navigate('ChooseRole')
  }

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}>
      <View style={[styles.cards, isDarkMode ? styles.darkCard : styles.lightCard]}>
        <View style={styles.top}>
            <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Activer la localisation ?</Text>
          </View>
          
          <View style={styles.bottom}>
            <Pressable style={styles.btnLocation} onPress={acceptPermission}>
              <Text style={[styles.text, styles.darkText]}>Oui, j'active la localisation</Text>
            </Pressable>

            <Pressable style={styles.btnLocation} onPress={denyPermission}>
              <Text style={[styles.text, styles.darkText]}>Non, je choisirai plus tard</Text>
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
