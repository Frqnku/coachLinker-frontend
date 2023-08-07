import { StyleSheet, Text, View, Image, Pressable, TextInput, TouchableOpacity, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { signUp, addToken} from '../reducers/users'; 
import Icon from 'react-native-vector-icons/FontAwesome';

import { backend_address } from '../backendAddress';




export default function ConnexionScreen({ navigation }) {
    const dispatch = useDispatch();

    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpPassword2, setSignUpPassword2] = useState('')
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [pwdStrength, setPwdStrength] = useState('')
    const [pwdColor, setPwdColor] = useState('transparent')
    const [errorSignup, setErrorSignup] = useState('')
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);

    const isDarkMode = useSelector(state => state.darkMode.value)
    const isCoach = useSelector(state => state.users.value.signUp.isCoach)

const DARK_COLORS = ["black","#FF6100"];
const LIGHT_COLORS = ["#FFF8EB", "#FF6100"];
const DarkStart = {x : 0.4, y : 0.4};
const DarkEnd = {x : -0.3, y : -0.3};
const LightStart = {x : 0.6, y : 0.3};
const LightEnd = {x : 0.1, y : 0};

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

useEffect(() => {
  let pwdCheck = 0;
  const validateRegex = [
    /[A-Z]/,                   // Au moins une majuscule
    /[a-z]/,                   // Au moins une minuscule
    /[0-9]/,                   // Au moins un chiffre
    /.{8,}/,                   // Au moins 8 caractères               // Au moins 12 caractères
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/ // Au moins un caractère spécial
  ];
  
  validateRegex.forEach((regex) => {
    if (new RegExp(regex).test(signUpPassword)) {
      pwdCheck += 1;
    }
  });
  
  switch (pwdCheck) {
    case 0:
      setPwdStrength('');
      setPwdColor('transparent');
      break;
    case 1:
      setPwdStrength('Faible');
      setPwdColor('#DC143C');
      break;
    case 2:
      setPwdStrength('Faible');
      setPwdColor('#DC143C');
      break;
    case 3:
      setPwdStrength('Moyen');
      setPwdColor('#FFA500');
      break;
    case 4:
      setPwdStrength('Moyen');
      setPwdColor('#FFA500');
      break;
    case 5:
      setPwdStrength('Fort');
      setPwdColor('#9efd38');
      break;
    default:
      break;
  }
}, [signUpPassword]);

// Lors de l'inscription, email et password sont envoyés dans le store.
const handleSignup = () => {
  console.log('click')
  fetch(`${backend_address}/isExisting`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: signUpEmail, password: signUpPassword }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    if(!data.result) {
      setErrorSignup(data.error)
    } else {
      if (EMAIL_REGEX.test(signUpEmail) && (signUpPassword === signUpPassword2) && (pwdStrength === 'Fort')){

        setErrorSignup('')
        dispatch(signUp({ email: signUpEmail, password: signUpPassword }));
        setSignUpEmail('');
        setSignUpPassword('');
        setSignUpPassword2('');
        navigation.navigate('Localisation');
  
  }
    }
  })
}

const handleModal = () => {
    setModalVisible(true)
}

// log à partir du mot de passe et email (route users).
  const handleSignin = () => {
        fetch(`${backend_address}/connect`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: signInEmail, password: signInPassword }),
        }).then(response => response.json())
            .then(data => {
        console.log(data)
                if (data.result) {
                    dispatch(addToken(data.token));
                    dispatch(signUp({isCoach: data.isCoach, isValidate: data.isValidate}))
                    setSignInEmail('');
                    setSignInPassword('');
                    navigation.navigate('Home')
                }
            });
    }

