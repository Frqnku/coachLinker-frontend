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
        <LinearGradient
        colors={isDarkMode ? DARK_COLORS : LIGHT_COLORS}
        start={isDarkMode ? DarkStart : LightStart}
        end={isDarkMode ? DarkEnd : LightEnd}
        style={styles.background} >
            <GoodMorning/>
            <Text>AgendaScreen</Text> 

            {/* afficher l'écran de disponibilités modifiables */}

                <TouchableOpacity style={styles.boxdays}>
                    <Text style={styles.sports}>Lundi</Text>
                    <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="start"  />
                    <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="End" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.boxdays}>
                    <Text style={styles.sports}>Mardi</Text>
                    <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="start"  />
                    <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="End" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.boxdays}>
                    <Text style={styles.sports}>Mercredi</Text>
                    <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="start"  />
                    <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="End" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.boxdays}>
                    <Text style={styles.sports}>Jeudi</Text>
                    <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="start"  />
                    <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="End" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.boxdays}>
                    <Text style={styles.sports}>Vendredi</Text>
                    <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="start"  />
                    <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="End" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.boxdays}>
                    <Text style={styles.sports}>Samedi</Text>
                    <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="start"  />
                    <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="End" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.boxdays}>
                    <Text style={styles.sports}>Dimanche</Text>
                    <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="start"  />
                    <TextInput placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="End" />
                </TouchableOpacity>

       </LinearGradient>   
    </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container : {
        flex :1 ,
        backgroundColor: '#E8E8E8',
        justifyContent: "space-evenly",   
        },  
    background:{
          width: "100%",
          height: "100%",
        },
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
    darkIn:{
        backgroundColor: '#2E2E2E',
        },
    lightIn:{
        backgroundColor: '#fff',
        },
})