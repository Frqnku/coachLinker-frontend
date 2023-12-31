import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity,} from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

export default function ChatListScreen  ({ navigation })  {
    const isDarkMode = useSelector(state => state.darkMode.value)
    const chats = useSelector((state) => state.booking.value.bookings)// Utilisez votre propre sélecteur ici

    const DARK_COLORS = ["black", "#FF6100"];
        const LIGHT_COLORS = ["#FFF8EB", "#FF6100"];
        const DarkStart = {x : 0.4, y : 0.4};
        const DarkEnd = {x : -0.3, y : -0.3};
        const LightStart = {x : 0.6, y : 0.4};
        const LightEnd = {x : 0.3, y : 0.1};
 
  return (
    <View style={styles.container}>
        <LinearGradient
        colors={isDarkMode ? DARK_COLORS : LIGHT_COLORS}
        start={isDarkMode ? DarkStart : LightStart}
          end={isDarkMode ? DarkEnd : LightEnd}
        style={styles.background}
        >
            <Text style={[styles.title, isDarkMode ? styles.darkTitle : styles.lightTitle]}>Discussions :</Text>
      <ScrollView style={styles.scroller} showsVerticalScrollIndicator={false}>
        {chats?.map((chat) => (
          <TouchableOpacity
            key={chat._id}
            style={[styles.chatItem, isDarkMode ? styles.darkChat : styles.lightChat]}
            onPress={() => navigation.navigate('MessageScreen', { id: chat._id })}
          >
          <View style={styles.picture}>
            <Image style={styles.image} source={{uri:chat.coachID.image ?chat.coachID.image : chat.studentID.image }} />
          </View>
          <View style={styles.name}>
           <Text style={[styles.chatName, isDarkMode ? styles.darkName : styles.lightName]}>{chat.coachID.name ?chat.coachID.name : chat.studentID.name  }</Text>
           <Text style={[styles.chatName, isDarkMode ? styles.darkName : styles.lightName]}>{chat.coachID.firstname ?chat.coachID.firstname : chat.studentID.firstname  }</Text>
          </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
  background:{
    width: "100%",
    height: "100%",
    },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    height: 120,
    backgroundColor:'#fff',
    marginTop: 20,
    borderRadius: 30,
    },
  chatName: {
    color: 'black',
    fontSize: 20,
    marginLeft: 1,
    paddingLeft: 6,
    marginTop: "8%",
    paddingBottom: 20,
    },
  image :{
    width:60,
    height:60,
    borderRadius: 50,
    marginLeft : 30,
    },
  name:{
    flexDirection:'row',
    justifyContent: 'center',
    },
  picture :{
    justifyContent: 'center',
    },
  scroller: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    },
  title:{
    fontSize: 40,
    marginTop: 80,
    marginLeft: 100,
    },
// darkmode
  darkChat :{
    backgroundColor: '#2E2E2E',
    },
  lightChat:{
    backgroundColor: 'white',
    },
  darkName:{
    color: 'white',
    },
  lightName:{
    color: "black",
    },
  darkTitle :{
    color: 'white',
    },
  lightTitle:{
    color: "black",
    },
});

