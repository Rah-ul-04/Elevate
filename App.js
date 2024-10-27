import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from '@firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Homescreen';
import DiaryScreen from './DiaryScreen';
import RecommendationScreen from './Recommendation';
import ChatBotScreen from './Chatbot';
import { useFonts } from 'expo-font';

const firebaseConfig = {
  apiKey: "AIzaSyDJdsA4ttmGigfxIy3lG35RolVw1e6j6UQ",
  authDomain: "elevate-213a2.firebaseapp.com",
  projectId: "elevate-213a2",
  storageBucket: "elevate-213a2.appspot.com",
  messagingSenderId: "934630337707",
  appId: "1:934630337707:web:1ea127edbf5a55c4949bee",
  measurementId: "G-9RKBVQFB2J"
};


const app = initializeApp(firebaseConfig);
const Stack = createNativeStackNavigator();

const AuthScreen = ({ email, setEmail, password, setPassword, nickname, setNickname, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      {!isLogin && (
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="Nickname"
          autoCapitalize="words"
        />
      )}
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#f39071" />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
};

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully!');
      } else {
        if (!nickname.trim()) {
          alert('Please enter a nickname');
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: nickname });
        console.log(`User nickname set to: ${nickname}`);
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
      alert(error.message);
    }
  };

  const [fontsLoaded] = useFonts({
    'GothamBold': require('./assets/fonts/Gotham-Bold.otf'),
  });

  if (!fontsLoaded) {
    return null; // Prevent rendering until the font is loaded
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Home" : "Auth"}
        screenOptions={{
          headerTitleStyle: { fontFamily: 'GothamBold' },
          headerShadowVisible: false,
          headerStyle: {
            borderBottomWidth: 0,
          },
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="Diary" component={DiaryScreen} options={{ title: 'Diary' }} />
            <Stack.Screen name="Recommendations" component={RecommendationScreen} options={{ title: 'Mood Tracker' }} />
            <Stack.Screen name="ChatBot" component={ChatBotScreen} options={{ title: 'Chat with Lisa' }} />
          </>
        ) : (
          <Stack.Screen name="Auth">
            {(props) => (
              <AuthScreen
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                nickname={nickname}
                setNickname={setNickname}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                handleAuthentication={handleAuthentication}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily:"GothamBold"
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    width: '100%',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginBottom: 16,
    width: '100%',
  },
  toggleText: {
    color: '#f39071',
    textAlign: 'center',
    fontFamily:'GothamBold'
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;
