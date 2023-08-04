import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

const TimePicker = (props) => {
  const dispatch = useDispatch()

  const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false);
  const [selectedStartHour, setSelectedStartHour] = useState('');
  const [selectedEndHour, setSelectedEndHour] = useState('');

  const handleSubmit = () => {
    dispatch(updatePlanning())
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
    return hours.map((shour) => (
      <TouchableOpacity
        key={shour}
        style={styles.option}
        onPress={() => handleStartHourSelect(shour)}
      >
        <Text>{shour}</Text>
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

      <Text>{props.name}</Text>

      <TouchableOpacity style={styles.input} onPress={toggleStartPicker}>
        <Text>{selectedStartHour || 'Choisissez une heure'}</Text>
      </TouchableOpacity>
      {isStartPickerVisible && <View style={styles.pickerContainer}>{renderStartHours()}</View>}
      
      <TouchableOpacity style={styles.input} onPress={toggleEndPicker}>
        <Text>{selectedEndHour || 'Choisissez une heure'}</Text>
      </TouchableOpacity>
      {isEndPickerVisible && <View style={styles.pickerContainer}>{renderEndHours()}</View>}

      <TouchableOpacity style={styles.input} onPress={handleSubmit}>

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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: 200,
    alignItems: 'center',
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