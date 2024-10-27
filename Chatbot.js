import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import axios from "axios";
import ChatBubble from "./ChatBubble";
import { speak, isSpeakingAsync, stop } from "expo-speech";
import { useFonts } from 'expo-font';



const Chatbot = () => {
  // Initialize chat with system instructions
  const [chat, setChat] = useState([
    {
      role: "model",
      parts: [{
        text: "You are Lisa, a friendly and knowledgeable AI assistant. Your personality traits are:\n" +
              "1. Always maintain a friendly and professional tone\n" +
              "2. Provide clear, concise, and accurate information\n" +
              "3. Use simple language and avoid technical jargon\n" +
              "4. If unsure, honestly admit it\n" +
              "5. Occasionally use emojis to be engaging\n" +
              "6. Help users with their questions while being supportive\n" +
              "7. Maintain context throughout the conversation\n" +
              "8. Break down complex concepts into simpler explanations\n"+
              "9. Act like a proffesional psychologist\n"+
              "10.If user asks anything or requests anything other than something that affects their mental wellbeing just reply that my job is to take care of your mental health and if you have questions regarding that ill help you\n"+
              "11.If they ask you to do anything for fun until you are sure its going to make them happy dont do it dont be victim of abuse"
      }]
    }
  ]);
  
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [fontsLoaded] = useFonts({
    'GothamBold': require('./assets/fonts/Gotham-Bold.otf'),
  });
  const API_KEY = 'AIzaSyCO9WP87ZDFY_F4mV2TeKGx8tTq42H7AqA';
  
  const handleUserInput = async () => {
    if (!userInput.trim()) return;
  
    let updatedChat = [
      ...chat, // Includes the system instructions
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ];
    
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
          generationConfig: {
            temperature: 0.7,     // Controls response creativity
            topP: 0.8,           // Controls response diversity
            topK: 40,            // Controls response focus
            maxOutputTokens: 1000 // Maximum length of response
          }
        }
      );
  
      const modelResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  
      if (modelResponse) {
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role: "model",
            parts: [{ text: modelResponse }],
          },
        ];
        setChat(updatedChatWithModel);
        setUserInput("");
      }
    } catch (error) {
      console.error("Error calling Gemini", error);
      setError(error?.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = async (text) => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else {
      if (!(await isSpeakingAsync())) {
        speak(text);
        setIsSpeaking(true);
      }
    }
  };

  const renderChatItem = ({ item }) => (
    <ChatBubble
      role={item.role}
      text={item.parts[0].text}
      onSpeech={() => handleSpeech(item.parts[0].text)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chat.slice(1)} // Skip showing the instruction message
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          placeholderTextColor={"#aaa"}
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity style={styles.button} onPress={handleUserInput}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator style={styles.loading} color="#333" />}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 50,
    marginRight: 10,
    padding: 8,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 25,
    color: "#333",
  },
  button: {
    backgroundColor: "rgba(243, 144, 113, 1.00)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily:"GothamBold"
  },
  loading: {
    marginTop: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default Chatbot;