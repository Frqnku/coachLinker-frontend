import React from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'
import GoodMorning from '../components/GoodMorning';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addBooking } from '../reducers/booking';

import { backend_address } from '../backendAddress';


export default function CoachingStudentScreen() {
  const dispatch = useDispatch();
  
  const token = useSelector(state => state.users.value.token)
  const bookStudent = useSelector(state => state.booking.value.bookings)
  //const [booking, setBooking] = useState([])
  
  // console.log('testtoken', token)
  // console.log('test book', bookStudent)

  useEffect(() => {
    fetch(`${backend_address}/bookings/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({token: token})
    })
      .then(response => response.json())
      .then(data => {
          // console.log('bookings', data.bookings)
          
        dispatch(addBooking({token: token, bookings: data.bookings}))
        // console.log('testbooking', dispatch(addBooking({token: token, bookings: data.bookings})))
      });
  }, []);


  const newBookStudent = bookStudent.map((data, i) => {
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
          <Text>CoachingStudentScreen</Text>
          <View>{newBookStudent}</View>
        {/* afficher les coaching à venir et coaching passés */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15
  },
  image: {
    height: 20,
    width: 20
  }
})