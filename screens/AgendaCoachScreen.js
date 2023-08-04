import React from 'react';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import TimePicker from '../components/TimePicker';
import GoodMorning from '../components/GoodMorning';
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
        
    <View style={[styles.block, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={[styles.texte, isDarkMode ? styles.darkText : styles.lightText]}>Lundi</Text>
        <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <Text style={[styles.Debut, isDarkMode ? styles.darkBlock: styles.lightBlock]}>Début :</Text>
                <TimePicker/>
            </View>
            <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <Text style={[styles.Fin, isDarkMode ? styles.darkBlock : styles.lightBlock]}>Fin :</Text>
                <TimePicker/>
            </View>
       
    </View>
    <View style={[styles.block, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={[styles.texte, isDarkMode ? styles.darkText : styles.lightText]}>Mardi</Text>
        <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <Text style={[styles.Debut, isDarkMode ? styles.darkBlock: styles.lightBlock]}>Début :</Text>
                <TimePicker/>
            </View>
            <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <Text style={[styles.Fin, isDarkMode ? styles.darkBlock : styles.lightBlock]}>Fin :</Text>
                <TimePicker/>
            </View>
        </View>
    <View style={[styles.block, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={[styles.texte, isDarkMode ? styles.darkText : styles.lightText]}>Mercredi</Text>
        <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <Text style={[styles.Debut, isDarkMode ? styles.darkBlock: styles.lightBlock]}>Début :</Text>
                <TimePicker/>
            </View>
            <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <Text style={[styles.Fin, isDarkMode ? styles.darkBlock : styles.lightBlock]}>Fin :</Text>
                <TimePicker/>
            </View>
        </View>
    <View style={[styles.block, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={[styles.texte, isDarkMode ? styles.darkText : styles.lightText]}>Jeudi</Text>
        <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <Text style={[styles.Debut, isDarkMode ? styles.darkBlock: styles.lightBlock]}>Début :</Text>
                <TimePicker/>
            </View>
            <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <Text style={[styles.Fin, isDarkMode ? styles.darkBlock : styles.lightBlock]}>Fin :</Text>
                <TimePicker/>
            </View>
        </View>
    <View style={[styles.block, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={[styles.texte, isDarkMode ? styles.darkText : styles.lightText]}>Vendredi</Text>
        <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <Text style={[styles.Debut, isDarkMode ? styles.darkBlock: styles.lightBlock]}>Début :</Text>
                <TimePicker/>
            </View>
            <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <Text style={[styles.Fin, isDarkMode ? styles.darkBlock : styles.lightBlock]}>Fin :</Text>
                <TimePicker/>
            </View>
        </View>
    <View style={[styles.block, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={[styles.texte, isDarkMode ? styles.darkText : styles.lightText]}>Samedi</Text>
        <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <Text style={[styles.Debut, isDarkMode ? styles.darkBlock: styles.lightBlock]}>Début :</Text>
                <TimePicker/>
            </View>
            <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <Text style={[styles.Fin, isDarkMode ? styles.darkBlock : styles.lightBlock]}>Fin :</Text>
                <TimePicker/>
            </View>
        </View>
    <View style={[styles.block, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={[styles.texte, isDarkMode ? styles.darkText : styles.lightText]}>Dimanche</Text>
        <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <Text style={[styles.Debut, isDarkMode ? styles.darkBlock: styles.lightBlock]}>Début :</Text>
                <TimePicker/>
            </View>
            <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <Text style={[styles.Fin, isDarkMode ? styles.darkBlock : styles.lightBlock]}>Fin :</Text>
                <TimePicker/>
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
        darkText :{
            color :"#F4A100",
        },
        lightText :{
            color: '#505050',
        },
    darkBg :{
        backgroundColor: 'black',
    },
    darkBlock:{
        backgroundColor: '#505050',
        borderColor: "#505050",
        
    },
    lightBlock:{
        backgroundColor: '#E8E8E8',
        borderColor: "#E8E8E8",
        
    },
    darkIn:{
        backgroundColor: '#2E2E2E',
       },
       lightIn:{
       backgroundColor: '#fff',
       },
       block: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: "20%",
        marginLeft: "2%",
        width: "90%",
        backgroundColor:"#fff",
        borderRadius: 5,
     
    },
    blocks: {
        flexDirection: 'row',
        marginTop: "10%",
        marginLeft: "5%",
        width: "90%",
        backgroundColor:"#fff",
        borderRadius: 5,
    },

   Debut: {
        fontSize : 20,
        width : "25%",
        margin : "2%",
        height: 30,
        paddingLeft: 10,
        borderRadius: 5,
       
    },
    
    Fin :{
        fontSize : 20,
        width : "25%",
        margin : "2%",
        height: 30,
        paddingLeft: 25,
        borderRadius: 5,
    },
    texte: {
        fontSize: 40,
        
    },
})