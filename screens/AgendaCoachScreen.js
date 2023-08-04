import React from 'react';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAvoidingView, StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TimePicker from '../components/TimePicker';
import GoodMorning from '../components/GoodMorning';
import React from 'react'
import {StyleSheet, Pressable, KeyboardAvoidingView, Image, TextInput, View, Text, ScrollView, TouchableOpacity} from 'react-native';

export default function AgendaScreen() {
    const isDarkMode = useSelector(state => state.darkMode.value)

    const DARK_COLORS = ["black", "#FF6100"];
    const LIGHT_COLORS = ["#FFF8EB", "#FF6100"];
    const DarkStart = {x : 0.4, y : 0.4};
    const DarkEnd = {x : -0.3, y : -0.3};
    const LightStart = {x : 0.6, y : 0.4};
    const LightEnd = {x : 0.3, y : 0.1};

    return (
<KeyboardAvoidingView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <LinearGradient colors={isDarkMode ? DARK_COLORS : LIGHT_COLORS}
        start={isDarkMode ? DarkStart : LightStart}
          end={isDarkMode ? DarkEnd : LightEnd}
        style={styles.background}
        >
    <ScrollView  contentContainerStyle={styles.scrollContainer}showsVerticalScrollIndicator={false}>
        
    <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={styles.texte}>Lundi</Text>
            <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <TimePicker/>
                <Text style={[styles.inputDebut, isDarkMode ? styles.darkInput : styles.lightInput]}>Début :</Text>
                <TimePicker/>
                <Text style={[styles.inputFin, isDarkMode ? styles.darkInput : styles.lightInput]}>Fin :</Text>
            </View>
       
    </View>
    <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={styles.texte}>Mardi</Text>
        <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <TimePicker/>
                <Text style={[styles.inputDebut, isDarkMode ? styles.darkInput : styles.lightInput]}>Début :</Text>
                <TimePicker/>
                <Text style={[styles.inputFin, isDarkMode ? styles.darkInput : styles.lightInput]}>Fin :</Text>
            </View>
        </View>
    <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={styles.texte}>Mercredi</Text>
        <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <TimePicker/>
                <Text style={[styles.inputDebut, isDarkMode ? styles.darkInput : styles.lightInput]}>Début :</Text>
                <TimePicker/>
                <Text style={[styles.inputFin, isDarkMode ? styles.darkInput : styles.lightInput]}>Fin :</Text>
            </View>
        </View>
    <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={styles.texte}>Jeudi</Text>
        <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <TimePicker/>
                <Text style={[styles.inputDebut, isDarkMode ? styles.darkInput : styles.lightInput]}>Début :</Text>
                <TimePicker/>
                <Text style={[styles.inputFin, isDarkMode ? styles.darkInput : styles.lightInput]}>Fin :</Text>
            </View>
        </View>
    <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={styles.texte}>Vendredi</Text>
        <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <TimePicker/>
                <Text style={[styles.inputDebut, isDarkMode ? styles.darkInput : styles.lightInput]}>Début :</Text>
                <TimePicker/>
                <Text style={[styles.inputFin, isDarkMode ? styles.darkInput : styles.lightInput]}>Fin :</Text>
            </View>
        </View>
    <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={styles.texte}>Samedi</Text>
        <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <TimePicker/>
                <Text style={[styles.inputDebut, isDarkMode ? styles.darkInput : styles.lightInput]}>Début :</Text>
                <TimePicker/>
                <Text style={[styles.inputFin, isDarkMode ? styles.darkInput : styles.lightInput]}>Fin :</Text>
            </View>
        </View>
    <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={styles.texte}>Dimanche</Text>
        <View style={[styles.inputs, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <TimePicker/>
                <Text style={[styles.inputDebut, isDarkMode ? styles.darkInput : styles.lightInput]}>Début :</Text>
                <TimePicker/>
                <Text style={[styles.inputFin, isDarkMode ? styles.darkInput : styles.lightInput]}>Fin :</Text>
            </View>
        </View>
    </ScrollView>
        </LinearGradient>
</KeyboardAvoidingView>
      
    );
}

const styles = StyleSheet.create({
    container: {
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
    darkBg :{
        backgroundColor: 'black',
    },
    darkInput:{
        backgroundColor: '#505050',
        borderColor: "#505050",
        
    },
    lightInput:{
        backgroundColor: '#E8E8E8',
        borderColor: "#E8E8E8",
        
    },
    darkIn:{
        backgroundColor: '#2E2E2E',
       },
       lightIn:{
       backgroundColor: '#fff',
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
    inputDebut: {
        fontSize : 20,
        borderColor: "#E8E8E8",
        borderWidth: 2,
        width : "80%",
        margin : "4%",
        height: 40,
        paddingLeft: 5,
        borderRadius: 5,
       
    },
    
    inputFin :{
        fontSize : 20,
        borderColor: "#E8E8E8",
        borderWidth: 2,
        width : "80%",
        margin : "4%",
        height: 40,
        paddingLeft: 5,
        borderRadius: 5,
    },
    texte: {
        fontSize: 40,
    },
})