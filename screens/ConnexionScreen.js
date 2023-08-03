import { StyleSheet, Text, View, Image, Pressable, TextInput, TouchableOpacity, KeyboardAvoidingView, Modal } from 'react-native';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/people';
import { LinearGradient } from 'expo-linear-gradient';
import { signUp} from '../reducers/users';
import users from '../reducers/users';

export default function ConnexionScreen({ navigation }) {
    const dispatch = useDispatch();
    
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpPassword2, setSignUpPassword2] = useState('')
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    
    const isDarkMode = useSelector(state => state.darkMode.value)


    const DARK_COLORS = ["black", "#FF6100"];
    const LIGHT_COLORS = ["#FFF8EB", "#FF6100"];
    const DarkStart = {x : 0.4, y : 0.4};
    const DarkEnd = {x : -0.3, y : -0.3};
    const LightStart = {x : 0.6, y : 0.4};
    const LightEnd = {x : 0.3, y : 0.1};


    // retiré : const handleSignup = () => {
    //   fetch('https://coach-linker-backend.vercel.app/users/signup', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({ email: signUpEmail, password: signUpPassword }),
		// }).then(response => response.json())
		// 	.then(data => {
		// 		if (data.result) {
		// 			dispatch(login({ email: signUpEmail, token: data.token }));
		// 			setSignUpEmail('');
		// 			setSignUpPassword('');
    //                 navigation.navigate('Localisation')
    //                 console.log(dispatch(login({ email: signUpEmail, token: data.token })))
		// 		}
		// 	});
    // }

    // Lors de l'inscription, email et password sont envoyés dans le store.
    const handleSignup = () => {
      if(signUpPassword===signUpPassword2){
      dispatch(signUp({ email: signUpEmail, password: signUpPassword }));
      setSignUpEmail('');
      setSignUpPassword('');
      setSignUpPassword2('');
      navigation.navigate('Localisation');
    };}

    const handleModal = () => {
        setModalVisible(true)
    }


  const handleSignin = () => {
        fetch('https://coach-linker-backend.vercel.app/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: signInEmail, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ email: signInEmail, token: data.token }));
          setSignInEmail('');
					setSignInPassword('');
                  
                  navigation.navigate('TabNavigator')
				}
			});
    }


    // const handleSignin = () => {
    //   dispatch(Signin({ email: signInEmail, password: signInPassword }));
    //   setSignInEmail('');
    //   setSignInPassword('');
    //   navigation.navigate('TabNavigator')
    // };




    return (
        <KeyboardAvoidingView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <LinearGradient
        colors={isDarkMode ? DARK_COLORS : LIGHT_COLORS}
        start={isDarkMode ? DarkStart : LightStart}
        end={isDarkMode ? DarkEnd : LightEnd}
        style={styles.background}
        >
            <View style={styles.boximage}>
            <Image style={[styles.image, isDarkMode ? styles.darkPicture : styles.lightPicture]} source={require('../assets/logodark.png')} />
        
            <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
             placeholder="Email" onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail}  />

            <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
              placeholder="Mot de passe" onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword} secureTextEntry={true}/>
             
            <TextInput placeholderTextColor={isDarkMode ? "#7B7B7B":"#7B7B7B"} style={[styles.inputP2, isDarkMode ? styles.darkInputP2 : styles.lightInputP2]}
              placeholder="Confirmer le mot de passe" onChangeText={(value) => setSignUpPassword2(value)} value={signUpPassword2} secureTextEntry={true}/>

            <TouchableOpacity style={[styles.button, isDarkMode ? styles.darkbutton : styles.lightbutton]}

            onPress={() => handleSignup()} activeOpacity={0.8}>
                <Text style={styles.textButton}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => handleModal()} activeOpacity={0.8}>
                <Text style={[styles.signin, isDarkMode ? styles.darksignin : styles.lightsignin]}>T'es déjà inscrit ? Let's go !</Text>
            </TouchableOpacity>
            <Modal  animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible); }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput placeholder="Email" onChangeText={(value) => setSignInEmail(value)} value={signInEmail} style={styles.input2} />
                        <TextInput placeholder="Mot de passe" onChangeText={(value) => setSignInPassword(value)} value={signInPassword} style={styles.input2} secureTextEntry={true}/>
                        <TouchableOpacity onPress={() => handleSignin()} style={styles.button2} activeOpacity={0.8}>
                            <Text style={styles.textButton}>Se connecter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button2} activeOpacity={0.8}>
                            <Text style={styles.textButton}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            </View>
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
    backgroundColor: '#fff',
},
darkPicture:{
    // backgroundColor:"#2E2E2E",
},
lightPicture:{
    backgroundColor: '#fff',
},
inputP2: {
  
},
darkInputP2:{
  marginTop: 20,
  fontSize : 15,
  backgroundColor: '#2E2E2E',
  width : "80%",
  margin : "3%",
  height: 40,
  borderRadius: 13,
  paddingLeft: 15,
  marginBottom: 10,
  fontStyle: 'italic',
    
},
lightInputP2:{
  marginTop: 25,
  fontSize : 15,
  backgroundColor: '#E8E8E8',
  width : "80%",
  margin : "4%",
  height: 40,
  borderRadius: 13,
  paddingLeft: 5, 
},

input: { 
},
darkInput:{
  marginTop: 20,
  fontSize : 15,
  backgroundColor: '#2E2E2E',
  width : "80%",
  margin : "3%",
  height: 40,
  borderRadius: 13,
  paddingLeft: 15,
  marginBottom: 10,
    
},
lightInput:{
  marginTop: 25,
  fontSize : 15,
  backgroundColor: '#E8E8E8',
  width : "80%",
  margin : "4%",
  height: 40,
  borderRadius: 13,
  paddingLeft: 5, 
},
darkImg:{
    backgroundColor: '#2E2E2E',
    borderColor: "#F4A100",
},
lightImg:{
    backgroundColor: '#fff',
    borderColor: "#E8E8E8",
    
},
darkIn:{
 backgroundColor: '#2E2E2E',
},
lightIn:{
backgroundColor: '#fff',
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
        flex: 1,
    },
    boximage:{
      alignItems: 'center',
      }, 

      lightbutton: {
        
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
      textButton: {
        fontSize : 15,
        color: '#2E2E2E',
        fontWeight: 'bold',
      },
      darksignin: {
        fontSize : 22,
        marginTop: 50,
        color : 'white',
        fontWeight: 'bold',
        // backgroundColor: '#58FD0B',
        textShadowColor: 'rgba(255, 165, 0, 1)',  //'rgba(255, 165, 0, 1)', Couleur de l'ombre (noir avec opacité 0.75)
        textShadowOffset: { width: 0.5, height: 0.5 }, // Décalage de l'ombre (effet relief)
        textShadowRadius: 20, // Rayon de l'ombre (effet relief)
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#D9D9D9',
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
        borderRadius: 5,
        marginTop: 15,
        backgroundColor: '#BF5000',
        shadowOffset: {
          width: 0,
          height: 5,}
      }
})