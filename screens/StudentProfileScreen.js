import React from 'react';
import { useState, useRef } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { switchMode } from '../reducers/darkMode';
import users from '../reducers/users';
import { addPhoto} from '../reducers/users';
import { updateStudent} from '../reducers/student';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

import {StyleSheet, KeyboardAvoidingView, Image, TextInput, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { nanoid } from '@reduxjs/toolkit';


export default function StudentProfileScreen({navigation}) {
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const isDarkMode = useSelector(state => state.darkMode.value)
    const user = useSelector((state) => state.users.value);

        
    const [studentName, setStudentName] = useState('')
    const [studentFirstname, setStudentFirstname] = useState('')
    const [studentDateOfBirth, setStudentDateOfBirth] = useState('')
    const [selectedImages, setSelectedImages] = useState([]);
    
    const [studentMyDescription, setStudentMyDescription] = useState('')
    const [studentImage, setStudentImage] = useState('')
 

    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.off);
  
    let cameraRef = useRef(null);
    
    const student = useSelector((state) => state.people.value) 
    console.log('test de merde', student)
    
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
       
        fetch('https://coach-linker-backend.vercel.app/upload', {
          method: 'POST',
          body: formData,
        }).then((response) => response.json())
          .then((data) => { 
            console.log(data)
            data.result && fetch('https://coach-linker-backend.vercel.app/students/profil', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    image: data.url,
                    token: student.token,
             })
             
          })
          .then((response) => response.json())
          .then((data) => {
            
            dispatch(addPhoto(data.student.image));
            setHasPermission(false);
          })
       }) 
    }
}

  

//    const realStudent = useSelector((state) => state.student.value)



