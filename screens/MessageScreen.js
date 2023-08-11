import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import { useSelector } from 'react-redux';

const socket = socketIOClient("http://192.168.10.124:3000")
 
export default function MessageScreen(params, {navigation}) { 

const [message, setMessage] = useState([])
const [myMessage, setMyMessage] = useState('')

const isDarkMode = useSelector(state => state.darkMode.value)
const user = useSelector((state) => state.users.value)
const bookings = useSelector((state) => state.booking.value)
const id = params.route.params.id

useEffect(() => {

 socket.emit("join" , id)
 socket.on('sendMessageFromBack', (newMessage)=> {
 if (myMessage === newMessage) {
   return
 }
  setMessage([...message, newMessage]);
 });

    return () => {
     socket.off('sendMessageFromBack')
     socket.off('join')
 };
}, [message]);
  
const messages = message.map((data, i) => {
  return (
   <View key={i} style={data.token !== user.token? [styles.messageWrapper, styles.messageRecieved] : [styles.messageWrapper, styles.messageSent]}>
     <View style={data.token !== user.token ? [styles.message, styles.messageRecievedBg] : [styles.message, styles.messageSentBg]}>
       <Text style={styles.whoSent}>{data.user}</Text>
       <Text style={styles.messageText}>{ data.message}</Text>
     </View>
       <Text style={[styles.timeText, isDarkMode ? styles.darkTimeText : styles.lightTimeText]}>{data.time}</Text>
   </View>
        )
})
    
const sendMessage = () => {
 const dateNow = new Date();
 const hourNow = dateNow.getHours();
 const minuteNow = dateNow.getMinutes();
 const timeNow = `${hourNow}h${minuteNow < 10 ? '0' + minuteNow : minuteNow}`;
      
    socket.emit('sendMessage', {message: myMessage, user: user.signUp.firstname, time: timeNow, token : user.token}, id)  
    setMessage([...message, { user: user.signUp.firstname, message: myMessage, time: timeNow, token : user.token , id}]); 
    setMyMessage('')
}

return (
<KeyboardAvoidingView style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
 
 <View style={styles.banner}>
  <Text style={[styles.greetingText, isDarkMode ? styles.darkTitle : styles.lightTitle]}>Welcome {user.signUp.firstname}</Text>
 </View>
  
 <View style={[styles.inset, isDarkMode ? styles.darkInset : styles.lightInset]}>
  <ScrollView style={styles.scroller}>
     {messages}
  </ScrollView>
  
   <View style={styles.inputContainer}>
     <TextInput style={[styles.input , isDarkMode ? styles.darkInput : styles.lightInput]} selectionColor={'#FF6100'} onChangeText={ (value => setMyMessage(value))} value={myMessage}/>

     <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage()}>
         <MaterialIcons name="send" color="#ffffff" size={24} />
     </TouchableOpacity>
  </View>
 </View>
</KeyboardAvoidingView>
 );
}
  
const styles = StyleSheet.create({

container: {
 flex: 1,
 alignItems: 'center',
 justifyContent: 'space-between',
}, 

banner: {
 width: '100%',
 height: '15%',
 paddingTop: 20,
 paddingLeft: 20,
 flexDirection: 'row',
 justifyContent: 'flex-start',
 alignItems: 'center',
},    
buttonText: {
 color: '#ffffff',
 fontWeight: '800',
 textTransform: 'uppercase'
},

greetingText: {
 fontWeight: 'bold',
 fontSize: 18,
 marginLeft: 15,
},

inputContainer: {
 width: '100%',
 flexDirection: 'row',
 justifyContent: 'center',
 justifySelf: 'flex-end',
 alignContent: 'flex-start',
 marginBottom: 30,
 marginTop: 'auto',
 background: 'transparent',
 paddingLeft: 20,
 paddingRight: 20,
},

input: {
 width: '60%',
 padding: 14,
 borderRadius: 30,
 shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 1.2,
},

inset: {
 flex: 1,
 borderTopLeftRadius: 50,
 borderTopRightRadius: 50,
 width: '100%',
 paddingTop: 20,
 position: 'relative',
 borderTopColor: '#FF6100',
 borderLeftColor: '#ffe099',
 borderRightColor: '#ffe099',
 borderTopWidth: 4,
 borderRightWidth: 0.1,
 borderLeftWidth: 0.1,
},

message: {
 paddingTop: 12,
 paddingBottom: 12,
 paddingRight: 20,
 paddingLeft: 20,
 borderRadius: 24,
 alignItems: 'flex-end',
 justifyContent: 'center',
 maxWidth: '65%',
 shadowColor: '#000',
  shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 6.41,
      elevation: 1.2,
},

messageWrapper: {
 alignItems: 'flex-end',
 marginBottom: 20,
},
messageRecieved: {
 alignSelf: 'flex-start',
 alignItems: 'flex-start'
},
    
messageSent: {
 alignSelf: 'flex-end',
 alignItems: 'flex-end'
},
    
messageSentBg: {
 backgroundColor: '#FFB182',
},
   
messageRecievedBg: {
 backgroundColor: '#FF711A'
},
    
messageText: {
 color: 'white',
 fontWeight: '400',
},
   
   
    
sendButton: {
 borderRadius: 50,
 padding: 16,
 backgroundColor: '#FF6100',
 marginLeft: 12,
 alignItems: 'center',
 justifyContent: 'center',
 shadowColor: '#000',
 shadowOffset: {
   width: 0,
   height: 1,
 },
  shadowOpacity: 0.20,
  shadowRadius: 6.41,
  elevation: 1.2,
},
    
scroller: {
 paddingLeft: 20,
 paddingRight: 20,
},
    
timeText: {
 opacity: 0.5,
 fontSize: 10,
 marginTop: 2,
},
    
whoSent: {
 color: 'black',
 fontSize: 10,
 fontWeight: '300'
},
    
darkContainer :{
 backgroundColor: 'black',
},
lightContainer:{
 backgroundColor: '#E8E8E8',
},

darkTitle :{
 color: 'white',
},
lightTitle:{
 color: "#FF6100",
},

darkInput :{
 backgroundColor: '#E8E8E8',
},
lightInput:{
 backgroundColor: '#f0f0f0',
},
  
darkInset :{
 backgroundColor: '#2E2E2E',
},
lightInset:{
 backgroundColor: '#ffffff',
},
           
darkTimeText :{
 color: '#fff',
},
lightTimeText:{
 color: 'black',
},
});