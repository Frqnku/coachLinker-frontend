import { StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react'

export default function ConnexionScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSignup = () => {

        navigation.navigate('Localisation')
        console.log('hello', email)
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
            <TextInput placeholder="Mot de passe" onChangeText={(value) => setPassword(value)} value={password} style={styles.input} />
            <TouchableOpacity onPress={() => handleSignup()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>S'inscrire</Text>
            </TouchableOpacity>
            
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        marginTop: 25,
        borderBottomColor: '#ec6e5b',
        borderBottomWidth: 1,
        fontSize: 18,
      },
})