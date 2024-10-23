import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Chatbot from './Chatbot';
import HomeScreen from './Homescreen'; // Import the HomeScreen

const Stack = createStackNavigator();

// ChatbotScreen component without the manual "Back to Home" button
const ChatbotScreen = () => {
  return (
    <Chatbot /> // Just render the Chatbot component
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* HomeScreen */}
        <Stack.Screen 
          name="Elevate" 
          component={HomeScreen} 
        />

        {/* ChatbotScreen with centered "Lisa" title */}
        <Stack.Screen 
          name="Lisa" 
          component={ChatbotScreen}
          options={{
            title: 'Lisa', // Set the screen title to "Lisa"
            headerTitleAlign: 'center', // Center the title in the header
            headerStyle: {
              backgroundColor: '#007AFF', // Customize header background color if needed
            },
            headerTintColor: '#fff', // Customize the title color
            headerTitleStyle: {
              fontWeight: 'bold', // Make the title bold
            },
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
