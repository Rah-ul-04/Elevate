import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Elevate</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Lisa')} // Navigate to ChatbotScreen
      >
        <Text style={styles.buttonText}>Talk with Lisa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF', // Button background color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 24, // Horizontal padding
    borderRadius: 25, // Rounded corners
    alignItems: 'center', // Center text
    margin: 10, // Margin around button
  },
  buttonText: {
    color: '#fff', // Text color
    fontSize: 16, // Text size
  },
});

export default HomeScreen;
