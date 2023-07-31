import React from 'react';
import { useState, useRef } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, KeyboardAvoidingView, Image, TextInput, View, Text, ScrollView, TouchableOpacity} from 'react-native';

export default function StudentProfileScreen() {
  
    const isFocused = useIsFocused();

    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.off);
  
    let cameraRef = useRef(null);

    const requestCameraPermission = async () => { 
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    const takePicture = async () => {
        const photo = await cameraRef.takePictureAsync({ quality: 0.3 });}
        
    if (!hasPermission || !isFocused) {
       
  return (
<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
     <Image style={styles.return} source={require('../assets/bouton-retour.png')} />

    <View style={styles.picture}>
        <Image style={styles.image} source={require('../assets/utilisateur.png')} />
        <TouchableOpacity onPress={() => requestCameraPermission()} >
                    <Image style={styles.crayon} source={require('../assets/crayon.png')} />
        </TouchableOpacity>
    </View>
    <View style={styles.inputs}>
        <TextInput placeholder="Nom" placeholderTextColor="#F4A100" style={styles.inputNom} />
        <TextInput placeholder="Prénom" placeholderTextColor="#F4A100" style={styles.inputPrenom} />
        <TextInput placeholder="Date de naissance" placeholderTextColor="#F4A100" style={styles.inputDate} />
    </View>
    <View style={styles.description}>
        <TextInput placeholder="A propos de moi" placeholderTextColor="#F4A100" style={styles.inputMoi} />

    </View>
    <View>
        <Text style={styles.favoris}>Sports favoris :</Text>
    </View>

    
    <ScrollView  horizontal={true} style={styles.scroll} showsHorizontalScrollIndicator={false}>
        <View style={styles.logos}>
            <Image style={styles.football} source={require('../assets/sports/football.png')} />
        </View>
        <View style={styles.logos}>
            <Image style={styles.boxe} source={require('../assets/sports/gant-de-boxe.png')} />
        </View>
        <View style={styles.logos}>
            <Image style={styles.gym} source={require('../assets/sports/gym.png')} />
        </View>
        <View style={styles.logos}>
            <Image style={styles.basket} source={require('../assets/sports/basket-ball.png')} />
        </View>
        <View style={styles.logos}>
             <Image style={styles.golf} source={require('../assets/sports/le-golf.png')} />
        </View>
        <View style={styles.logos}>
             <Image style={styles.nage} source={require('../assets/sports/nageur.png')} />
        </View>
        <View style={styles.logos}>
            <Image style={styles.tennis} source={require('../assets/sports/tennis.png')} />
        </View>
        <View style={styles.logos}>
            <Image style={styles.badmington} source={require('../assets/sports/volant.png')} />
        </View>
    </ScrollView>
    

      
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
    container : {
        flex :1 ,
        backgroundColor: '#ffffff',
       justifyContent: "space-evenly",
       
    },
    return :{
        width:40,
        height:40,
        alignItems: "center",
        marginLeft: "3%",
        marginTop: "8%",
    },
   
    picture : {
        justifyContent: "center",
        flexDirection: 'row',
        marginTop: "8%",
    },
    image :{
        width:100,
        height:100,
        backgroundColor: "black",
        borderRadius: "50%",
 
    },
    crayon :{
        width:20,
        height:20,
    },
    inputs: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: "8%",
     
    },
    inputNom: {
        fontSize : 20,
        borderColor: "#F4A100",
        borderLeftColor:"black",
        borderRightColor:"#F4A100",
        borderTopColor: "black",
        borderBottomColor:"#F4A100",
        borderWidth: 2,
        width : "80%",
        margin : "4%",
        height: 40,
    },
    
    inputPrenom :{
        fontSize : 20,
        borderColor: "#F4A100",
        borderLeftColor:"black",
        borderRightColor:"#F4A100",
        borderTopColor: "black",
        borderBottomColor:"#F4A100",
        borderWidth: 2,
        width : "80%",
        margin : "4%",
        height: 40,
    },
    inputDate :{
        fontSize : 20,
        borderLeftColor:"black",
        borderRightColor:"#F4A100",
        borderTopColor: "black",
        borderBottomColor:"#F4A100",
        borderColor: "#F4A100",
        borderWidth: 2,
        width : "80%",
        margin : "4%",
        height: 40,
    },
    description :{
        alignItems: 'center',
        marginTop: "8%",
    },
    inputMoi :{
        fontSize : 20,
        borderColor: "#F4A100",
        borderLeftColor:"black",
        borderRightColor:"#F4A100",
        borderTopColor: "black",
        borderBottomColor:"#F4A100",
        borderWidth: 2,
        width : "80%",
        margin : "4%",
        height: 40,
    },
    favoris :{
        fontSize:20,
        marginTop: "8%",
    },
    scroll:{
        marginLeft: 40,
        marginRight : 40,
        marginTop: "8%",
    },
    logos :{
      margin: 20,
      backgroundColor:"black",
      height:70,
      width : 70,
      alignItems: 'center',
      justifyContent: 'center',
    },
    football: {
        width:60,
        height:60,
    },
    basket :{
        width:60,
        height:60,
    },
    boxe :{
        width:60,
        height:60,
    },
    gym :{
        width:60,
        height:60,
    },
    golf :{
        width:60,
        height:60,
    },
    nage :{
        width:60,
        height:60,
    },
    tennis :{
        width:60,
        height:60,
    },
    badmington :{
        width:60,
        height:60,
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
});

