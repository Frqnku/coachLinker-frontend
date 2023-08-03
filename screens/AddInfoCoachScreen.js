import React from 'react'
import { StyleSheet, KeyboardAvoidingView, Text, View, Pressable, TextInput, ScrollView, TouchableOpacity, Image} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useRef } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

export default function AddInfoCoachScreen({ navigation }) {

  const isDarkMode = useSelector(state => state.darkMode.value)
  const user = useSelector((state) => state.users.value);
  const isFocused = useIsFocused();

  // les useStates
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [coachLastname, setCoachLastname] = useState('')
  const [coachFirstname, setCoachFirstname] = useState('')
  const [coachBirthDate, setCoachBirthDate] = useState('')
  const [coachAbout, setCoachAbout] = useState('')
  const [siretNumber, setSiretNumber] = useState('')
  const [ibanNumber, setIbanNumber] = useState('')
  const [bicNumber, setBicNumber] = useState('')
  const [selectedImages, setSelectedImages] = useState([]);

  // camera tel
  let cameraRef = useRef(null);

      const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
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
           
            fetch('http://192.168.10.124:3000/upload', {
              method: 'POST',
              body: formData,
            }).then((response) => response.json())
              .then((data) => { 
                console.log(data)
                data.result && fetch('http://192.168.10.124:3000/students/profil', { /* a modifier */
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        image: data.url,
                        token: student.token, /* a modifier */
                 })
                 
              })
              .then((response) => response.json())
              .then((data) => {
                
                dispatch(addPhoto(data.student.image)); /* a modifier */
                setHasPermission(false);
              })
           })
        }
      }

  // HandleClicks
  const handleImageSelect = (image, imageName) => {
    if (selectedImages.length < 3 && !selectedImages.some((item) => item.image === image)) {
      setSelectedImages((prevImages) => [...prevImages, { image, name: imageName }])
    }
  }

  const handleImageRemove = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleSubmit = () => {

    navigation.navigate('Verification')
  }

  const handleBack = () => {

    navigation.navigate('ChooseRole')
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
 
  fetch('https://coach-linker-backend.vercel.app/upload', {
    method: 'POST',
    body: formData,
  }).then((response) => response.json())
    .then((data) => { 
      console.log(data)
      data.result && fetch('https://coach-linker-backend.vercel.app/students/profil', { /* a modifier */
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              image: data.url,
              token: student.token, /* a modifier */
       })
       
    })
    .then((response) => response.json())
    .then((data) => {
      
      dispatch(addPhoto(data.student.image)); /* a modifier  */
      setHasPermission(false);
    })
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
        style={styles.background}
        >
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    
      <View style={styles.btnBack}>
          <Image style={[styles.return, isDarkMode ? styles.darkReturn : styles.lightReturn]} source={require('../assets/bouton-retour.png')} onPress={handleBack}/>
          <Image style={[styles.image, isDarkMode ? styles.darkPicture : styles.lightPicture]} source={{uri : user.photo}} />
      </View>

      <View style={[styles.inputView, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <TextInput style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setCoachLastname(value)} value={coachLastname} placeholder='Nom' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"}></TextInput>
        <TextInput style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setCoachFirstname(value)} value={coachFirstname} placeholder='Prénom' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"}></TextInput>
        <TextInput style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setCoachBirthDate(value)} value={coachBirthDate} placeholder='Date de naissance' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"}></TextInput>
      </View>
      
      <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText]}>Sports enseignés</Text>

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

      <View style={styles.selectedImagesContainer}>
        {selectedImages.map((item, index) => (
          <View key={index} style={styles.selectedImageContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleImageRemove(index)}>
              <Text style={styles.removeButton}>X</Text>
            </TouchableOpacity>
          </View>
          ))}
      </View>

      <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText]}>A propos de moi</Text>

      <View style={styles.cardAbout}>
        <TextInput style={[styles.aPropos, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setCoachAbout(value)} value={coachAbout}></TextInput>
      </View>

      <View style={styles.btns}>
        <TouchableOpacity style={styles.btnPhoto} onPress={() => requestCameraPermission() && pickImage()}>
          <Text style={styles.text}>Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnDoc}>
          <Text style={styles.text}>Doc</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText]}>Insérez vos données</Text>

      <View style={styles.inputView}>
        <TextInput style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setSiretNumber(value)} value={siretNumber} placeholder='Numéro de Siret' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"}></TextInput>
        <TextInput style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} placeholder='Insérez votre carte Pro' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"}></TextInput>
        <TextInput style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} placeholder='Vos diplômes' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"}></TextInput>
      </View>

      <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText]}>Information de paiements</Text>

      <View style={styles.inputView}>
        <TextInput style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setIbanNumber(value)} value={ibanNumber} placeholder='IBAN' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"}></TextInput>
        <TextInput style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setBicNumber(value)} value={bicNumber}placeholder='BIC' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"}></TextInput>
      </View>

      <View style={styles.cardBtns}>
        <TouchableOpacity style={styles.btnSend}>
          <Text style={styles.text}>Envoyez un document</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnValidate} onPress={handleSubmit}>
          <Text style={styles.text}>Valider</Text>
        </TouchableOpacity>
      </View>
      
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
        paddingTop: 40,
        backgroundColor: '#F2F2F2',
    },
    aPropos: {
      height: 200,
      width: 300,
      backgroundColor: '#F2F2F2',
      margin: 10
    },
    btnBack: {
      width: '80%',
      flexDirection: 'row',
      justifyContent:'space-between', /* a enlever */
      margin: 10
    },
    btnDoc: {
      height: 60,
      width: 100,
      backgroundColor: "#BF5000",
      margin: 10,
      justifyContent:'center',
      alignItems: 'center',
      borderRadius: 25
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
    btns:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    btnSend: {
      height: 50,
      width: 300,
      backgroundColor: '#BF5000',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      borderRadius: 25
    },
    btnValidate: {
      height: 50,
      width: 300,
      backgroundColor: '#BF5000',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
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
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10
    },
    cardBtns: {
      margin: 10
    },
    camera: {
      flex: 1
    },
    // a enlever image
    image :{
      width:80,
      height:80,
      backgroundColor: "#fff",
      borderRadius: 50,
  },
    input: {
      height: 50,
      width: 300,
      backgroundColor: '#F2F2F2',
      margin: 10,
      padding: 10,
      borderRadius: 13
    },
    inputView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 350,
      height: 250,
      margin: 10,
      borderRadius: 20,
    },
    itemName: {
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
    },
    scrollContainer: {
      alignItems: 'center'
    },
    selectedImageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    selectedImagesContainer: {
      marginVertical: 10,
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      width: 350,
    },
    snapContainer: {
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
      fontSize: 20,
      marginTop: 40
    },
// style du Darkmode
    darkBg :{
      backgroundColor: 'black',
    },
    lightBg:{
        backgroundColor: '#E8E8E8',
    },
    darkReturn:{
        backgroundColor:"#2E2E2E",
    },
    lightReturn :{
        backgroundColor: '#fff',
    },
    darkPicture:{
        backgroundColor:"#2E2E2E",
    },
    lightPicture:{
        backgroundColor: '#fff',
    },
    darkInput:{
        backgroundColor: '#2E2E2E',
        borderColor: "#2E2E2E",
    },
    lightInput:{
        backgroundColor: '#E8E8E8',
        borderColor: "#E8E8E8", 
    },
    darkImg:{
        backgroundColor: '#2E2E2E',
        borderColor: "#F4A100",
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
    }
})

