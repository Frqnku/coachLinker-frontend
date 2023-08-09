import React from 'react';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import TimePicker from '../components/TimePicker';
import { updatePlanning } from '../reducers/coachs';
import GoodMorning from '../components/GoodMorning';
import {StyleSheet, Pressable, KeyboardAvoidingView, Image, TextInput, View, Text, ScrollView, TouchableOpacity} from 'react-native';

import { backend_address } from '../backendAddress';


export default function AgendaScreen() {
    const isDarkMode = useSelector(state => state.darkMode.value)
    const planning = useSelector(state => state.coachs.value.planning)
    const token = useSelector(state => state.users.value.token);
  /*   const user = use */
  console.log(planning)

  const handleValidate = async () => {

    // Fetch complete planning data from Redux store
    const completePlanningData = Object.keys(planning).map(day => {
      return {
        [planning[day].day]: planning[day].day,
        start: planning[day].start,
        end: planning[day].end
      };
    });

    // Prepare request body
    const requestBody = {
      token: token,
      planning: completePlanningData
    };


      // Send data to backend
      const response = await fetch(`${backend_address}/plannings/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      // Handle response as needed
      const data = await response.json();
      console.log('Response from backend:', data);
  }


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
        
    <View style={[styles.block, isDarkMode ? styles.darkIn : styles.lightIn, styles.marginTop]}>
        <Text style={[styles.texte, isDarkMode ? styles.darkText : styles.lightText]}>Lundi</Text>
        <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <TimePicker name='Lundi'/>
            </View>

       
    </View>
    <View style={[styles.block, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={[styles.texte, isDarkMode ? styles.darkText : styles.lightText]}>Mardi</Text>
        <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <TimePicker name='Mardi'/>
            </View>
      
        </View>
    <View style={[styles.block, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={[styles.texte, isDarkMode ? styles.darkText : styles.lightText]}>Mercredi</Text>
        <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <TimePicker name='Mercredi'/>
            </View>
          
        </View>
    <View style={[styles.block, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={[styles.texte, isDarkMode ? styles.darkText : styles.lightText]}>Jeudi</Text>
        <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <TimePicker name='Jeudi'/>
            </View>
          
        </View>
    <View style={[styles.block, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={[styles.texte, isDarkMode ? styles.darkText : styles.lightText]}>Vendredi</Text>
        <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <TimePicker name='Vendredi'/>
            </View>
           
        </View>
    <View style={[styles.block, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={[styles.texte, isDarkMode ? styles.darkText : styles.lightText]}>Samedi</Text>
        <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <TimePicker name='Samedi'/>
            </View>
           
        </View>
    <View style={[styles.block, isDarkMode ? styles.darkIn : styles.lightIn]}>
        <Text style={[styles.texte, isDarkMode ? styles.darkText : styles.lightText]}>Dimanche</Text>
        <View style={[styles.blocks, isDarkMode ? styles.darkIn : styles.lightIn]}>
                <TimePicker name='Dimanche'/>
            </View>
           
        </View>

        <TouchableOpacity style={styles.btnValidate} onPress={handleValidate}>
            <Text style={[styles.darkText, styles.fontWeight]}>Valider</Text>
        </TouchableOpacity>
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
            color :"#fff",
        },
        lightText :{
            color: '#505050',
        },
        btnValidate: {
            width: '80%',
            marginVertical: 25,
            padding: 15,
            backgroundColor: '#FF711A',
            borderRadius: 5,
            alignItems: 'center'
        },
        fontWeight: {
            fontWeight: 500
          },
          marginTop: {
            marginTop: 60
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
        marginTop: 20,
        width: "90%",
        backgroundColor:"#fff",
        borderRadius: 5,
        paddingTop: 10
    },
    blocks: {
        flexDirection: 'row',
/*         marginTop: "10%",
        marginLeft: "5%",
        width: "90%", */
        backgroundColor:"#fff",
        borderRadius: 5,
    },
    texte: {
        fontSize: 20,
        
    },
})