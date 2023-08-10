import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TextInput, Pressable, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import GoodMorning from '../components/GoodMorning';
import { updateSearchLocation } from '../reducers/users';
import { updateCoachsAround, updateBookedCoach } from '../reducers/coachs';

import { backend_address } from '../backendAddress';

export default function StudentMenuScreen({ navigation }) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.darkMode.value);
  
  const currentLocation = useSelector(state => state.users.value.currentLocation);
  const searchLocation = useSelector(state => state.users.value.searchLocation);
  const coachsAround = useSelector(state => state.coachs.value.coachsAround);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState('');

  const coachAround = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backend_address}/coachs`);
      const coachsData = await response.json();

      const fetchPromises = coachsData.data.map(async (coach) => {
        if (coach.city.length < 3) {
          return null;
        }
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?type=municipality&q=${coach.city}`);
        const data = await response.json();
        const firstCity = data.features[0];
        const newPlace = {
          latitude: firstCity.geometry.coordinates[1],
          longitude: firstCity.geometry.coordinates[0],
        };

        function haversineDistance(lat1, lon1, lat2, lon2) {
          const R = 6371; // Rayon de la Terre en kilomètres
          const dLat = toRad(lat2 - lat1);
          const dLon = toRad(lon2 - lon1);
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;
          return distance;
        }

        function toRad(degrees) {
          return degrees * (Math.PI / 180);
        }

        if (haversineDistance(searchLocation.latitude, searchLocation.longitude, newPlace.latitude, newPlace.longitude) < 15) {
          return { ...coach, location: newPlace };
        }

        return null;
      });

      const newCoachs = await Promise.all(fetchPromises);

      // Filtrer les coachs null (ceux dont la distance est supérieure à 5 km)
      dispatch(updateCoachsAround(newCoachs.filter(coach => coach !== null)));
    } catch (error) {
      console.error("Erreur lors de la récupération des coachs :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [visibleCoachIndices, setVisibleCoachIndices] = useState([]);

  const togglePlanningVisibility = (index) => {
    if (visibleCoachIndices.includes(index)) {
      setVisibleCoachIndices(visibleCoachIndices.filter((i) => i !== index));
    } else {
      setVisibleCoachIndices([...visibleCoachIndices, index]);
    }
  };

  const today = new Date();
  const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const formattedDate = `${daysOfWeek[today.getDay()]} ${today.getDate().toString().padStart(2, '0')} ${months[today.getMonth()]}`;



  const handleBook = (coachID, coachingPlaces, teachedSport) => {
    dispatch(updateBookedCoach({coachID: coachID, coachingPlaces: coachingPlaces, teachedSport: teachedSport}))
    navigation.navigate('Book')
  }

  const allCoachs = coachsAround.map((data, i) => {

    const planningVisible = visibleCoachIndices.includes(i);

    const stars = [];
    for (let i = 0; i < 5; i++) {
      let style = {};
      if (i < Math.floor(data.notes.reduce((acc, cur) => acc + cur, 0) / data.notes.length )) {
        style = { 'color': '#FF711A' };
      } else {
        style = { 'color': '#AAAAAA' };
      }
      stars.push(<FontAwesome key={i} name='star' style={style} />);
    }
    console.log(data._id)

    return (
      <View key={i}>
        <Pressable style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard, !planningVisible && styles.borderRadiusBottom]} onPress={() => togglePlanningVisibility(i)}>
          <Image style={styles.leftCoach} source={{uri : data.image}}/>
          <View style={styles.midCoach}>
              <Text style={[styles.coachName, isDarkMode ? styles.darkText : styles.lightText]}>{data.firstname}</Text>
              <Text style={styles.sport}>{data.teachedSport[0]}</Text>
          </View>
          <View style={styles.rightCoach}>
              <Text style={[styles.star, isDarkMode ? styles.darkText : styles.lightText]}>{data.notes.length === 0 ? 'Pas de note' : `(${data.notes.length})`} {data.notes.length !== 0 && stars}</Text>
              <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>{data.price}€ / h</Text>
          </View>
        </Pressable>
        {planningVisible && <View style={[styles.planning, isDarkMode ? styles.darkCard : styles.lightCard]}>
          <View>
            <TouchableOpacity onPress={() => handleBook(data._id, data.coachingPlaces, data.teachedSport)} style={styles.btnBook}>
              <Text style={[styles.textBook, isDarkMode ? styles.darkText : styles.lightText]}>Réserver une séance</Text>
            </TouchableOpacity>
          </View>
        </View>}
      </View>
    );
  });

  const handleSubmit = () => {
    if (city.length === 0) {
      return;
    }

    setIsLoading(true);
    setCurrentCity(city);
    dispatch(updateCoachsAround([]));

    fetch(`https://api-adresse.data.gouv.fr/search/?type=municipality&q=${city}`)
      .then((response) => response.json())
      .then((data) => {
        const firstCity = data.features[0];
        const newPlace = {
          name: firstCity.properties.city,
          latitude: firstCity.geometry.coordinates[1],
          longitude: firstCity.geometry.coordinates[0],
        };

        dispatch(updateSearchLocation(newPlace));
        setCity('');
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (currentCity === city) {
      coachAround();
    }
  }, [searchLocation, currentCity]);

  const handleAroundMe = () => {
    setIsLoading(true);
    const newLocation = { name: 'Autour de moi', latitude: currentLocation.latitude, longitude: currentLocation.longitude };
    dispatch(updateSearchLocation(newLocation));
    setCurrentCity('');
  };

  return (
    <KeyboardAvoidingView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <GoodMorning />
      <View style={styles.bottomScreen}>

        <View style={[styles.searchLocation, isDarkMode ? styles.darkCard : styles.lightCard]}>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, isDarkMode ? styles.darkInput : styles.lightBg]}
              placeholder='Dans quelle ville ?'
              placeholderTextColor={isDarkMode ? '#AAAAAA' : '#7B7B7B'}
              onChangeText={value => setCity(value)}
              value={city}
              color={isDarkMode ? '#fff' :  '#000'}
            />
            <TouchableOpacity onPress={handleSubmit}>
                <FontAwesome name='search' size={24} color={isDarkMode ? '#AAAAAA' : '#7B7B7B'}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnSearch} onPress={() => handleAroundMe()}>
            <Text style={[isDarkMode ? styles.darkText : styles.lightText]}><FontAwesome name='location-arrow' size={16} color={isDarkMode ? '#fff' : '#000'} /> Autour de moi</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={[isDarkMode ? styles.darkText : styles.lightText]}><FontAwesome name='calendar' size={24} color={isDarkMode ? '#AAAAAA' : '#7B7B7B'} />    {formattedDate}</Text>
          <FontAwesome name='sort' size={24} color={'#AAAAAA'} onPress={() => console.log('sorted')} />
        </View>

        {isLoading && coachsAround.length === 0 ? <ActivityIndicator size="large" color="#AAAAAA" /> : <ScrollView showsVerticalScrollIndicator={false}>
          {allCoachs}
        </ScrollView>}

      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 15
    },
    borderRadiusBottom: {
        borderRadius: 5,
    },
    bottomScreen: {
        width: '80%'
    },
    btnBook: {
        backgroundColor: '#FF711A',
        height: 50,
        width: 150,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        width: '100%',
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 15
    },
    coachName: {
        fontSize: 22
    },
    sport: {
      color: '#FF711A',
    },
    displayCoaching: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    input: {
        height: 35,
        backgroundColor: 'red',
        width: '85%',
        borderRadius: 5,
        paddingLeft: 10
    },
    leftCoach: {
        height: 80,
        width: 80,
        borderRadius: 5
    },
    midCoach: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 80,
        paddingLeft: 10,
    },
    planning: {
        width: '100%',
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderTopColor: '#AAAAAA',
        borderTopWidth: 1
    },
    rightCoach: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 80,
    },
    searchLocation: {
        width: '100%',
        backgroundColor: 'yellow',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        marginBottom: 20
    },
    text: {
        fontSize: 18
    },
    textBook: {
        textAlign: 'center'
    },
    btnSearch: {
        paddingVertical: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    darkBg: {
        backgroundColor: '#000'
    },
    darkText: {
        color: '#fff'
    },
    darkCard: {
        backgroundColor: '#2E2E2E'
    },
    darkInput: {
        backgroundColor: '#505050'
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
  })
