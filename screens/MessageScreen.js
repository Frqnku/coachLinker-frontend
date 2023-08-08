import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
  } from 'react-native';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import { Audio } from 'expo-av';
  import React, { useState, useEffect } from 'react';
  import socketIOClient from "socket.io-client";
import { useSelector } from 'react-redux';

  const socket = socketIOClient("http://192.168.10.126:3000")
  
  export default function MessageScreen(params) {
    const [message, setMessage] = useState([])
    const [myMessage, setMyMessage] = useState('')
    const user = useSelector((state) => state.users.value)
    const id = useSelector((state) => state.booking.value)
    


  console.log(user)
    useEffect(() => {

        socket.emit("join" , id)
      socket.on('sendMessageFromBack', (newMessage)=> {
        console.log("newMessage",newMessage);
        if (myMessage === newMessage) {
          return
        }

        // if (id !== newMessage.id) {
        //     return
        //   }
  
        setMessage([...message, newMessage]);
      });

      return () => {
        socket.off('sendMessageFromBack')
        socket.off('join')
      };
    }, [message]);
  
    useEffect(() => {

    }, []);
  
    const messages = message.map((data, i) => {
        return (
          <View key={i} style={data.token !== user.token? [styles.messageWrapper, styles.messageRecieved] : [styles.messageWrapper, styles.messageSent]}>
            <View style={data.token !== user.token ? [styles.message, styles.messageRecievedBg] : [styles.message, styles.messageSentBg]}>
              <Text style={styles.whoSent}>{data.user}</Text>
              <Text style={[styles.messageText, data.message.startsWith('audio') && styles.messageAudio]}>{data.message.startsWith('audio') ? <MaterialIcons onPress={() => playSoundFromURL(data.message)} name="audiotrack" color="#ffffff" size={24}/> : data.message}</Text>
            </View>
            <Text style={styles.timeText}>{data.time}</Text>
          </View>
        )
    })
    const sendMessage = () => {
        const dateNow = new Date();
        const hourNow = dateNow.getHours();
        const minuteNow = dateNow.getMinutes();
        const timeNow = `${hourNow}h${minuteNow < 10 ? '0' + minuteNow : minuteNow}`;
      
  
  if(isRecording) {
    return
  }
  
  if(newRecord) {
    const formData = new FormData();
    formData.append('recordFromFront', newRecord);
    setNewRecord()
    
    fetch('http://192.168.10.126:3000/audio', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      socket.emit('sendMessage', {message: data.url, user: user.signUp.firstname, time: timeNow, id : id})
      setMyMessage('audio Message') ;
    }) 
  } else if(!newRecord && myMessage.trim() !== '') {
   
    socket.emit('sendMessage', {message: myMessage, user: user.signUp.firstname, time: timeNow, token : user.token}, id)  
     setMessage([...message, { user: user.signUp.firstname, message: myMessage, time: timeNow, token : user.token , id : id}]); 
  } setMyMessage('')
} 
    const [recording, setRecording] = useState(undefined);
    const [newRecord, setNewRecord] = useState()
    const [isRecording, setIsRecording] = useState(false);
    console.log(user)
    const handleRecording = () => {
      recording === undefined ? startRecording() : stopRecording()
    }
  
    async function startRecording() {
      if(newRecord) {
        return
      }
  
  try {
    console.log('Requesting permissions..');
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
  
    console.log('Starting recording..');
    const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    setRecording(recording);
    setIsRecording(true)
    setMyMessage('Recording audio...')
    console.log('Recording started');
  } catch (err) {
    console.error('Failed to start recording', err);
  }
    }
  
    async function stopRecording() {
      console.log('Stopping recording..');
      setIsRecording(false)
      setMyMessage('Audio message')
  
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync(
        {
          allowsRecordingIOS: false,
        }
      );
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
  
      setNewRecord({
        uri: uri,
        name: 'record.mp3',
        type: 'record/mp3',
      })
  
      setRecording(undefined);
  
    }
  
    const [sound, setSound] = useState();
  
    const playSoundFromURL = async (url) => {
        try {
          console.log('Loading Sound');
          const { sound } = await Audio.Sound.createAsync(
            { uri: url },
            { shouldPlay: true }
          );
          setSound(sound);
      
          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              // Si la lecture de l'audio est terminée, déchargez le son pour libérer les ressources.
              sound.unloadAsync();
              setSound(null);
            }
          });
        } catch (error) {
          console.error('Erreur lors de la lecture de l\'audio', error);
        }
      };
  
    useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);
  
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.banner}>
          <MaterialIcons name="keyboard-backspace" color="#ffffff" size={24} onPress={() => navigation.goBack()} />
          <Text style={styles.greetingText}>Welcome {params.name}</Text>
        </View>
  
    <View style={styles.inset}>
      <ScrollView style={styles.scroller}>
          {messages}
      </ScrollView>
  
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={(!isRecording && !newRecord) && (value => setMyMessage(value))} value={myMessage}/>
        <TouchableOpacity onPress={() => handleRecording()} style={styles.recordButton}>
          <MaterialIcons name="mic" color="#ffffff" size={24} />
        </TouchableOpacity>
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
      backgroundColor: '#000',
    },
    inset: {
      flex: 1,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      backgroundColor: '#ffffff',
      width: '100%',
      paddingTop: 20,
      position: 'relative',
      borderTopColor: '#ffe099',
      borderLeftColor: '#ffe099',
      borderRightColor: '#ffe099',
      borderTopWidth: 4,
      borderRightWidth: 0.1,
      borderLeftWidth: 0.1,
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
    greetingText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
      marginLeft: 15,
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
      alignSelf: 'flex-end',
      alignItems: 'flex-end'
    },
    messageSent: {
      alignSelf: 'flex-start',
      alignItems: 'flex-start'
    },
    messageSentBg: {
      backgroundColor: '#ffad99',
    },
    messageRecievedBg: {
      backgroundColor: '#d6fff9'
    },
    whoSent: {
      color: 'grey',
      fontSize: 10,
      fontWeight: '300'
    },
    messageText: {
      color: '#506568',
      fontWeight: '400',
    },
    messageAudio: {
      alignItems: 'center'
    },
    timeText: {
      color: '#506568',
      opacity: 0.5,
      fontSize: 10,
      marginTop: 2,
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
      backgroundColor: '#f0f0f0',
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
    recordButton: {
      borderRadius: 50,
      padding: 16,
      backgroundColor: '#ff5c5c',
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
    sendButton: {
      borderRadius: 50,
      padding: 16,
      backgroundColor: '#ffe099',
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
    buttonText: {
      color: '#ffffff',
      fontWeight: '800',
      textTransform: 'uppercase'
    },
    scroller: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  });