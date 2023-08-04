import React from 'react'
import { StyleSheet, KeyboardAvoidingView, Text, View, TextInput, ScrollView, TouchableOpacity, Image} from 'react-native'
import GoodMorning from '../components/GoodMorning';
import { useState, useRef } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector,useDispatch } from 'react-redux';
import { signUp, addProcard, addPhoto } from '../reducers/users'
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function CoachProfileScreen() {
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const isDarkMode = useSelector(state => state.darkMode.value)
    const user = useSelector((state) => state.users.value); 

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

  
  // changement caméra du tel
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
       
        fetch('https://coach-linker-backend.vercel.app/upload', {
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

// sélection des sports : 
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
      

    return (
        <KeyboardAvoidingView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <LinearGradient
          colors={isDarkMode ? DARK_COLORS : LIGHT_COLORS}
          start={isDarkMode ? DarkStart : LightStart}
          end={isDarkMode ? DarkEnd : LightEnd}
          style={styles.background}
          >
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


      
      <Text style={[styles.titre, isDarkMode ? styles.darkText : styles.lightText]}>Informations de paiements</Text>

      <View style={styles.inputView}>
        <TextInput style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setIbanNumber(value)} value={ibanNumber} placeholder='IBAN' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} selectionColor={"#FF6100"}></TextInput>
        <TextInput style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]} onChangeText={(value) => setBicNumber(value)} value={bicNumber}placeholder='BIC' placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} selectionColor={"#FF6100"}></TextInput>
      </View>

      <TouchableOpacity style={styles.btnValidate} onPress={handleSubmit}>
          <Text style={styles.text}>Enregistrer</Text>
        </TouchableOpacity>
    </LinearGradient>
    </KeyboardAvoidingView>
  )
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
      margin: 10,
      borderRadius: 13
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
    picture : {
      justifyContent: "center",
      flexDirection: 'row',
      marginTop: "2%",

  },
  image :{
      width:100,
      height:100,
      backgroundColor: "#fff",
      borderRadius: 50,

},
crayon :{
  width:20,
  height:20,
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
      marginTop: 30,
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
      width: 300,
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
        color: "#FFFFFF",
    },
    lightInput:{
        backgroundColor: '#E8E8E8',
        borderColor: "#E8E8E8", 
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
      backgroundColor: '#2E2E2E'
    },
    lightSelectedImagesContainer: {
      backgroundColor: '#FFFFFF'
    },
    darkItemName: {
      color: '#FFFFFF'
    },
    lightItemName: {
      color: 'black'
    },
    darkRemoveButton: {
      color: '#FFFFFF'
    },
    lightRemoveButton: {
      color: 'black'
    }
})

