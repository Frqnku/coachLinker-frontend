import React from 'react'
import {StyleSheet, KeyboardAvoidingView, Image, TextInput, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { useState, useRef } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { addPhoto} from '../reducers/users';
import { signUp } from '../reducers/users'
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

import { backend_address } from '../backendAddress';

export default function AddInfoStudentScreen({navigation}) {

  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const isDarkMode = useSelector(state => state.darkMode.value)
  const user = useSelector((state) => state.users.value);
  const student = useSelector((state) => state.users.value);
 
  const [studentName, setStudentName] = useState('')
  const [studentFirstname, setStudentFirstname] = useState('')
  const [studentDateOfBirth, setStudentDateOfBirth] = useState('')
  const [studentMyDescription, setStudentMyDescription] = useState('')
  const [studentSports, setStudentSports] = useState('')
  const [selectedImages, setSelectedImages] = useState([]);
  const [errorNew, setErrorNew] = useState('')

  // const camera : 
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

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

    // sélection des sports
    const handleImageSelect = (image, imageName) => {
      if (selectedImages.length < 3 && !selectedImages.some((item) => item.image === image)) {
        setSelectedImages((prevImages) => [...prevImages, { image, name: imageName }]);
        setStudentSports((prevSports) => [...prevSports, imageName]); // Met à jour studentSports directement
      }
    };
  
    const handleImageRemove = (index) => {
      setSelectedImages((prevImages) => {
        const updatedImages = [...prevImages];
        const removedImage = updatedImages.splice(index, 1)[0];
        return updatedImages;
      });

      setStudentSports((prevSports) => {
        const updatedSports = [...prevSports];
        updatedSports.splice(index, 1); // Retire le sport de la liste
        return updatedSports;
      });
    };  
    
const handleValidate = async () => {
  try { 
    await dispatch(signUp({
      name: studentName, 
      firstname: studentFirstname,
      dateOfBirth: studentDateOfBirth,
      myDescription: studentMyDescription,
      image: user.photo,
      favoriteSport: studentSports,
    }));

    const signUpData = {
      email: student.signUp.email,
      password: student.signUp.password,
      name: studentName, 
      firstname: studentFirstname,
      dateOfBirth: studentDateOfBirth,
      myDescription: studentMyDescription,
      image: user.photo,
      favoriteSport: studentSports,
    };
    
    const response = await fetch(`${backend_address}/students/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signUpData),
    });

    const responseBody = await response.text();

    const data = JSON.parse(responseBody);

    if(!data.result) {
      setErrorNew(data.error)
    } 

    if (data.result) { 
      setErrorNew('');
      console.log("salut");
      navigation.navigate("TabNavigator", { screen: "Menu" });
    }
  } catch (error) {
    console.error('Error:', error);
    // Gérer les erreurs
  }
}

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
            console.log(data)
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
    
        if (!hasPermission || !isFocused) {
            
    return (
        <KeyboardAvoidingView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <LinearGradient
              colors={isDarkMode ? DARK_COLORS : LIGHT_COLORS}
              start={isDarkMode ? DarkStart : LightStart}
              end={isDarkMode ? DarkEnd : LightEnd}
              style={styles.background} >
       
       <TouchableOpacity  onPress={() => navigation.navigate('ChooseRole')} >
          <Image style={[styles.return, isDarkMode ? styles.darkReturn : styles.lightReturn]} source={require('../assets/bouton-retour.png')}/>
          </TouchableOpacity>
           
       <ScrollView contentContainerStyle={styles.scrollContainer}>  
       
       <Text style={[ isDarkMode ? styles.darksignin : styles.lightsignin]}>Bienvenue chez CoachLinker, merci de compléter ton profil pour passer à l'étape suivante </Text>
            <View style={styles.picture}>
                <Image style={[styles.image, isDarkMode ? styles.darkPicture : styles.lightPicture]} source={{uri : user.photo}} />
                <TouchableOpacity onPress={() => requestCameraPermission() && pickImage()} >
                            <Image  style={styles.crayon} source={require('../assets/crayon.png')} />
                </TouchableOpacity>
            </View>
            
        <View style={styles.inputView}>
        <TextInput selectionColor={"#FF6100"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setStudentName(value)} value={studentName} placeholder='Nom' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"}  ></TextInput>
        <TextInput selectionColor={"#FF6100"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setStudentFirstname(value)} value={studentFirstname} placeholder='Prénom' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} ></TextInput>
        <TextInput selectionColor={"#FF6100"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setStudentDateOfBirth(value)} value={studentDateOfBirth} placeholder='Date de naissance (jj/mm/aa)' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} ></TextInput>
      </View>

      <View style={styles.cardAbout}>
      <TextInput 
        multiline numberOfLines={4} 
        placeholder='A propos de moi'onChangeText={(value) => setStudentMyDescription(value)} value={studentMyDescription} 
        selectionColor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} 
        style={[ isDarkMode ? styles.darkInputapropos : styles.lightInputapropos]} ></TextInput>
      </View>
      
      <View>
        <Text style={styles.favoris}>Choisis jusqu'à 3 sports favoris :</Text>
      </View>
        
            
   <ScrollView  horizontal={true} style={styles.scroll} showsHorizontalScrollIndicator={false}>
      <TouchableOpacity style={styles.logos} onPress={() => handleImageSelect(require('../assets/sports/football.png'), 'Football')}>
        <Image style={[styles.sportIcon, isDarkMode ? styles.darkImg : styles.lightImg]} source={require('../assets/sports/football.png')} />
        <Text style={styles.sports}>Football</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logos} onPress={() => handleImageSelect(require('../assets/sports/gant-de-boxe.png'), 'Boxe')}>
        <Image style={[styles.sportIcon, isDarkMode ? styles.darkImg : styles.lightImg]} source={require('../assets/sports/gant-de-boxe.png')} />
        <Text style={styles.sports}>Boxe</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logos} onPress={() => handleImageSelect(require('../assets/sports/gym.png'), 'Gym')}>
        <Image style={[styles.sportIcon, isDarkMode ? styles.darkImg : styles.lightImg]} source={require('../assets/sports/gym.png')} />
        <Text style={styles.sports}>Gym</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logos} onPress={() => handleImageSelect(require('../assets/sports/basket-ball.png'), 'Basket ball')}>
        <Image style={[styles.sportIcon, isDarkMode ? styles.darkImg : styles.lightImg]} source={require('../assets/sports/basket-ball.png')} />
        <Text style={styles.sports}>Basket ball</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logos} onPress={() => handleImageSelect(require('../assets/sports/le-golf.png'), 'Golf')}>
        <Image style={[styles.sportIcon, isDarkMode ? styles.darkImg : styles.lightImg]} source={require('../assets/sports/le-golf.png')} />
        <Text style={styles.sports}>Golf</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logos} onPress={() => handleImageSelect(require('../assets/sports/nageur.png'), 'Natation')}>
        <Image style={[styles.sportIcon, isDarkMode ? styles.darkImg : styles.lightImg]} source={require('../assets/sports/nageur.png')} />
        <Text style={styles.sports}>Natation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logos} onPress={() => handleImageSelect(require('../assets/sports/tennis.png'), 'Tennis')}>
        <Image style={[styles.sportIcon, isDarkMode ? styles.darkImg : styles.lightImg]} source={require('../assets/sports/tennis.png')} />
        <Text style={styles.sports}>Tennis</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logos} onPress={() => handleImageSelect(require('../assets/sports/volant.png'), 'Course')}>
        <Image style={[styles.sportIcon, isDarkMode ? styles.darkImg : styles.lightImg]} source={require('../assets/sports/volant.png')} />
        <Text style={styles.sports}>Course</Text>
      </TouchableOpacity>
  </ScrollView>

  <View style={[styles.selectedImagesContainer, isDarkMode ? styles.darkSelectedImagesContainer : styles.lightSelectedImagesContainer]}>
    {selectedImages.map((item, index) => (
      <View key={index} style={styles.selectedImageContainer}>
        <Text style={[styles.itemName, isDarkMode ? styles.darkItemName : styles.lightItemName]}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleImageRemove(index)}>
          <Text style={[styles.removeButton, isDarkMode ? styles.darkRemoveButton : styles.lightRemoveButton]}>X</Text>
        </TouchableOpacity>
      </View>
      ))}
  </View>
  {errorNew && <Text style={{color: "#FF6100"}}>{errorNew}</Text>}
        <TouchableOpacity onPress={() => handleValidate()} style={[ isDarkMode ? styles.darkbutton : styles.lightbutton]} activeOpacity={0.8}>
          <Text style={[ isDarkMode ? styles.darkTextButton : styles.lightTextButton]}>Valider</Text>
        </TouchableOpacity>
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
  // Caméra
camera: {
  flex: 1,
  },
container : {
  flex :1 ,
  alignItems: 'center',
  },
background:{
  width: "100%",
  height: "100%",
  },
button: {
  width: 44,
  height: 44,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  borderRadius: 50,
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
  width: 350,
  height: 150,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 10,
  },
crayon :{
  width:20,
  height:20,
  },
favoris :{
  fontSize:20,
  marginTop: "8%",
  paddingLeft: 20,
  color: "#7B7B7B",
  },
image :{
  width:100,
  height:100,
  backgroundColor: "#fff",
  borderRadius: 50,
  marginLeft : 20,
  },
inputView: {
  justifyContent: 'center',
  alignItems: 'center',
  width : "80%",
  margin: 10,
  borderRadius: 20,
  },
itemName: {
  fontWeight: 'bold',
  marginRight: 100,
  fontSize: 20,
  },
logos :{
  margin: 20,
  height:70,
  width :90,
  alignItems: 'center',
  justifyContent: 'center',
  },
picture : {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80%',
  marginVertical: 10
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
  marginTop: 5,
  },
selectedImageContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 5,
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
sportIcon: {
  width:60,
  height:60,
  },
// darkmode
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
darkImg:{
  // backgroundColor: '#2E2E2E',
  borderColor: "#F4A100",
  },
lightImg:{
  // backgroundColor: '#fff',
  // borderColor: "#E8E8E8",
  },
darkInput:{
  marginTop: 10,
  fontSize : 15,
  backgroundColor: '#2E2E2E',
  width : "80%",
  margin : "3%",
  height: 40,
  borderRadius: 13,
  paddingLeft: 15,
  marginBottom: 10, 
  color: 'white',
  },
lightInput:{
  marginTop: 20,
  fontSize : 15,
  backgroundColor: '#E8E8E8',
  width : "80%",
  margin : "3%",
  height: 40,
  borderRadius: 13,
  paddingLeft: 15,
  marginBottom: 10, 
  color: 'black', 
  },
darkInputapropos: {
  marginTop: 30,
  fontSize : 15,
  backgroundColor: '#2E2E2E',
  width : "85%",
  margin : "3%",
  height: 150,
  borderRadius: 13,
  paddingLeft: 15,
  marginBottom: 50, 
  color: 'white',
  },
lightInputapropos: {
  marginTop: 20,
  fontSize : 15,
  backgroundColor: '#E8E8E8',
width : "85%",
  margin : "3%",
  height: 200,
  borderRadius: 13,
  paddingLeft: 15,
  marginBottom: 10, 
  color: 'black', 
  },
darkItemName: {
  color: '#FF6100'
  },
lightItemName: {
  color: 'black'
  },
darkPicture:{
  backgroundColor:"#505050",
  },
lightPicture:{
  backgroundColor: '#fff',
  },
darkRemoveButton: {
  color: '#FF6100',
  textShadowColor: 'white',  //'rgba(255, 165, 0, 1)', Couleur de l'ombre (noir avec opacité 0.75)
  textShadowOffset: { width: 0.5, height: 1 }, // Décalage de l'ombre (effet relief)
  textShadowRadius: 20,
  },
lightRemoveButton: {
  color: 'black'
  },
darkReturn:{
  backgroundColor:"#2E2E2E",
  },
lightReturn :{
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
darkTextButton: {
  fontSize : 15,
  color: '#2E2E2E',
  fontWeight: 'bold',
  },
lightTextButton: {
  fontSize : 15,
  color: 'white',
  fontWeight: 'bold',
  } 
});