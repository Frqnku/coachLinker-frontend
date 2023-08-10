import React from 'react'
import { StyleSheet, KeyboardAvoidingView, Text, View, ScrollView, TouchableOpacity, Image} from 'react-native'
import { useState, useRef, useEffect } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector,useDispatch } from 'react-redux';
import { signUp, addPhoto } from '../reducers/users'
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

import { backend_address } from '../backendAddress';


export default function CoachProfileScreen() {
  const user = useSelector(state => state.users.value.signUp)
  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const isDarkMode = useSelector(state => state.darkMode.value)
  const coach = useSelector((state) => state.coachs.value); 
  const token = useSelector(state => state.users.value.token)
  const profilCoach = useSelector(state => state.users.value.signUp)
  
  // les useStates
  // const camera : 
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  // camera tel
  let cameraRef = useRef(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const formData = new FormData();

        formData.append('photoFromFront',{
          uri: result.assets[0].uri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });
       
        fetch(`${backend_address}/upload`, {
          method: 'POST',
          body: formData,
        }).then((response) => response.json())
          .then((data) => { 
            if (data.result) {
              dispatch(signUp({image: data.url}))
              dispatch(addPhoto(data.url));
              setHasPermission(false);
            } 
          })
      }
    };

const requestCameraPermission = async () => { 
  const { status } = await Camera.requestCameraPermissionsAsync();
  setHasPermission(status === 'granted');
};

const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    const formData = new FormData();

formData.append('photoFromFront',{
  uri: photo.uri,
  name: 'photo.jpg',
  type: 'image/jpeg',
});

fetch(`${backend_address}/upload`, {
  method: 'POST',
  body: formData,
}).then((response) => response.json())
  .then((data) => { 
    if (data.result) {
      dispatch(signUp({image: data.url}))
      dispatch(addPhoto(data.url));
      setHasPermission(false);
    } 
  })
}

const DARK_COLORS = ["black", "#FF6100"];
const LIGHT_COLORS = ["#FFF8EB", "#FF6100"];
const DarkStart = {x : 0.4, y : 0.4};
const DarkEnd = {x : -0.3, y : -0.3};
const LightStart = {x : 0.6, y : 0.4};
const LightEnd = {x : 0.3, y : 0.1};

useEffect(() => {
  fetch(`${backend_address}/coachs/profil`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({token: token})
  })
    .then(response => response.json())
    .then(data => {
        console.log('profilcoach', data)
        
      dispatch(signUp({token:token, 
        name: data.data.name,
        firstname: data.data.firstname,
        myDescription:data.data.myDescription,
        dateOfBirth:data.data.dateOfBirth,
        image: data.data.image,
        teachedSport: data.data.teachedSport,
        proCard : data.data.proCard,
        siret : data.data.siret, 
        iban : data.data.iban,
        bic : data.data.bic, 
        price : data.data.price,
        city : data.data.city,
        coachingPlaces : data.data.coachingPlaces,
       }))
    });
}, []);


