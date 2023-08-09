import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { signUp, addPhoto } from '../reducers/users'
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import {StyleSheet, KeyboardAvoidingView, Image, TextInput, View, Text, ScrollView, TouchableOpacity} from 'react-native';

import { backend_address } from '../backendAddress';

export default function StudentProfileScreen({navigation}) {
  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const isDarkMode = useSelector(state => state.darkMode.value)
  const user = useSelector(state => state.users.value.signUp)

const [studentMyDescription, setStudentMyDescription] = useState('')
const [isEditing, setIsEditing] = useState(false);
const [hasPermission, setHasPermission] = useState(false);
const [type, setType] = useState(CameraType.back);
const [flashMode, setFlashMode] = useState(FlashMode.off);
  
let cameraRef = useRef(null);

const student = useSelector((state) => state.users.value) 
const token = useSelector(state => state.users.value.token)
const profilStudent = useSelector(state => state.users.value.signUp)
 

useEffect(() => {
  fetch(`${backend_address}/students/profil`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({token: token})
  })
    .then(response => response.json())
    .then(data => {
        console.log('student', data)
      setStudentMyDescription(data.data.myDescription);  
      dispatch(signUp({token:token, 
        name: data.data.name,
        firstname: data.data.firstname,
        myDescription:data.data.myDescription,
        dateOfBirth:data.data.dateOfBirth,
        favoriteSport: data.data.favoriteSport,
       }))
        
    });
}, []);


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
   

    fetch(`${backend_address}/upload`, { // fetch modifié comme sur AddinfStudentScreen
      method: 'POST',
      body: formData,
    }).then((response) => response.json())
      .then((data) => { 
        if (data.result) {
          fetch(`${backend_address}/students/update`, { // fetch modifié comme sur AddinfStudentScreen
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({image: data.url}),
          }).then((response) => response.json())
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

   const toggleEditMode = () => {
     setIsEditing(!isEditing);
   };
    
 // Mettez à jour l'état local avec la nouvelle description 
 const saveDescription = async () => {
  dispatch(
    signUp({
      myDescription: studentMyDescription,
    })
  );

  try {
    const response = await fetch(`${backend_address}/students/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:` Bearer ${token}`,
      },
      body: JSON.stringify({
        token: token,
        myDescription: studentMyDescription,
      }),
    });


    const responseData = await response.json();

    if (response.ok) {
      console.log('Informations updated successfully');
      toggleEditMode(); // Sortez du mode d'édition après l'enregistrement
    } else {
      console.error('Failed to update information:', responseData.error);
    }
  } catch (error) {
    console.error('Error updating information:', error);
    // Gérez les erreurs comme vous le souhaitez
  }
};

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
                  <Image style={[styles.image, isDarkMode ? styles.darkPicture : styles.lightPicture]} source={{uri: user.image}} />
                  <TouchableOpacity onPress={() => requestCameraPermission() && pickImage()} >
                  <Image  style={styles.crayon} source={require('../assets/crayon.png')} />
                  </TouchableOpacity>
                  <Text style={[ isDarkMode ? styles.darksignin : styles.lightsignin]}>       Good morning {profilStudent.firstname}!</Text>
          </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>  
 
 <View style={styles.inputView}>

 <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText,{color:isDarkMode ? "#FF711A":"black"}]}>Informations générales </Text>
   <Text  style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>{profilStudent.name}</Text>
   <Text  style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>{profilStudent.firstname}</Text>
   <Text  style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>{profilStudent.dateOfBirth}</Text>
   <View style={styles.inputView}>
   <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText,{color:isDarkMode ? "#FF711A":"black"}]}>Sports favoris </Text>
  </View >
   <Text  style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput,{color:isDarkMode ? "white":"#7B7B7B"}]}>{profilStudent.favoriteSport}</Text>
 </View>

 <View style={styles.View2}>
   <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText,{color:isDarkMode ?"#FF711A":"black"}]}>A propos de moi </Text>
   <TouchableOpacity onPress={() => {
        if (isEditing) {
          saveDescription();
        }
        toggleEditMode();
      }} style={[ isDarkMode ? styles.darkbutton : styles.lightbutton]}>
        <Text style={[ isDarkMode ? styles.darkTextButton : styles.lightTextButton]}>{isEditing ? 'Enregistrer' : 'Modifier'}</Text>
      </TouchableOpacity>
  </View>


 <View style={styles.cardAbout}>



  {isEditing ? (
    <TextInput
      value={studentMyDescription}
      onChangeText={setStudentMyDescription}
      selectionColor={'#FF6100'}
      placeholderTextColor={isDarkMode ? "white":"#7B7B7B"}
      style={[isDarkMode ? styles.darkInputapropos : styles.lightInputapropos,{color:isDarkMode ?"white":"#7B7B7B"}]}
    />
  ) : (
    <Text
      selectionColor={'#FF6100'}
      placeholderTextColor={isDarkMode ? "white":"#7B7B7B"}
      style={[isDarkMode ? styles.darkInputapropos : styles.lightInputapropos,{color:isDarkMode ?"white":"#7B7B7B"}]}
    >
      {profilStudent.myDescription}
    </Text>
  )}
</View>
 
</ScrollView>
</LinearGradient>
</KeyboardAvoidingView>
  )
    };
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
  View2 : {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'space-between',
    width : "100%",
    margin: 10,
    borderRadius: 20,
  }, 
  container: {
    flex:1,
    alignItems: 'center',
    },
  background:{
    width: "100%",
    height: "100%",
    },
  darkBg :{
    backgroundColor: 'black',
    },
  lightBg:{
    backgroundColor: '#E8E8E8',
    },
  return : {
    width:40,
    height:40,
    alignItems: "center",
    marginLeft: "3%",
    marginTop: "8%",
    borderRadius: 100,
    },
  darkReturn:{
    backgroundColor:"#2E2E2E",
    },
  lightReturn :{
    backgroundColor: '#fff',
    },
  scroll:{
    marginLeft: 40,
    marginRight : 40,
    marginTop: 10,
    },
  scrollContainer: {
    alignItems: 'center',
    },
  aPropos: {
    height: 100,
    width: 350,
    backgroundColor: '#F2F2F2',
    borderRadius: 13
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
  camera: {
    flex: 1
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
  image :{
    width:50,
    height:50,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginLeft : 20,
    marginTop : 40
    },
  crayon :{
    width: 10,
    height:10,
    marginLeft : 20,
    },
  input: {
    },
  inputView: {
    justifyContent: 'center',
    alignItems: 'center',
    width : "100%",
    margin: 10,
    borderRadius: 20,
    },
  removeButton: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
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
  darkPicture:{
    backgroundColor:"#505050",
    },
  lightPicture:{
    backgroundColor: '#fff',
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
  darkImg:{
    borderColor: "#FF6100",
    },
  lightImg:{
    backgroundColor: '#fff',
    borderColor: "#E8E8E8",
    },
  darkText: {
    color: '#FFFFFF'
    },
  lightText: {
    color: 'black'
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
  lightbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 20,
    borderRadius: 25,
    marginTop: 20,
    marginLeft : 15,
    elevation: 15,
    backgroundColor: '#FF711A',
    shadowColor: '#FF6100',
    shadowOffset: { width: 50, height: 5,},
    shadowOpacity: 0.0001,
    },
  darkbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 20,
    borderRadius: 25,
    marginTop: 20,
    elevation: 15,
    marginLeft : 15,
    backgroundColor: '#BF5000',
    shadowColor: '#FF6100',
    shadowOffset: { width: 50, height: 5,},
    shadowOpacity: 0.0001,
    },
  lightTextButton: {
    fontSize : 12,
    color: 'white',
    fontWeight: 'bold',
    },
  darkTextButton: {
    fontSize : 12,
    color: '#2E2E2E',
    fontWeight: 'bold',
  },
})
    