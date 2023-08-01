import { StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity, KeyboardAvoidingView, Modal } from 'react-native';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/people';

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
					setSignInEmail('');
					setSignInPassword('');
                    navigation.navigate('Localisation')
                    console.log("signin", dispatch(login({ email: signInEmail, token: data.token })))
				}
			});
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TextInput placeholder="Email" onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail} style={styles.input} />
            <TextInput placeholder="Mot de passe" onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword} style={styles.input} secureTextEntry={true}/>
            <TouchableOpacity onPress={() => handleSignup()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleModal()} activeOpacity={0.8}>
                <Text style={styles.signin}>Déjà inscrit ?</Text>
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
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize : 20,
        backgroundColor: "#F2F2F2",
        width : "80%",
        margin : "4%",
        height: 40,
        borderRadius: 5,
        paddingLeft: 5
      },
      button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: 50,
        backgroundColor: '#F4A100',
        borderRadius: 5,
        marginTop: 15
      },
      textButton: {
        fontSize : 20,
        color: '#ffffff',
      },
      signin: {
        fontSize : 20,
        marginTop: 50
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
        backgroundColor: '#F4A100',
        borderRadius: 5,
        marginTop: 15
      }
})