if (!hasPermission || !isFocused) {

  return (
    <KeyboardAvoidingView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient
        colors={isDarkMode ? DARK_COLORS : LIGHT_COLORS}
        start={isDarkMode ? DarkStart : LightStart}
        end={isDarkMode ? DarkEnd : LightEnd}
        style={styles.background}
        >
       <View style={styles.picture}>
                  <Image style={[styles.image, isDarkMode ? styles.darkPicture : styles.lightPicture]}  source={{uri: user.image}} />
                  <TouchableOpacity onPress={() => requestCameraPermission() && pickImage()} >
                  <Image  style={styles.crayon} source={require('../assets/crayon.png')} />
                  </TouchableOpacity>
                  <Text style={[ isDarkMode ? styles.darksignin : styles.lightsignin]}>       Good morning {profilCoach.firstname}!</Text>
          </View>
    
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>  
 
      <View style={styles.inputView}>

        <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText,{color:isDarkMode ? "#FF711A":"black"}]}>Informations générales </Text>
        <Text  style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>{profilCoach.name}</Text>
        <Text  style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>{profilCoach.firstname}</Text>
        <Text  style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>{profilCoach.dateOfBirth}</Text>
        <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText,{color:isDarkMode ? "#FF711A":"black"}]}>Sports enseignés et à propos </Text>
        <Text  style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>{profilCoach.teachedSport}</Text>
      
      </View>
     
      <View style={styles.cardAbout}>
        <Text
        multiline numberOfLines={4}  
        style={[ isDarkMode ? styles.darkInputapropos : styles.lightInputapropos,{color:isDarkMode ? "white":"#7B7B7B"}]}>{profilCoach.myDescription} </Text>
      </View>

         <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText,{color:isDarkMode ? "#FF711A":"black"}]} >Ville et lieu de coaching</Text>
          <Text style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>{profilCoach.city}</Text>
          <Text style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>{profilCoach.coachingPlaces} </Text>
       

        <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText,{color:isDarkMode ? "#FF711A":"black"}]}> Informations professionnelles </Text>
          <Text style={[ isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>Cart Pro. : {profilCoach.proCard}</Text>

          <Text style={[ isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>Taux horaire :{profilCoach.price} €</Text>

          <Text style={[ isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>Siret : 
          </Text>
    
        <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText,{color:isDarkMode ? "#FF711A":"black"}]}>Informations de paiements</Text>
          <Text style={[ isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>IBAN :{profilCoach.iban} </Text>

          <Text style={[ isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>BIC : {profilCoach.bic} </Text>
      
    </ScrollView>
    </LinearGradient>
    </KeyboardAvoidingView>
  )
}

return (
  <Camera type={type} flashMode={flashMode} ref={(ref) => cameraRef = ref} style={styles.camera}>

    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
      >
        <FontAwesome name='rotate-right' size={25} color='#ffffff' />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)}
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
    flex:1,
    alignItems: 'center',
    },
  camera: {
    flex: 1
    },
  aPropos: {
    height: 100,
    width: 350,
    backgroundColor: '#F2F2F2',
    borderRadius: 13
    },
  background:{
    width: "100%",
    height: "100%",
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
  cardAbout: {
    width: '80%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    },
  crayon :{
    width: 10,
    height:10,
    marginLeft : 20,
    },
  image :{
    width:50,
    height:50,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginLeft : 20,
    marginTop : 40
    },
  inputView: {
    justifyContent: 'center',
    alignItems: 'center',
    width : "100%",
    margin: 10,
    borderRadius: 20,
    },
  picture : {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginVertical: 25,
    marginLeft: 40,
    marginRight : 40,
    },
  removeButton: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
    },
  return : {
    width:40,
    height:40,
    alignItems: "center",
    marginLeft: "3%",
    marginTop: "8%",
    borderRadius: 100,
    },
  scroll:{
    marginLeft: 40,
    marginRight : 40,
    marginTop: 10,
    },
  scrollContainer: {
    alignItems: 'center',
    },
  selectedImagesContainer: {
    marginVertical: 10,
    alignItems: 'center',
    width: 300,
    marginBottom: 60,
    },
  snapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 25,
    },
  sports: {
    display: 'none'
    },
  text: {
    color: '#FFF'
    },
  titre: {
    fontSize: 15,
    marginTop: 20
    },
    // style du Darkmode
  darkBg :{
    backgroundColor: 'black',
    },
  lightBg:{
    backgroundColor: '#E8E8E8',
    },
  darkbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 50,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 40,
    elevation: 15,
    backgroundColor: '#BF5000',
    shadowColor: '#FF6100',
    shadowOffset: { width: 50, height: 5,},
    shadowOpacity: 0.0001,
    },
  lightbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: 40,
    backgroundColor: '#FF711A',
    borderRadius: 25,
    marginTop: 30,
    elevation: 15,
    shadowColor: '#FF6100',
    shadowOffset: { width: 50, height: 5 },
    shadowOpacity: 0.0001,
    },
  
  darkInput:{
    marginTop: 10,
    textAlignVertical: 'center',
    fontSize : 15,
    backgroundColor: '#2E2E2E',
    width : "80%",
    margin : "3%",
    height: 40,
    borderRadius: 13,
    paddingLeft: 15,
    justifyContent: "center",
    },
  lightInput:{
    marginTop: 10,
    textAlignVertical: 'center',
    fontSize : 15,
    backgroundColor: 'white',
    width : "80%",
    margin : "3%",
    height: 40,
    borderRadius: 13,
    paddingLeft: 15,
    justifyContent: "center",
    },
  darkInputapropos:{
    marginTop: 30,
    fontSize : 15,
    backgroundColor: '#2E2E2E',
    width : "100%",
    margin : "3%",
    height: 150,
    borderRadius: 13,
    paddingLeft: 15,
    marginBottom: 50, 
    },
  lightInputapropos:{
    marginTop: 30,
    fontSize : 15,
    backgroundColor: 'white',
    width : "100%",
    margin : "3%",
    height: 150,
    borderRadius: 13,
    paddingLeft: 15,
    marginBottom: 50, 
    },
  darkPicture:{
    backgroundColor:"#505050",
    },
  lightPicture:{
    backgroundColor: '#fff',
    },
  darksignin: {
    width : "80%",
    alignItems: 'center',
    justifyContent: 'center',
    fontSize : 15,
    marginTop: 30,
    color : '#AAAAAA',
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 165, 0, 1)',  //'rgba(255, 165, 0, 1)', Couleur de l'ombre (noir avec opacité 0.75)
    textShadowOffset: { width: 0.5, height: 0.5 }, // Décalage de l'ombre (effet relief)
    textShadowRadius: 20, // Rayon de l'ombre (effet relief)
    },
  lightsignin: {
    width : "80%",
    alignItems: 'center',
    justifyContent: 'center',
    fontSize : 15,
    marginTop: 30,
    color : 'black',
    fontWeight: 'bold',
    // backgroundColor: '#58FD0B',
    textShadowColor: 'rgba(255, 100, 0, 0.5)',  //'rgba(255, 165, 0, 1)', Couleur de l'ombre (noir avec opacité 0.75)
    textShadowOffset: { width: 0.5, height: 0.5 }, // Décalage de l'ombre (effet relief)
    textShadowRadius: 1, // Rayon de l'ombre (effet relief)
    },
    darkText: {
      color: '#FFFFFF'
      },
    lightText: {
      color: 'black'
      },   
})


