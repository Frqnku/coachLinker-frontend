import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import GoodMorning from '../components/GoodMorning';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addBooking } from '../reducers/booking';

export default function CoachMenuScreen() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.users.value.token)
    console.log('coach', token)
    const bookCoach = useSelector(state => state.booking.value.bookings)

    console.log('test bookCoach', bookCoach)
    useEffect(() => {
        fetch('https://coach-linker-backend.vercel.app/bookings/coach', {
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
        console.log('aurelie', data.studentID.firstname)
        return(
            <View key={i}>
              <Image source={{uri:data.coachID.image}} style={styles.image}/>
              <Text>{data.coachID.firstname}</Text>
              <Text>{data.coachID.price}</Text>
              <Text>{data.coachingPlace}</Text>
              <Text>{data.date}</Text>
              <Text>{data.startTime}</Text>
              <Text>{data.endTime}</Text>
              <Text>{data.selectedSport}</Text>
            </View>
        )
      })

    return (
        <View style={styles.container}>
            <GoodMorning/>
            <Text>CoachMenuScreen</Text>
            <View>{newBookCoach}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15
    }
})