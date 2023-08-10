import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { backend_address } from '../backendAddress';

export default function BookScreen({ navigation }) {
    const isDarkMode = useSelector(state => state.darkMode.value)
    const bookedCoach = useSelector(state => state.coachs.value.bookedCoach)
    const [planningCoach, setPlanningCoach] = useState([])
    const [unvaible, setUnvaible] = useState([])
    const [booking, setBooking] = useState({})
    const [bookPlace, setBookPlace] = useState('Parc')
    const [selectedSport, setSelectedSport] = useState('Boxe')
    const token = useSelector((state) => state.users.value.token);
    
    

    useEffect(() => {
        setBooking({})
        fetch(`${backend_address}/plannings`, {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({coachID: bookedCoach.coachID})
        })
        .then(response => response.json())
        .then(data => {
            data ? setPlanningCoach(data.data.days) : setPlanningCoach([])
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

    }, [bookedCoach.coachID])

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
                <View key={i} style={styles.containTotal}>
                    <View style={styles.dayWeek}>
                        <Text style={styles.dayText}>   {day.dayOfWeek}</Text>
                    </View>
                    <View style={styles.containHour}>
                    {hoursBetween.map((hour, index) => {
                        const bookingExist = isBookingExist(day.dayOfWeek, hour);
                       
                            return (
                                <View style={[styles.hour, bookingExist ? styles.hour2 : styles.hour1]}>
                                {!bookingExist && <TouchableOpacity onPress={() => setBooking({date: day.dayOfWeek, start: hour})}>
                                    <Text key={index}>{hour}</Text>
                                </TouchableOpacity>}
                                {bookingExist && <Pressable>
                                    <Text key={index} style={{color: 'grey'}}>{hour}</Text>
                                    <Text key={index} style={{color: 'grey'}}>{hour}</Text>
                                </Pressable>}
                                </View>
                            )
                        
                    })}
                    </View>
                </View>
            )
        }
    })

    const handleBooking = () => {
        if(!booking.date) {
            return
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
            data.result && navigation.navigate('Congrats')
        })
    }

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.bttn}>
                <TouchableOpacity style={styles.btnBack} onPress={handleNavBack}><Text style={[ isDarkMode ? styles.darkTextButton : styles.lightTextButton]}>Retour</Text></TouchableOpacity>
            </View>
            {planning[0] ?
            <View style={styles.contain}>
                <View>{planning}</View>
                {booking.date && bookPlace && <Text style={styles.dateBook}>Je réserve le {booking.date.toLowerCase()} à {booking.start}.</Text>}
                <TouchableOpacity onPress={handleBooking} style={styles.bttnBook}>
                    <Text style={styles.bttnBookText}>Réserver ma séance</Text>
                </TouchableOpacity>
            </View> : <Text>   Aucune disponibilité</Text>}
        </ScrollView> 
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15
        },
    scrollView: {
        width: '100%',
        height: '100%',
        flex: 1,
        marginTop: 50,
        justifyContent: 'flex-start',
        },
    bttnBookText: {
        fontSize : 15,
        color: 'white',
        fontWeight: 'bold',
        },
    contain: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 15,
        },
    containHour: {
        flex: 1,
        marginLeft: 40,
        flexDirection: 'row',
        flexWrap: 'wrap',
        },
    containTotal: {
        width: 350,
        height: '40%',
        backgroundColor:'#E8E8E8',
        justifyContent: 'flex-start',
        marginTop: 20,
        borderRadius: 15
        },
    dayText: {
        fontSize : 15,
        color: 'white',
        },
    dayWeek: {
        marginBottom: 20,
        padding: 5,
        backgroundColor: '#FF711A',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        },
    hour: {
        width: 75,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 12,
        marginRight : 20,
        marginBottom: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hour1: {
        backgroundColor: '#FFB182',
    },
    hour2: {
        backgroundColor: 'lightgrey',
        color: 'grey'
    },
    bttn: {
        marginLeft: 30
    },
    btnBack: {
        height: 30,
        width: 60,
        padding: 5,
        backgroundColor: '#FF711A',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    lightTextButton: {
        fontSize : 15,
        color: 'white',
        },
    darkTextButton: {
        fontSize : 15,
        color: '#2E2E2E',
      },
      bttnBook: {
        height: 40,
        width: 200,
        padding: 5,
        backgroundColor: '#FF711A',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 25
      },
      bttnBookText: {
        fontSize : 15,
        color: 'white',
        fontWeight: 'bold',
      },
      dateBook: {
        fontSize: 18
      }
})