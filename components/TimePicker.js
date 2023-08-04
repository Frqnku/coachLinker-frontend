import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TimePicker = () => {
  const [isPickerVisible, setPickerVisibility] = useState(false);
  const [selectedHour, setSelectedHour] = useState('');

  const togglePicker = () => {
    setPickerVisibility(!isPickerVisible);
  };

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
    setPickerVisibility(false);
  };

  const renderHours = () => {
    const hours = ['Je veux pas','08:00','09:00','10:00','11:00', '12:00','13:00','14:00','15:00','16:00','17:00', '18:00','19:00','20:00', '21:00','22:00', '23:00']; // Ajoutez plus d'options d'heures
    return hours.map((hour) => (
      <TouchableOpacity
        key={hour}
        style={styles.option}
        onPress={() => handleHourSelect(hour)}
      >
        <Text>{hour}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.input} onPress={togglePicker}>
        <Text>{selectedHour || 'Choisissez une heure'}</Text>
      </TouchableOpacity>
      {isPickerVisible && <View style={styles.pickerContainer}>{renderHours()}</View>}
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