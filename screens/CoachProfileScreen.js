import React from 'react'
import { StyleSheet, KeyboardAvoidingView, Text, View, TextInput, ScrollView, TouchableOpacity, Image} from 'react-native'
import GoodMorning from '../components/GoodMorning';
import { useState, useRef, useEffect } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector,useDispatch } from 'react-redux';
import { signUp, addProcard, addPhoto, addToken } from '../reducers/users'
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

import { backend_address } from '../backendAddress';


export default function CoachProfileScreen() {
  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const isDarkMode = useSelector(state => state.darkMode.value)
  const user = useSelector((state) => state.users.value);
  const coach = useSelector((state) => state.coachs.value); 
  const token = useSelector(state => state.users.value.token)
  console.log('coach10', token)

  // les useStates
  // const camera : 
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  const [coachName, setCoachName] = useState('')
  const [coachFirstname, setCoachFirstname] = useState('')
  const [coachBirthDate, setCoachBirthDate] = useState('')
  const [coachAbout, setCoachAbout] = useState('')
  const [siretNumber, setSiretNumber] = useState('')
  const [ibanNumber, setIbanNumber] = useState('')
  const [bicNumber, setBicNumber] = useState('')
  const [selectedImages, setSelectedImages] = useState([])
  const [coachPrice, setCoachPrice] = useState('')
  const [coachCity, setCoachCity] = useState('')
  const [coachPlace, setCoachPlace] = useState('')
  const [coachProCard, setCoachProCard] = useState('')

  const [coachSports, setCoachSports] = useState([])


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

      
    // sélection des sports
    const handleImageSelect = (image, imageName) => {
      if (selectedImages.length < 3 && !selectedImages.some((item) => item.image === image)) {
        setSelectedImages((prevImages) => [...prevImages, { image, name: imageName }]);
        setCoachSports((prevSports) => [...prevSports, imageName]); // Met à jour studentSports directement
      }
    };
  
    const handleImageRemove = (index) => {
      setSelectedImages((prevImages) => {
        const updatedImages = [...prevImages];
        const removedImage = updatedImages.splice(index, 1)[0];
        return updatedImages;
      });
      setCoachSports((prevSports) => {
        const updatedSports = [...prevSports];
        updatedSports.splice(index, 1); // Retire le sport de la liste
        return updatedSports;
      });
    };  
    

      
  // sélection de la procard : à compléter

  const handleSubmit = async () => {
    console.log(coachSports);
    try { 
      await dispatch(signUp({
        name: coachName, 
        firstname: coachFirstname,
        dateOfBirth: coachBirthDate,
        myDescription: coachAbout,
        image: user.photo,
        teachedSport: coachSports,
        proCard : coachProCard,
        siret : siretNumber, 
        iban : ibanNumber,
        bic : bicNumber, 
        price : coachPrice,
        city : coachCity,
        coachingPlaces : coachPlace,
      }));
  
      const signUpData = {
        email: coach.signUp.email,
        password: coach.signUp.password,
        name: coachName, 
        firstname: coachFirstname,
        dateOfBirth: coachBirthDate,
        myDescription: coachAbout,
        image: user.photo,
        teachedSport: coachSports,
        proCard : coachProCard,
        siret : siretNumber, 
        iban : ibanNumber,
        bic : bicNumber, 
        price : coachPrice,
        city : coachCity,
        coachingPlaces : coachPlace,
      };
      
      const response = await fetch(`${backend_address}/coachs/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signUpData),
      });
  
      const responseBody = await response.text();
      console.log('Response from server:', responseBody);
  
      const data = JSON.parse(responseBody);
      console.log('dataresult', data);
  
      if (data.result) { 
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

console.log('formData', formData)

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

useEffect(() => {
  fetch('https://coach-linker-backend.vercel.app/coachs/profil', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({token: token})
  })
    .then(response => response.json())
    .then(data => {
        console.log('profilcoach', data)
        
      dispatch(addToken({token: token, data}))
      console.log('yes', dispatch(addToken({token: token, data})))
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
                  <Image style={[styles.image, isDarkMode ? styles.darkPicture : styles.lightPicture]} source={{uri : user.photo}} />
                  <TouchableOpacity onPress={() => requestCameraPermission() && pickImage()} >
                      <Image  style={styles.crayon} source={require('../assets/crayon.png')} />
                      <Text style={isDarkMode ? styles.darkText : styles.lightText}>            Good morning {user.signUp.firstnamename}!</Text>
                  </TouchableOpacity>
          </View>
    
      <ScrollView contentContainerStyle={styles.scrollContainer}>  

      <View style={styles.inputView}>
        <TextInput selectionColor={"#FF6100"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setCoachName(value)} value={coachName} placeholder='Nom' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"}  ></TextInput>
        <TextInput selectionColor={"#FF6100"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setCoachFirstname(value)} value={coachFirstname} placeholder='Prénom' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} ></TextInput>
        <TextInput selectionColor={"#FF6100"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setCoachBirthDate(value)} value={coachBirthDate} placeholder='Date de naissance (jj/mm/aaaa)' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} ></TextInput>
      </View>
      
      <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText]}>Sports enseignés : </Text>
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
     
      <View style={styles.cardAbout}>
      <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText]}>A propos de moi </Text>
        <TextInput 
        multiline numberOfLines={4} 
        placeholder='Ma description'onChangeText={(value) => setCoachAbout(value)} value={coachAbout} 
        selectionColor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} 
        style={[ isDarkMode ? styles.darkInputapropos : styles.lightInputapropos]} ></TextInput>
      </View>

        <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText]}>Adresses</Text>
          <TextInput style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setCoachCity(value)} value={coachCity} placeholder='Adresse' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} selectionColor={"#FF6100"}></TextInput>
          <TextInput style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setCoachPlace(value)} value={coachPlace} placeholder='Adresse coachingPlaces' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} selectionColor={"#FF6100"}></TextInput>
       

        <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText]}> Informations professionnelles </Text>
          <TextInput 
          onChangeText={(value) => setCoachProCard(value)} value={coachProCard} placeholder='Référence carte Pro.'
          selectionColor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} 
          style={[ isDarkMode ? styles.darkInput : styles.lightInput]}  >
         </TextInput>

          <TextInput 
          onChangeText={(value) => setCoachPrice(value)} value={coachPrice} placeholder='Taux horaire'
          selectionColor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} 
          style={[ isDarkMode ? styles.darkInput : styles.lightInput]}  >
          </TextInput>

          <TextInput 
          placeholder='Numéro de Siret'  onChangeText={(value) => setSiretNumber(value)} value={siretNumber}  
          selectionColor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} 
          style={[ isDarkMode ? styles.darkInput : styles.lightInput]}>
          </TextInput>
    
        <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText]}>Informations de paiements</Text>
          <TextInput 
          placeholder="IBAN" onChangeText={(value) => setIbanNumber(value)} value={ibanNumber}
          selectionColor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} 
          style={[ isDarkMode ? styles.darkInput : styles.lightInput]}>
          </TextInput>

          <TextInput 
          placeholder='BIC' onChangeText={(value) => setBicNumber(value)} value={bicNumber}
          selectionColor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} 
          style={[ isDarkMode ? styles.darkInput : styles.lightInput]}></TextInput>
    
      
        <TouchableOpacity style={[ isDarkMode ? styles.darkbutton : styles.lightbutton]} onPress={handleSubmit}activeOpacity={0.8}>
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
    marginTop: 5,
    },
  aPropos: {
    height: 100,
    width: 350,
    backgroundColor: '#F2F2F2',
    borderRadius: 13
    },
  btnPhoto: {
    height: 60,
    width: 100,
    backgroundColor: "#BF5000",
    margin: 10,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 25,
    },
  btnValidate: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: 40,
    backgroundColor: '#BF5000',
    borderRadius: 25,
    marginTop: 30,
    elevation: 15,
    shadowColor: '#FF6100',
    shadowOffset: { width: 50, height: 5 },
    shadowOpacity: 0.0001,
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
  camera: {
    flex: 1
    },
  picture : {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'space-between',
    width: '80%',
    marginVertical: 10,
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
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 100,
    },
  logos :{
    margin: 20,
    height:70,
    width :90,
    alignItems: 'center',
    justifyContent: 'center',
    },
  removeButton: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
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
  snapContainer2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 25,
    },
  sportIcon: {
    width:60,
    height:60,
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
  darkInputapropos:{
    marginTop: 30,
    fontSize : 15,
    backgroundColor: '#2E2E2E',
    width : "80%",
    margin : "3%",
    height: 150,
    borderRadius: 13,
    paddingLeft: 15,
    marginBottom: 50, 
    color: 'white',
    },
  lightInputapropos:{
    marginTop: 20,
    fontSize : 15,
    backgroundColor: '#E8E8E8',
    width : "80%",
    margin : "3%",
    height: 200,
    borderRadius: 13,
    paddingLeft: 15,
    marginBottom: 10, 
    color: 'black', 
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
  darkSelectedImagesContainer: {
    // backgroundColor: '#2E2E2E'
    },
  lightSelectedImagesContainer: {
    // backgroundColor: '#FFFFFF'
    },
  darkItemName: {
    color: '#FF6100'
    },
  lightItemName: {
    color: 'black'
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
  lightTextButton: {
    fontSize : 15,
    color: 'white',
    fontWeight: 'bold',
    },
  darkTextButton: {
    fontSize : 15,
    color: '#2E2E2E',
    fontWeight: 'bold',
    },
})


