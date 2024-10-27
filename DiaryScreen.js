// DiaryScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you've installed this library

export default function DiaryScreen() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [entry, setEntry] = useState('');

  const [fontsLoaded] = useFonts({
    'GothamBold': require('./assets/fonts/GothamBold.ttf'),
    'Gotham-Light': require('./assets/fonts/Gotham-Light.otf'),
  });

  const navigation = useNavigation(); // Get navigation object

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { fontFamily: 'GothamBold' }]}>My Diary</Text>
      
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>
          {date.toDateString()}
        </Text>
      </TouchableOpacity>
      
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={onChangeDate}
        />
      )}

      <ScrollView contentContainerStyle={styles.entryContainer}>
        <TextInput
          style={styles.entryInput}
          multiline
          placeholder="Write about your day..."
          placeholderTextColor="#888"
          value={entry}
          onChangeText={setEntry}
          textAlignVertical="top"
        />
      </ScrollView>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Entry</Text>
      </TouchableOpacity>

      {/* Back Button with Left Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#FFF" />
        {/* <Text style={styles.backButtonText}>Back</Text> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f39071',
      padding: 20,
    },
    header: {
      fontSize: 30,
      color: '#FFF',
      textAlign: 'center',
      marginVertical: 20,
    },
    dateButton: {
      backgroundColor: '#FFF',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20,
    },
    dateText: {
      fontSize: 18,
      color: '#333',
      fontFamily: 'GothamBold',
    },
    entryContainer: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 15,
    },
    entryInput: {
      fontSize: 16,
      fontFamily: 'Gotham-Light',
      color: '#333',
      minHeight: 390,
      maxHeight: 500,
    },
    saveButton: {
      backgroundColor: '#fff',
      padding: 12,
      borderRadius: 25,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 110,
    },
    saveButtonText: {
      color: '#ff6337',
      fontSize: 16,
      fontFamily: 'GothamBold',
    },
    backButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: 10,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    backButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'GothamBold',
    },
});
