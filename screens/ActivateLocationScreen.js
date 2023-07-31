import React from 'react'
import { StyleSheet, Text, View, Pressable} from 'react-native'
import { useDispatch } from 'react-redux';
import { updateCurrentLocation, updateStatus } from '../reducers/users';
import * as Location from 'expo-location';

export default function ActivateLocationScreen({ navigation }) {
  const dispatch = useDispatch()

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
    <View style={styles.container}>
        <Text>ActivateLocationScreen</Text>
        <Pressable onPress={() => navigation.navigate('ChooseRole')}>
                <Text>Next page</Text>
        </Pressable>

        <Pressable style={styles.btnLocationOn} onPress={acceptPermission}>
          <Text>Oui</Text>
        </Pressable>

        <Pressable style={styles.btnLocationOff} onPress={denyPermission}>
          <Text>Non</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLocationOn: {
      height: 50,
      width: 100,
      backgroundColor: 'orange',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnLocationOff: {
      height: 50,
      width: 100,
      backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'center'
    },
    selectedBtn: {
      backgroundColor: 'green'
    }

})
