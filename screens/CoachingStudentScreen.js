import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import GoodMorning from '../components/GoodMorning';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addBooking } from '../reducers/booking';

import { backend_address } from '../backendAddress';

export default function CoachingStudentScreen() {
  const isDarkMode = useSelector(state => state.darkMode.value);
  const dispatch = useDispatch();

  const token = useSelector(state => state.users.value.token);
  const bookStudent = useSelector(state => state.booking.value.bookings);
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    fetch(`${backend_address}/bookings/student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token })
    })
      .then(response => response.json())
      .then(data => {
        dispatch(addBooking({ token: token, bookings: data.bookings }));

        const newBookStudent = data.bookings.map((data, i) => {
          return (
            <View key={i}>
              <View style={[styles.general, isDarkMode ? styles.darkGeneral : styles.lightGeneral]}>
                <Image source={{ uri: data.coachID.image }} style={styles.left} />
                <View style={styles.generalMid}>
                  <View style={styles.mid1}>
                    <Text style={isDarkMode ? styles.darkFirstname : styles.lightFirstname}>
                      {data.coachID.firstname}
                    </Text>
                    <Text style={styles.sport}>{data.selectedSport}</Text>
                  </View>
                  <View style={styles.mid2}>
                    <Text style={isDarkMode ? styles.darkDateTime : styles.lightDateTime}>
                      {data.date} - {data.startTime}-{data.endTime}
                    </Text>
                    <Text style={isDarkMode ? styles.darkPlace : styles.lightPlace}>
                      {data.coachingPlace}
                    </Text>
                  </View>
                </View>
                <View style={styles.right}>
                  <Text style={isDarkMode ? styles.darkPrice : styles.lightPrice}>
                    {data.coachID.price}€ / h
                  </Text>
                </View>
              </View>
            </View>
          );
        });

        setMyBookings(newBookStudent);
      });
  }, [dispatch, isDarkMode, token]);

  return (
    <View style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}>
      <GoodMorning />
      <ScrollView>
        <View style={styles.bottomScreen}>
          {myBookings[0] ? myBookings : <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>Vous n'avez pas de séance prévue</Text>}
        </View>
      </ScrollView>
      {/* afficher les coaching à venir et coaching passés */}
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
  darkBg: {
    backgroundColor: '#000'
  },
  lightBg: {
    backgroundColor: '#f2f2f2'
  },
  bottomScreen: {
    width: 350,
    alignItems: 'center'
  },
    left: {
    height: 80,
    width: 80,
    borderRadius: 5
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
  darkGeneral: {
    backgroundColor: '#2E2E2E'
  },
  lightGeneral: {
    backgroundColor: '#ffffff'
  },
  darkText: {
    color: '#fff'
},
darkCard: {
    backgroundColor: '#2E2E2E'
},
greyText: {
    color: 'grey'
},
lightBg: {
    backgroundColor: '#f2f2f2'
},
lightCard: {
    backgroundColor: '#fff'
},
lightText: {
    color: '#000'
},
  generalMid: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 80,
    paddingLeft: 10,
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
  lightFirstname: {
    fontSize: 22,
    color: '#000000',
  },
  darkFirstname: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  sport: {
    fontSize: 13,
    color: '#FF711A',
  },
  lightDateTime: {
    fontSize: 15,
    color: '#000000',
  },
  darkDateTime: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  lightPlace: {
    fontSize: 15,
    color: '#000000',
  },
  darkPlace: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  lightPrice: {
    fontSize: 18,
    color: '#000000',
  },
  darkPrice: {
    fontSize: 18,
    color: '#FFFFFF',
  },
})