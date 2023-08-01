import React from 'react'
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useRef } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useIsFocused } from "@react-navigation/native";

export default function AddInfoCoachScreen({ navigation }) {

  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  let cameraRef = useRef(null);

  const [coachLastname, setCoachLastname] = useState('')
  const [coachFirstname, setCoachFirstname] = useState('')
  const [coachBirthDate, setCoachBirthDate] = useState('')
  const [coachAbout, setCoachAbout] = useState('')
  const [siretNumber, setSiretNumber] = useState('')
  const [ibanNumber, setIbanNumber] = useState('')
  const [bicNumber, setBicNumber] = useState('')

  const requestCameraPermission = async () => { 
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const takePicture = async () => {
      const photo = await cameraRef.takePictureAsync({ quality: 0.3 });}
      
  const handleSubmit = () => {

    navigation.navigate('Verification')
  }  

  if (!hasPermission || !isFocused) {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text>AddInfoCoachScreen</Text>

        <Pressable style={styles.arrow}>
          <FontAwesome name="arrow-circle-left" size={25} color='#000'></FontAwesome>
        </Pressable>

        <View style={styles.inputView}>
          <TextInput style={styles.input} onChangeText={(value) => setCoachLastname(value)} value={coachLastname} placeholder='Nom'></TextInput>
          <TextInput style={styles.input} onChangeText={(value) => setCoachFirstname(value)} value={coachFirstname} placeholder='Prénom'></TextInput>
          <TextInput style={styles.input} onChangeText={(value) => setCoachBirthDate(value)} value={coachBirthDate} placeholder='Date de naissance'></TextInput>
          <Text>Sports enseignés</Text>
        </View>

        <TextInput style={styles.input} placeholder='Recherchez'></TextInput>

        <View style={styles.inputMiniContainer}>
          <TextInput style={styles.inputMini}></TextInput>
          <TextInput style={styles.inputMini}></TextInput>
          <TextInput style={styles.inputMini}></TextInput>
        </View>

        <Text>A propos de moi</Text>
        <TextInput style={styles.aPropos} onChangeText={(value) => setCoachAbout(value)} value={coachAbout}></TextInput>

        <View style={styles.btns}>
          <Pressable style={styles.btnPhoto} onPress={() => requestCameraPermission()} >
            <Text>Photo</Text>
          </Pressable>
          <Pressable style={styles.btnDoc}>
            <Text>Doc</Text>
          </Pressable>
        </View>

          <Text>Insérez vos données</Text>
          <TextInput style={styles.input} onChangeText={(value) => setSiretNumber(value)} value={siretNumber} placeholder='Numéro de Siret'></TextInput>
          <TextInput style={styles.input} placeholder='Insérez votre carte Pro'></TextInput>
          <TextInput style={styles.input} placeholder='Vos diplômes'></TextInput>
          <Text>Information de paiements</Text>
          <TextInput style={styles.input} onChangeText={(value) => setIbanNumber(value)} value={ibanNumber} placeholder='IBAN'></TextInput>
          <TextInput style={styles.input} onChangeText={(value) => setBicNumber(value)} value={bicNumber}placeholder='BIC'></TextInput>

          <Pressable style={styles.btnSend}>
            <Text>Envoyez un document</Text>
          </Pressable>

        <Pressable style={styles.btnValidate} onPress={handleSubmit}>
            <Text>Valider</Text>
        </Pressable>

    </ScrollView>
  )
}

return (
  <Camera type={type} flashMode={flashMode} ref={(ref) => cameraRef = ref} style={styles.camera}>
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
        style={styles.button}
      >
        <FontAwesome name='rotate-right' size={25} color='#ffffff' />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)}
        style={styles.button}
      >
        <FontAwesome name='flash' size={25} color={flashMode === FlashMode.off ? '#ffffff' : '#e8be4b'} />
      </TouchableOpacity>
    </View>

    <View style={styles.snapContainer}>
      <TouchableOpacity onPress={() => cameraRef && takePicture()}>
        <FontAwesome name='circle-thin' size={95} color='#ffffff' />
      </TouchableOpacity>
    </View>
  </Camera>
);
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 40
    },
    input: {
      height: 50,
      width: 300,
      borderBlockColor: 'grey',
      borderWidth: 1,
      margin: 10,
      padding: 10
    },
    inputView: {
      justifyContent: 'flex-start',
    },
    inputMini: {
      height: 50,
      width: 80,
      borderBlockColor: 'grey',
      borderWidth: 1,
      margin: 10,
      padding: 10
    },
    inputMiniContainer: {
      flexDirection: 'row'
    },
    aPropos: {
      height: 200,
      width: 300,
      borderBlockColor: 'grey',
      borderWidth: 1,
      margin: 10
    },
    btns:{
      flexDirection: 'row',
    },
    btnPhoto: {
      height: 60,
      width: 100,
      backgroundColor: "#F4A100",
      margin: 10
    },
    btnDoc: {
      height: 60,
      width: 100,
      backgroundColor: "#F4A100",
      margin: 10
    },
    btnValidate: {
      height: 50,
      width: 300,
      backgroundColor: '#F4A100',
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnSend: {
      height: 50,
      width: 300,
      backgroundColor: '#F4A100',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10
    },
    camera: {
      flex: 1
    },
    buttonsContainer: {
      flex: 0.1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
    },
    snapContainer: {
      flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 25,
    }
    
})
