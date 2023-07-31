import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable} from 'react-native'
import { useDispatch } from 'react-redux';
import { updateCurrentLocation, statusChange } from '../reducers/users';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';

export default function ActivateLocationScreen({ navigation }) {

  const user = useSelector((state) => state.users.value)
  const dispatch = useDispatch()
  // const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude:0 })
  // const [isLocationOn, setIsLocationOn] = useState(null)

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();

//   if (status === 'granted') {
//     Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
//       setCurrentLocation(location.coords);
//     });
//   }
// })();
//   }, []);

  const handleLocationOn =  async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if(status === 'granted') {
      Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
        console.log(location.coords)
            dispatch(updateCurrentLocation(location.coords));
            dispatch(statusChange())
            navigation.navigate('ChooseRole')
      })
    }
  }

  const handleLocationOff = () => {
    
  }

  return (
    <View style={styles.container}>
        <Text>ActivateLocationScreen</Text>
        <Pressable onPress={() => navigation.navigate('ChooseRole')}>
                <Text>Next page</Text>
        </Pressable>

        <Pressable style={styles.btnLocationOn} onPress={handleLocationOn}>
          <Text>Oui</Text>
        </Pressable>

        <Pressable style={styles.btnLocationOff} onPress={handleLocationOff}>
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
