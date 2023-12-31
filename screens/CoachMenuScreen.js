import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import GoodMorning from '../components/GoodMorning';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addBooking } from '../reducers/booking';
import moment from 'moment';

import { backend_address } from '../backendAddress';


export default function CoachMenuScreen() {
    const isDarkMode = useSelector(state => state.darkMode.value);
    const dispatch = useDispatch();
    const token = useSelector(state => state.users.value.token)
    const bookCoach = useSelector(state => state.booking.value.bookings)

    useEffect(() => {  
      fetch(`${backend_address}/bookings/coach`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({token: token})
        })
          .then(response => response.json())
          .then(data => {
            console.log('bookingscoach', data.bookings)
              
            dispatch(addBooking({token: token, bookings: data.bookings}))
            console.log('testbookingcoach', dispatch(addBooking({token: token, bookings: data.bookings})))
          });
      }, []);

      const newBookCoach = bookCoach.map((data, i) => {
        const dateNaissanceStr = data.studentID.dateOfBirth; // Date de naissance en tant que chaîne de caractères
        const dateNaissance = moment(dateNaissanceStr, "DD/MM/YYYY"); // Convertir la chaîne en objet de date à l'aide de moment
        const dateAujourdhui = moment(); // Obtenir la date d'aujourd'hui
        const age = dateAujourdhui.diff(dateNaissance, 'years'); // Calculer la différence entre les deux dates pour obtenir l'âge

        return(
        <View key={i}>
          <View style={[styles.general, isDarkMode ? styles.darkGeneral : styles.lightGeneral]}>
            <Image source={{uri:data.studentID.image}} style={styles.left}/>
            <View style={styles.generalMid}>
              <View style={styles.mid1}>
                  <Text style={isDarkMode ? styles.darkFirstname : styles.lightFirstname}>{data.studentID.firstname}, <Text style={isDarkMode ? styles.darkAge : styles.lightAge}>{age} ans</Text> </Text>
                  <Text style={styles.sport}>{data.selectedSport}</Text>
              </View>
              <View style={styles.mid2}>
                  <Text style={isDarkMode ? styles.darkDateTime : styles.lightDateTime}>{data.date} - {data.startTime}</Text>
                  <Text style={isDarkMode ? styles.darkPlace : styles.lightPlace}>{data.coachingPlace}</Text>
              </View>
            </View>
          </View>          
        </View>
        )
      })

    return (
        <View style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}>
            <GoodMorning/>
              <ScrollView>
                <View style={styles.bottomScreen}>
                  {newBookCoach}
                  <Text style={styles.tutoText}>{!bookCoach[0] && 'Ajoute tes disponibilités dans ton agenda pour avoir une séance'}</Text>
                </View>
              </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15
    },
  bottomScreen: {
    width: 350,
    alignItems: 'center'
    },
  general: {
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, 
    marginTop: 15,
    },
  generalMid: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 80,
    paddingLeft: 10,
    },
  left: {
    height: 80,
    width: 80,
    borderRadius: 5
    },
  mid1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 80,
    paddingLeft: 10,
    marginBottom: 22
    },
  mid2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 80,
    paddingLeft: 10,
    marginBottom: 12
    },
  right: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 80,
    },
  sport: {
    fontSize: 13,
    color: '#FF711A',
    },
  tutoText: {
    width: '80%',
    textAlign: 'center'
    },
  // darkmode
  darkAge: {
    fontSize: 13,
    color: '#FFFFFF',
    },
  lightAge: {
    fontSize: 13,
    color: '#000000',
    },
  darkBg: {
    backgroundColor: '#000'
    },
  lightBg: {
    backgroundColor: '#f2f2f2'
    },
  darkDateTime: {
    fontSize: 15,
    color: '#FFFFFF',
    },
  lightDateTime: {
    fontSize: 15,
    color: '#000000',
    },
  darkFirstname: {
    fontSize: 21,
    color: '#FFFFFF',
    },
  lightFirstname: {
    fontSize: 21,
    color: '#000000',
    },
  darkGeneral: {
    backgroundColor: '#2E2E2E'
    },
  lightGeneral: {
    backgroundColor: '#ffffff'
    },
  darkPlace: {
    fontSize: 15,
    color: '#FFFFFF',
    },
  lightPlace: {
    fontSize: 15,
    color: '#000000',
    },
  darkPrice: {
    fontSize: 18,
    color: '#FFFFFF',
    },
  lightPrice: {
    fontSize: 18,
    color: '#000000',
    },
})