import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

function Home({ navigation }) {
  const [fontsLoaded] = useFonts({
    'GothamBold': require('./assets/fonts/GothamBold.ttf'),
    'Gotham-Thin': require('./assets/fonts/Gotham-Thin.otf'),
    'GothamLight': require('./assets/fonts/GothamLight.ttf'),
    'Gotham-Light': require('./assets/fonts/Gotham-Light.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />; // Show a loading screen until fonts are loaded
  }

  return (
    
    <LinearGradient colors={['rgba(255, 255, 255, 1.00)', 'rgba(255, 255, 255, 1.00)']} style={styles.container}>
      

      <View style={styles.welcomeText}>
        <Text style={[styles.greeting, { fontFamily: 'GothamBold' }]}>Hello,</Text>
        <Text style={styles.subtitle}>
          Join us on your journey to a <Text style={{ color: '#ff6337' }}>happy, healthy</Text> you.
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.largeCard}>
          <Text style={styles.cardTitle1}>L.I.S.A</Text>
          <Text style={styles.cardDescription}>
            Chat with our personalized chatbot and companion
          </Text>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.chatButtonText} onPress={() => navigation.navigate('ChatBot')}>Chat with Lisa</Text>
          </TouchableOpacity>
          <Image
            source={require('./assets/images/lisaChat.png')}
            style={styles.imageLisa}
          />
        </View>

        <View style={styles.smallCardContainer}>
          <TouchableOpacity style={styles.smallCard} onPress={() => navigation.navigate('Recommendations')}>
            <Text style={styles.cardTitle2}>Mood Tracker</Text>
            <Image
              source={require('./assets/images/MoodTracker.png')}
              style={styles.imageMTracker}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallCard} onPress={() => navigation.navigate('Diary')}>
            <Text style={styles.cardTitle3}>My Diary</Text>
            <Image
              source={require('./assets/images/MyDiary.png')}
              style={styles.imageMDiary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <Text style={styles.quote}>
        <Text style={styles.quoteTitle}>Quote for the day</Text>
        {"\n"}<Text style={{ fontFamily: 'Gotham-Light' }}>"You don't have to control your thoughts. You just have to stop letting them control you."
          — Dan Millman</Text>
      </Text>
    </LinearGradient>
  );
}

// Updated HomeScreen to pass navigation prop
export default function HomeScreen({ navigation }) {
  return (
    <Home navigation={navigation} /> // Pass navigation to Home
  );
}

const styles = StyleSheet.create({
    menuBtn: {
      marginTop: 30,
    },
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    welcomeText: {
      marginTop: 20,
    },
    greeting: {
      fontSize: 40,
      marginBottom: 10,
      color: '#333',
    },
    subtitle: {
      fontSize: 18,
      fontFamily: 'Gotham-Light',
      color: '#333',
      marginTop: 10,
      marginBottom: 40,
      lineHeight: 24,
    },
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    largeCard: {
      width: '52%', // Wider card for L.I.S.A on the left
      height: 340,
      paddingVertical: 20,
      paddingHorizontal: 10,
      // paddingBottom: 10,
      backgroundColor: '#f39071',
      borderRadius: 22,
      alignItems: 'center',
      shadowColor: '#000',
    //   shadowOffset: { width: 0, height: 1 },
    //   shadowOpacity: 0.2,
    //   shadowRadius: 4,
    //   elevation: 2,
      overflow: 'visible',
    },
    smallCardContainer: {
      width: '44%', // Right side stacked cards container
      justifyContent: 'space-between',
    },
    smallCard: {
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 10,
      backgroundColor: '#f39071',
      borderRadius: 22,
      alignItems: 'center',
      shadowColor: '#000',
    //   shadowOffset: { width: 0, height: 1 },
    //   shadowOpacity: 0.2,
    //   shadowRadius: 4,
    //   elevation: 2,
      marginBottom: 1, // Add space between stacked cards
    },
    cardTitle1: {
      fontSize: 20,
    //fontWeight: '800',
      fontFamily: 'GothamBold',
      color: 'white',
    },
    cardTitle2: {
      fontSize: 17,
    //fontWeight: '800',
      fontFamily: 'GothamBold',
      color: 'white',
    },
    cardTitle3: {
      fontSize: 20,
    //fontWeight: '800',
      fontFamily: 'GothamBold',
      color: 'white',
    },
    cardDescription: {
      fontSize: 14,
      fontFamily: 'Gotham-Light',
      color: 'white',
      textAlign: 'center',
      marginVertical: 10,
    },
    chatButton: {
        backgroundColor: 'rgba(246, 245, 240, 0.8)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 25,
        marginTop: 10,
        elevation: 6,
    },
    chatButtonText: {
        color: '#FF4500',
        // fontWeight: 'medium',
        fontFamily: 'GothamBold',   
        fontSize: 14,
    },
    imageLisa: {
      width: '120%', // Adjust width as needed
      height: 190, // Set height or adjust based on your layout
      marginBottom: 10,
      position: 'absolute',
      bottom: -32,
      right: -16,
    },
    imageMTracker: {
        width: '100%', // Adjust width as needed
        height: 90, // Set height or adjust based on your layout
        marginBottom: 10,
        position: 'relative',
        bottom: -12,
        right: 5,
    },
    imageMDiary: {
        width: '80%', // Adjust width as needed
        height: 90, // Set height or adjust based on your layout
        marginBottom: 10,
        position: 'relative',
        bottom: -12,
    },
    horizontalLine: {
        width: '80%',
        height: 2, // Thickness of the line
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Color of the line
        marginTop: 25, // Space above and below the line
        marginLeft: 30,
    },
    quote: {
      marginTop: 20,
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      fontStyle: 'italic',
    },
    quoteTitle: {
        // fontWeight: 'bold',
        fontFamily: 'GothamBold',
    },
  });
