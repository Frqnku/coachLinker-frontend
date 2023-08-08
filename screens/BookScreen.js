import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TextInput, Pressable, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { backend_address } from '../backendAddress';

export default function BookScreen({ navigation }) {
    const bookedCoach = useSelector(state => state.coachs.value.bookedCoach)
    const [planningCoach, setPlanningCoach] = useState([])
    const [unvaible, setUnvaible] = useState([])
    const [booking, setBooking] = useState({})
    const [bookPlace, setBookPlace] = useState('Parc')
    const [selectedSport, setSelectedSport] = useState('Boxe')
    const token = useSelector((state) => state.users.value.token);
    console.log(token, bookedCoach)
    

    useEffect(() => {
        setBooking({})
        fetch(`${backend_address}/plannings`, {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({coachID: bookedCoach.coachID})
        })
        .then(response => response.json())
        .then(data => {
            setPlanningCoach(data.data.days)
        })

        fetch(`${backend_address}/bookings/isAvaible`, {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({coachID: bookedCoach.coachID})
        })
        .then(response => response.json())
        .then(data => {
            setUnvaible(data.bookings)
        })

    }, [])

    const handleNavBack = () => {
        setBooking({})
        navigation.navigate('TabNavigator', {screen: 'Menu'})
    }

    
    function generateHoursBetween(startHour, endHour) {
        const start = parseInt(startHour.split(":")[0]);
        const end = parseInt(endHour.split(":")[0]);
        const hours = [];
    
        for (let i = start; i <= end; i++) {
            hours.push(`${i.toString().padStart(2, "0")}:00`);
        }
    
        return hours;
    }

    const isBookingExist = (date, startTime) => {
        return unvaible.some(booking => booking.date === date && booking.startTime === startTime);
      };

    const planning = planningCoach.map((day, i ) => {
        if (day.startDay) {
            const hoursBetween = generateHoursBetween(day.startDay, day.endDay);
            return (
                <View key={i}>
                    <Text>{day.dayOfWeek}</Text>
                    {hoursBetween.map((hour, index) => {
                        const bookingExist = isBookingExist(day.dayOfWeek, hour);
                       
                            return (
                                <>
                                {!bookingExist && <TouchableOpacity onPress={() => setBooking({date: day.dayOfWeek, start: hour})}>
                                    <Text key={index}>{hour}</Text>
                                </TouchableOpacity>}
                                {bookingExist && <Pressable>
                                    <Text key={index} style={{color:  'grey'}}>{hour}</Text>
                                </Pressable>}
                                </>
                            )
                        
                    })}
                </View>
            )
        }
    })

    const handleBooking = () => {
        if(!booking.date) {
            console.log('Choisissez une séance')
        }
        fetch(`${backend_address}/bookings/new`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                token: token,
                date: booking.date,
                startTime: booking.start,
                coachingPlace: bookedCoach.coachingPlaces[0], // pouvoir séléctionner l'endroit'
                coachID: bookedCoach.coachID,
                selectedSport: bookedCoach.teachedSport[0], // pouvoir séléctionner le sport 
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            navigation.navigate('Congrats')
        })
    }

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Pressable style={styles.btnBack} onPress={handleNavBack}><Text>Retour</Text></Pressable>
            <View>

            </View>
            <Text>BookScreen</Text>
            <Text>{planning}</Text>
            <TouchableOpacity onPress={handleBooking}>
                <Text>Réserver ma séance</Text>
            {booking.date && bookPlace && <Text>{booking.date} à {booking.start}</Text>}
            </TouchableOpacity>
        </ScrollView>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 15
    },
/*     scrollView: {
        width: '100%'
    }, */
    btnBack: {
        height: 50,
        width: 100,
        backgroundColor: 'red'
    }
})