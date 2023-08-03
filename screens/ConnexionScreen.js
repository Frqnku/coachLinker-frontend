import { StyleSheet, Text, View, Image, Pressable, TextInput, TouchableOpacity, KeyboardAvoidingView, Modal } from 'react-native';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/people';
import { LinearGradient } from 'expo-linear-gradient';

export default function ConnexionScreen({ navigation }) {
    const dispatch = useDispatch();
    
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const handleSignup = () => {
        fetch('https://coach-linker-backend.vercel.app/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: signUpEmail, password: signUpPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ email: signUpEmail, token: data.token }));
					setSignUpEmail('');
					setSignUpPassword('');
                    navigation.navigate('Localisation')
                    console.log(dispatch(login({ email: signUpEmail, token: data.token })))
				}
			});
    }

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
			        
          // dispatch(updateStudent({ 
          //   name: studentName, 
          //   firstname: studentFirstname,
          //   dateOfBirth: studentDateOfBirth,
          //   myDescription: studentMyDescription,
          //   image: studentImage 
          // }));     

          setSignInEmail('');
					setSignInPassword('');
                  
                  navigation.navigate('TabNavigator')
				}
			});
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <LinearGradient 
              colors={['black','#FF6100']} 
              start={{
                x: 0.2,
                y: 0.3,
              }}
              end={{
                x: -0.3,
                y: -0.3
              }} style={styles.box}>
                 <View>
                 <Image style={styles.image} source={require('../assets/logowhite.png')} />
                 </View>
            <TextInput placeholderTextColor={"#505050"} placeholder="Email" onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail} style={styles.input} />
            <TextInput placeholderTextColor={"#505050"}  placeholder="Mot de passe" onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword} style={styles.input} secureTextEntry={true}/>
            <TouchableOpacity onPress={() => handleSignup()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleModal()} activeOpacity={0.8}>
                <Text style={styles.signin}>T'es déjà inscrit ? Let's go !</Text>
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
           </LinearGradient>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

  image:{
    width: 250,
    height: 250,
    marginTop: 45,
    borderRadius: 100,
  },
    container: {
        flex: 1,
    },
    box:{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      }, 
    input: {
        marginTop: 25,
        fontSize : 20,
        backgroundColor: '#2E2E2E',
        width : "80%",
        margin : "4%",
        height: 40,
        borderRadius: 15,
        paddingLeft: 5,
      },
      button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: 40,
        backgroundColor: '#BF5000',
        borderRadius: 25,
        marginTop: 15,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowColor: 'red', 
      },
      textButton: {
        fontSize : 15,
        color: 'black',
        fontWeight: 'bold',
      },
      signin: {
        fontSize : 22,
        marginTop: 50,
        color : 'black',
        fontWeight: 'bold',
        // backgroundColor: '#58FD0B',
        textShadowColor: 'white',  //'rgba(255, 165, 0, 1)', Couleur de l'ombre (noir avec opacité 0.75)
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