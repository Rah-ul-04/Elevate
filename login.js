import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from '@firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';


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

// Welcome screen after authentication
const WelcomeScreen = ({ user, navigation }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome, {user.displayName || 'User'}!</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Continue" 
          onPress={() => navigation.navigate('MainHome')}
          color="#3498db" 
        />
      </View>
    </View>
  );
};

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
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
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
        
        await updateProfile(userCredential.user, {
          displayName: nickname
        });
        console.log(`User nickname set to: ${nickname}`);
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
      alert(error.message);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Welcome">
              {(props) => <WelcomeScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen 
              name="MainHome" 
              component={require('./Homescreen').default}
              options={{
                headerShown: false
              }}
            />
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
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
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
    color: '#3498db',
    textAlign: 'center',
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