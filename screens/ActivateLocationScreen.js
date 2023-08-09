import React, { useEffect } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentLocation, updateSearchLocation } from '../reducers/users';
import * as Location from 'expo-location';

export default function ActivateLocationScreen({ navigation }) {
  const dispatch = useDispatch()
  const isDarkMode = useSelector(state => state.darkMode.value)

useEffect(() => {
  async function requestLocalisationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if(status === 'granted') {
      Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          dispatch(updateCurrentLocation({latitude: location.coords.latitude, longitude: location.coords.longitude}));
          dispatch(updateSearchLocation({name: 'Autour de moi', latitude: location.coords.latitude, longitude: location.coords.longitude}));
          navigation.navigate('ChooseRole')
      })
    } else {
      navigation.navigate('ChooseRole')
    }
  }
  requestLocalisationPermission()

}, [])
  

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}>
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

})