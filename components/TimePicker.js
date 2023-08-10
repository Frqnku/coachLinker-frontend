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
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = () => {
    if (selectedStartHour && selectedEndHour) {
      dispatch(updatePlanning({
        day: props.name,
        start: selectedStartHour,
        end: selectedEndHour,
      }));
      setMessage('Modification prise en compte pour ce jour')
      setError(false)
    } else {
      setMessage('Il faut choisir une heure de début et de fin')
      setError(true)
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
    const hours = ['', '08:00','09:00','10:00','11:00', '12:00','13:00','14:00','15:00','16:00','17:00', '18:00','19:00','20:00', '21:00','22:00', '23:00']; // Ajoutez plus d'options d'heures
    return hours.map((hour) => (
      <TouchableOpacity
        key={hour}
        style={styles.option}
        onPress={() => handleStartHourSelect(hour)}
      >
        <Text style={isDarkMode ? styles.darkText: styles.lightText}>{hour}</Text>
      </TouchableOpacity>
    ));
  };

  const renderEndHours = () => {
    const hours = ['', '08:00','09:00','10:00','11:00', '12:00','13:00','14:00','15:00','16:00','17:00', '18:00','19:00','20:00', '21:00','22:00', '23:00']; // Ajoutez plus d'options d'heures
    return hours.map((hour) => (
      <TouchableOpacity
        key={hour}
        style={styles.option}
        onPress={() => handleEndHourSelect(hour)}
      >
        <Text style={isDarkMode ? styles.darkText: styles.lightText}>{hour}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.center}>
          <TouchableOpacity style={[styles.input, isDarkMode ? styles.darkBlock: styles.lightBlock]} onPress={toggleStartPicker}>
            <Text style={isDarkMode ? styles.darkText: styles.lightText} >{selectedStartHour || 'Choisissez une heure'}</Text>
          </TouchableOpacity>
          {isStartPickerVisible && <View style={styles.pickerContainer}>{renderStartHours()}</View>}
        </View>
        <View style={styles.center}>               
          <TouchableOpacity style={[styles.input, isDarkMode ? styles.darkBlock: styles.lightBlock]} onPress={toggleEndPicker}>
            <Text style={isDarkMode ? styles.darkText: styles.lightText} >{selectedEndHour || 'Choisissez une heure'}</Text>
          </TouchableOpacity>
          {isEndPickerVisible && <View style={styles.pickerContainer}>{renderEndHours()}</View>}
        </View>
      </View>
        <Text style={{color : error ? 'crimson' : '#20b000'}}>{message}</Text>
      <TouchableOpacity style={styles.btnValidate} onPress={handleSubmit}>
        <Text style={[styles.fontWeight, styles.darkText]}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
    },
  btnValidate: {
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#FF711A',
    borderRadius: 5
    },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    },
  fontWeight: {
    fontWeight: 500
    },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: 100,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10
    },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignItems: 'center',
    },
  pickerContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    },
    // darkmode
  darkBlock:{
    backgroundColor: '#505050',
    borderColor: "#505050",
    },
  lightBlock:{
    backgroundColor: '#E8E8E8',
    borderColor: "#E8E8E8",
    },
  darkText: {
    color: '#fff'
  },
  lightText: {
    color: '#000'
  },
});

export default TimePicker;