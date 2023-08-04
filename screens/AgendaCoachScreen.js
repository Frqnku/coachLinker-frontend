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
    
    const [startDay, setstartDay] = useState('')
    const [dayOfWeek, setDayOfWeek] = useState('')
    const [endDay, setEndDay] = useState('')
   

//addPlanning à mettre dans reducers
      // log à partir du mot de passe et email (route users).
  const handleValidate = () => {
    fetch('https://coach-linker-backend.vercel.app/plannings/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token:data.token}),
    }).then(response => response.json())
        .then(data => { console.log(data)
            if (data.result) {
                // Le planning a été créé avec succès, vous pouvez accéder aux détails du planning ici
                console.log('Planning créé avec succès:', data.data);
                dispatch(addPlanning({dayOfWeek:setDayOfWeek, startDay:setstartDay, endDay: setEndDay}));
                navigation.navigate("TabNavigator",{screen : "Menu"})
            } else {
                // Une erreur s'est produite lors de la création du planning, vous pouvez afficher le message d'erreur ici.
                console.log('Erreur lors de la création du planning:', data.error);
            }
        })
        .catch(error => {
            // En cas d'erreur lors de la requête
            console.error('Erreur lors de la requête :', error);
        });
    };   


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
                <ScrollView contentContainerStyle={styles.scroll}>
                    <TouchableOpacity style={styles.boxdays}>
                        <Text style={styles.day}>Lundi</Text>
                        <TextInput selectioncolor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                        placeholder="horaire de début" onChangeText={(value) => setStartDay(value)} value={startDay} secureTextEntry={true}
                       />
                         <TextInput selectioncolor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                        placeholder="horaire de fin" onChangeText={(value) => setEndDay(value)} value={endDay} secureTextEntry={true}
                       />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.boxdays}>
                        <Text style={styles.day}>Mardi</Text>
                        <TextInput selectioncolor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                        placeholder="horaire de début" onChangeText={(value) => setStartDay(value)} value={startDay} secureTextEntry={true}
                       />
                         <TextInput selectioncolor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                        placeholder="horaire de fin" onChangeText={(value) => setEndDay(value)} value={endDay} secureTextEntry={true}
                       />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.boxdays}>
                        <Text style={styles.day}>Mercredi</Text>
                        <TextInput selectioncolor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                        placeholder="horaire de début" onChangeText={(value) => setStartDay(value)} value={startDay} secureTextEntry={true}
                       />
                         <TextInput selectioncolor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                        placeholder="horaire de fin" onChangeText={(value) => setEndDay(value)} value={endDay} secureTextEntry={true}
                       />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.boxdays}>
                        <Text style={styles.day}>Jeudi</Text>
                        <TextInput selectioncolor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                        placeholder="horaire de début" onChangeText={(value) => setStartDay(value)} value={startDay} secureTextEntry={true}
                       />
                         <TextInput selectioncolor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                        placeholder="horaire de fin" onChangeText={(value) => setEndDay(value)} value={endDay} secureTextEntry={true}
                       />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.boxdays}>
                        <Text style={styles.day}>Vendredi</Text>
                        <TextInput selectioncolor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                        placeholder="horaire de début" onChangeText={(value) => setStartDay(value)} value={startDay} secureTextEntry={true}
                       />
                         <TextInput selectioncolor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                        placeholder="horaire de fin" onChangeText={(value) => setEndDay(value)} value={endDay} secureTextEntry={true}
                       />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.boxdays}>
                        <Text style={styles.day}>Samedi</Text>
                        <TextInput selectioncolor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                        placeholder="horaire de début" onChangeText={(value) => setStartDay(value)} value={startDay} secureTextEntry={true}
                       />
                         <TextInput selectioncolor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                        placeholder="horaire de fin" onChangeText={(value) => setEndDay(value)} value={endDay} secureTextEntry={true}
                       />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.boxdays}>
                        <Text style={styles.day}>Dimanche</Text>
                        <TextInput selectioncolor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                        placeholder="horaire de début" onChangeText={(value) => setStartDay(value)} value={startDay} secureTextEntry={true}
                       />
                         <TextInput selectioncolor={'#FF6100'} placeholderTextColor={isDarkMode ? "#AAAAAA":"#7B7B7B"} style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                        placeholder="horaire de fin" onChangeText={(value) => setEndDay(value)} value={endDay} secureTextEntry={true}
                       />
                    </TouchableOpacity>
                 
                </ScrollView>

                <TouchableOpacity onPress={() => handleValidate()} style={styles.button2} activeOpacity={0.8}>
                            <Text style={styles.textButton}>Validerr</Text>
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
        marginTop: 15,
        fontSize : 15,
        backgroundColor: '#2E2E2E',
        width : "80%",
        margin : "3%",
        height: 40,
        borderRadius: 13,
        paddingLeft: 15,
        marginBottom: 10, 
        color:"white",  
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
    scroll :{

    },
    boxdays:{

        },
    day :{

        },
})