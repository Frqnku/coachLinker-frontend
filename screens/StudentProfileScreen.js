import React from 'react'
import {KeyboardAvoidingView, Image, TextInput, View, StyleSheet} from 'react-native';

export default function StudentProfileScreen() {
  return (
<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
     <Image style={styles.image} source={require('../assets/retour.png')} />
    <View>
        <Image style={styles.image} source={require('../assets/photo.jpeg')} />
        <Image style={styles.image} source={require('../assets/crayon.png')} />
    </View>
    <View>
        <TextInput placeholder="Nom" style={styles.input} />
        <TextInput placeholder="Prénom" style={styles.input} />
        <TextInput placeholder="Date de naissance" style={styles.input} />
    </View>
    <View>
        <TextInput placeholder="A propos de moi" style={styles.input} />

    </View>
    

      
</KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
    container : {
        flex :1 ,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