const handleValidate =() => {
    
// faire un useselector du usedispatch de connexionscreen et récpérer l'id

    fetch('http://192.168.10.124:3000/students/profil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name: studentName, 
            firstname: studentFirstname,
            dateOfBirth: studentDateOfBirth,
            myDescription: studentMyDescription,
            image: studentImage,
            token: student.token,
    
     }),
    }).then(response => response.json())
        .then(data => {
            console.log('test', data)
            if (data.result) {
                dispatch(updateStudent({ 
                    name: studentName, 
                    firstname: studentFirstname,
                    dateOfBirth: studentDateOfBirth,
                    myDescription: studentMyDescription,
                    image: studentImage }));
                    

                navigation.navigate('Menu')

            }
        });
}



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
        data.result && fetch('https://coach-linker-backend.vercel.app/students/profil', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                image: data.url,
                token: student.token,
         })
         
      })
      .then((response) => response.json())
      .then((data) => {
        
        dispatch(addPhoto(data.student.image));
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
 
         
// {/* <Text>{realStudent.name}</Text> */}
    if (!hasPermission || !isFocused) {
        
       
  return (
<KeyboardAvoidingView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <LinearGradient
        colors={isDarkMode ? DARK_COLORS : LIGHT_COLORS}
        start={isDarkMode ? DarkStart : LightStart}
          end={isDarkMode ? DarkEnd : LightEnd}
        style={styles.background}
        >
<ScrollView  contentContainerStyle={styles.scrollContainer}showsVerticalScrollIndicator={false}>
     <Image style={[styles.return, isDarkMode ? styles.darkReturn : styles.lightReturn]} source={require('../assets/bouton-retour.png')} />

    <View style={styles.picture}>
       
        <Image style={[styles.image, isDarkMode ? styles.darkPicture : styles.lightPicture]} source={{uri : user.photo}} />
        <TouchableOpacity onPress={() => requestCameraPermission() && pickImage()} >
                    <Image  style={styles.crayon} source={require('../assets/crayon.png')} />
        </TouchableOpacity>
    </View>

     <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <TextInput placeholder="Nom" onChangeText={(value) => setStudentName(value)} value={studentName}
        placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.inputNom, isDarkMode ? styles.darkInput : styles.lightInput]} />
        <TextInput placeholder="Prénom" onChangeText={(value) => setStudentFirstname(value)} value={studentFirstname}
        placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.inputPrenom, isDarkMode ? styles.darkInput : styles.lightInput]} />

        <TextInput placeholder="Date de naissance"  onChangeText={(value) => setStudentDateOfBirth(value)} value={studentDateOfBirth}
        placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.inputDate, isDarkMode ? styles.darkInput : styles.lightInput]} />
    </View>


    <View style={[styles.description, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <TextInput placeholder="A propos de moi ..." onChangeText={(value) => setStudentMyDescription(value)} value={studentMyDescription}
        placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.inputMoi, isDarkMode ? styles.darkInput : styles.lightInput]} />

    </View>

   
    <View>
        <Text style={styles.favoris}>Sports favoris :</Text>
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
    
    <TouchableOpacity onPress={() => handleValidate()} style={styles.button2} activeOpacity={0.8}>
                            <Text style={styles.textButton}>Valider</Text>
    </TouchableOpacity>
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
    darkBg :{
        backgroundColor: 'black',
    },
    lightBg:{
        // backgroundColor: '#E8E8E8',
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
        backgroundColor: '#505050',
        borderColor: "#505050",
        
    },
    lightInput:{
        backgroundColor: '#E8E8E8',
        borderColor: "#E8E8E8",
        
    },
    darkImg:{
        backgroundColor: 'black',
        borderColor: "#F4A100",
    },
    lightImg:{
        backgroundColor: '#FFF8EB',
        borderColor: "#E8E8E8",
    },
    darkIn:{
     backgroundColor: '#2E2E2E',
    },
    lightIn:{
    backgroundColor: '#fff',
    },
    container : {
        flex :1 ,
       justifyContent: "space-evenly",
       
    },
    background:{
    width: "100%",
    height: "100%",
    },
    scrollContainer:{
        alignItems:'center',
    },
    return :{
        width:40,
        height:40,
        marginRight: "80%",
        marginTop: "15%",
        borderRadius: 50,
    },
   
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
    inputs: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: "8%",
        marginLeft: "5%",
        width: "90%",
        backgroundColor:"#fff",
        borderRadius: 5,
     
    },
    inputNom: {
        fontSize : 20,
        borderColor: "#E8E8E8",
        borderWidth: 2,
        width : "80%",
        margin : "4%",
        height: 40,
        paddingLeft: 5,
        borderRadius: 5,
       
    },
    
    inputPrenom :{
        fontSize : 20,
        borderColor: "#E8E8E8",
        borderWidth: 2,
        width : "80%",
        margin : "4%",
        height: 40,
        paddingLeft: 5,
        borderRadius: 5,
    },
    inputDate :{
        fontSize : 20,
        borderColor: "#E8E8E8",
        borderWidth: 2,
        width : "80%",
        margin : "4%",
        height: 40,
        paddingLeft: 5,
        borderRadius: 5,
    },
    description :{
        alignItems: 'center',
        marginTop: "8%",
        marginLeft: "5%",
        width: "90%",
        backgroundColor:"#fff",
        borderRadius: 5,
        
    },
    inputMoi :{
        fontSize : 20,
        alignItems:'flex-start',
        borderColor: "#E8E8E8",
        borderWidth: 2,
        width : "80%",
        margin : "4%",
        height: 150,
        paddingLeft: 5,
        borderRadius: 5,
        paddingBottom: 100,
    },
    favoris :{
        fontSize:20,
        marginTop: "8%",
        paddingLeft: 20,
        color: "#7B7B7B",
    },
   
    scroll:{
        marginLeft: 40,
        marginRight : 40,
        marginTop: "15%",
    },
    logos :{
      margin: 20,
      height:70,
      width :90,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 50,
      
    },
    sportIcon: {
        width:60,
        height:60,
    },
    sports: {
      display: 'none',
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
        width: "90%",
        marginLeft: "5%",
      },
      itemName: {
        fontWeight: 'bold',
        marginRight: 100,
      },
      removeButton: {
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 16,
      },
    camera: {
        flex: 1,
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
      button: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 50,
      },
      snapContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 25,
      },
      input2: {
        fontSize : 20,
        backgroundColor: "#F2F2F2",
        width : 200,
        margin : "4%",
        height: 40,
        borderRadius: 5,
        paddingLeft: 5
      },
      button2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 50,
        backgroundColor: '#FF7C00',
        borderRadius: 5,
        marginTop: 15
      },
});