return (
    <KeyboardAvoidingView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient
    colors={isDarkMode ? DARK_COLORS : LIGHT_COLORS}
    start={isDarkMode ? DarkStart : LightStart}
    end={isDarkMode ? DarkEnd : LightEnd}
    style={styles.background}
    >
        
      <ScrollView>
        <View style={styles.boximage}>
          <Image style={[styles.image, isDarkMode ? styles.darkPicture : styles.lightPicture]} source={isDarkMode ? require('../assets/logodark.png') : require('../assets/logolight2.png')} />
      
          <TextInput selectionColor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[ isDarkMode ? styles.darkInput : styles.lightInput]}
          placeholder="Email" onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail}  />

        <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>Le mot de passe doit contenir 8 caractères minimum, une majuscule, une minuscule, un chiffre et un caractère spécial</Text>
      <View style={styles.eye}>
            <TextInput selectionColor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
          placeholder="Mot de passe" onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword} secureTextEntry={isPasswordSecure}/>
          <TouchableOpacity >
             <Icon name={isPasswordSecure ? 'eye-slash': 'eye'} size={28} color='#F4A100'onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}/>
          </TouchableOpacity>
         
      </View>
    
        <Text style={[styles.text, {color: pwdColor, textAlign: 'left', fontWeight: 600}]}>{pwdStrength}</Text>
      <View style={styles.eye}>
        <TextInput selectionColor={'#FF6100'} placeholderTextColor={isDarkMode ? "#7B7B7B":"#7B7B7B"} style={[styles.inputP2, isDarkMode ? styles.darkInputMdp : styles.lightInputMdp]}
          placeholder="Confirmer le mot de passe" onChangeText={(value) => setSignUpPassword2(value)} value={signUpPassword2} secureTextEntry={isPasswordSecure} />
        {errorSignup && <Text style={{color: "#fff"}}>{errorSignup}</Text>}
        <TouchableOpacity >
             <Icon name={isPasswordSecure ? 'eye-slash': 'eye'} size={28} color='#F4A100'onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}/>
          </TouchableOpacity>
        </View>
         
          <TouchableOpacity style={[ isDarkMode ? styles.darkbutton : styles.lightbutton]}

          onPress={() => handleSignup()} activeOpacity={0.8}>
              <Text style={[ isDarkMode ? styles.darkTextButton : styles.lightTextButton]}>S'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => handleModal()} activeOpacity={0.8}>
              <Text style={[ isDarkMode ? styles.darksignin : styles.lightsignin]}>T'es déjà inscrit ? Let's go !</Text>
          </TouchableOpacity>
          <Modal  animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible); }}>
            <View style={styles.centeredView}>
              <LinearGradient
                colors={isDarkMode ? DARK_COLORS : LIGHT_COLORS}
                start={isDarkMode ? DarkStart : LightStart}
                end={isDarkMode ? DarkEnd : LightEnd}
                style={[ isDarkMode ? styles.darkmodalView : styles.lightmodalView]}>
                      <TextInput selectionColor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} placeholder="Email" onChangeText={(value) => setSignInEmail(value)} value={signInEmail} style={[ isDarkMode ? styles.darkInput2 : styles.lightInput2]} />
                      <TextInput selectionColor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} placeholder="Mot de passe" onChangeText={(value) => setSignInPassword(value)} value={signInPassword} style={[ isDarkMode ? styles.darkInput2 : styles.lightInput2]} secureTextEntry={true}/>
                      <TouchableOpacity onPress={() => handleSignin()} style={[ isDarkMode ? styles.darkButton2 : styles.lightButton2]} activeOpacity={0.8}>
                          <Text style={[ isDarkMode ? styles.darkTextButton : styles.lightTextButton]}>Se connecter</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setModalVisible(false)} style={[ isDarkMode ? styles.darkButton2 : styles.lightButton2]} activeOpacity={0.8}>
                          <Text style={[ isDarkMode ? styles.darkTextButton : styles.lightTextButton]}>Fermer</Text>
                      </TouchableOpacity>
              </LinearGradient>
              </View>
          </Modal>
        </View>
        </ScrollView>
       </LinearGradient>
    </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({

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
    backgroundColor: '#ffffff',
},
darkPicture:{
    // backgroundColor:"#2E2E2E",
},
lightPicture:{
    // backgroundColor: '#ffffff',
},
lightText: {
  color: '#000000'
},
darkText: {
  color: '#ffffff'
},

darkInputMdp:{
  marginTop: 10,
  fontSize : 15,
  backgroundColor: '#2E2E2E',
  width : "70%",
  margin : "3%",
  height: 40,
  borderRadius: 13,
  paddingLeft: 15,
  marginBottom: 10,
  fontStyle: 'italic',
  color: 'white',
},
lightInputMdp:{
  marginTop: 20,
  fontSize : 15,
  backgroundColor: '#E8E8E8',
  width : "70%",
  margin : "3%",
  height: 40,
  borderRadius: 13,
  paddingLeft: 15,
  fontStyle: 'italic',
  color: 'black', 
},
eye :{
  flexDirection: 'row',
  alignItems: 'center',
},
text: {
  width: '80%',
  paddingTop: 10
},
input: { 
},
text: {
  width: '80%',
  paddingTop: 10

},
input: { 
},
darkInput:{
  marginTop: 10,
  fontSize : 15,
  backgroundColor: '#2E2E2E',
  width : "70%",
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
  width : "70%",
  margin : "3%",
  height: 40,
  borderRadius: 13,
  paddingLeft: 15,
  marginBottom: 10, 
  color: 'black', 
},
darkImg:{
    backgroundColor: '#2E2E2E',
    borderColor: "#F4A100",
},
lightImg:{
    backgroundColor: '#ffffff',
    borderColor: "#E8E8E8",

},
darkIn:{
 backgroundColor: '#2E2E2E',
},
lightIn:{
backgroundColor: '#ffffff',
},

background:{
  width: "100%",
  height: "100%",
  },

  image:{
    width: 200,
    height: 200,
    marginTop: 40,
    borderRadius: 200,
    marginBottom: 30,
  },
    container: {
        flex: 1
    },
    boximage:{
      alignItems: 'center',
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
  darksignin: {
    fontSize : 18,
    marginTop: 50,
    marginBottom: 50,
    color : '#AAAAAA',
    fontWeight: 'bold',
    // backgroundColor: '#58FD0B',
    textShadowColor: 'rgba(255, 165, 0, 1)',  //'rgba(255, 165, 0, 1)', Couleur de l'ombre (noir avec opacité 0.75)
    textShadowOffset: { width: 0.5, height: 0.5 }, // Décalage de l'ombre (effet relief)
    textShadowRadius: 20, // Rayon de l'ombre (effet relief)
  },
  lightsignin: {
    fontSize : 18,
    marginTop: 50,
    marginBottom: 50,
    color : 'black',
    fontWeight: 'bold',
    // backgroundColor: '#58FD0B',
    textShadowColor: 'rgba(255, 100, 0, 0.5)',  //'rgba(255, 165, 0, 1)', Couleur de l'ombre (noir avec opacité 0.75)
    textShadowOffset: { width: 0.5, height: 0.5 }, // Décalage de l'ombre (effet relief)
    textShadowRadius: 1, // Rayon de l'ombre (effet relief)
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  lightmodalView: {
    padding: 50,
    alignItems: 'center',
    borderColor: "black",
    borderWidth: 2,        
    borderRadius: 25,
    width: 300,
  },
  darkmodalView: {
    padding: 50,
    alignItems: 'center',
    borderColor: "white",
    borderWidth: 1,        
    borderRadius: 25,
    width: 300,
  },
  darkInput2:{
    marginTop: 20,
    fontSize : 15,
    backgroundColor: '#2E2E2E',
    width : 200,
    height: 40,
    margin : "2%",
    borderRadius: 13,
    paddingLeft: 15,
    marginBottom: 10,
    color: 'white',  
  },
  lightInput2: {
    marginTop: 20,
    fontSize : 15,
    backgroundColor: '#E8E8E8',
    width : 200,
    height: 40,
    margin : "2%",
    borderRadius: 13,
    paddingLeft: 15,
    marginBottom: 10,
    color: 'black',
  },
  darkButton2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 50,
    borderRadius: 25,
    marginTop: 20,
    elevation: 15,
    backgroundColor: '#BF5000',
    shadowColor: '#FF6100',
    shadowOffset: { width: 50, height: 5,},
    shadowOpacity: 0.0001,
  },
  lightButton2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 50,
    borderRadius: 25,
    marginTop: 20,
    elevation: 15,
    backgroundColor: '#FF711A',
    shadowColor: '#FF6100',
    shadowOffset: { width: 50, height: 5,},
    shadowOpacity: 0.0001,
  }
})