import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlanning } from '../reducers/coachs';

const TimePicker = (props) => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector(state => state.darkMode.value)


  const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false);
  const [selectedStartHour, setSelectedStartHour] = useState('');
  const [selectedEndHour, setSelectedEndHour] = useState('');

  const handleSubmit = () => {
    if (selectedStartHour && selectedEndHour) {
      dispatch(updatePlanning({
        day: props.name,
        start: selectedStartHour,
        end: selectedEndHour,
      }));
    } else {
      console.log('Il faut choisir une heure de début et de fin')
    }
  }

  const toggleStartPicker = () => {
    setStartPickerVisibility(!isStartPickerVisible);
  };

  const toggleEndPicker = () => {
    setEndPickerVisibility(!isEndPickerVisible);
  };

  const handleStartHourSelect = (hour) => {
    setSelectedStartHour(hour);
    setStartPickerVisibility(false);
  };

  const handleEndHourSelect = (hour) => {
    setSelectedEndHour(hour);
    setEndPickerVisibility(false);
  };

  const renderStartHours = () => {
    const hours = ['Je veux pas','08:00','09:00','10:00','11:00', '12:00','13:00','14:00','15:00','16:00','17:00', '18:00','19:00','20:00', '21:00','22:00', '23:00']; // Ajoutez plus d'options d'heures
    return hours.map((hour) => (
      <TouchableOpacity
        key={hour}
        style={styles.option}
        onPress={() => handleStartHourSelect(hour)}
      >
        <Text>{hour}</Text>
      </TouchableOpacity>
    ));
  };

  const renderEndHours = () => {
    const hours = ['Je veux pas','08:00','09:00','10:00','11:00', '12:00','13:00','14:00','15:00','16:00','17:00', '18:00','19:00','20:00', '21:00','22:00', '23:00']; // Ajoutez plus d'options d'heures
    return hours.map((hour) => (
      <TouchableOpacity
        key={hour}
        style={styles.option}
        onPress={() => handleEndHourSelect(hour)}
      >
        <Text>{hour}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>

      <Text>Début</Text>
      <TouchableOpacity style={[styles.input, isDarkMode ? styles.darkBlock: styles.lightBlock]} onPress={toggleStartPicker}>
        <Text style={styles.heure} >{selectedStartHour || 'Choisissez une heure'}</Text>
      </TouchableOpacity>
      {isStartPickerVisible && <View style={styles.pickerContainer}>{renderStartHours()}</View>}
      
      <Text>Fin</Text>
      <TouchableOpacity style={styles.input} onPress={toggleEndPicker}>
        <Text>{selectedEndHour || 'Choisissez une heure'}</Text>
      </TouchableOpacity>
      {isEndPickerVisible && <View style={styles.pickerContainer}>{renderEndHours()}</View>}

      <TouchableOpacity style={styles.input} onPress={handleSubmit}>
        <Text>Valider</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBlock:{
    backgroundColor: '#505050',
    borderColor: "#505050",
    
},
lightBlock:{
    backgroundColor: '#E8E8E8',
    borderColor: "#E8E8E8",
    
},
  heure :{
    fontSize:17,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: 200,
    alignItems: 'center',
    borderRadius: 5,
  },
  pickerContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    width: 200,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignItems: 'center',
  },
});

export default TimePicker;