import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { useFonts } from 'expo-font';

const ChatBubble = ({ role, text, onSpeech }) => {
  const [fontsLoaded] = useFonts({
    'GothamBold': require('./assets/fonts/Gotham-Bold.otf'),
  });
  return (
    <View
      style={[
        styles.chatItem,
        role === "user" ? styles.userChatItem : styles.modelChatItem, // Distinguish by role
      ]}
    >
      <Text style={styles.chatText}>{text}</Text>
      {role === "model" && (
        <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
          <Ionicons name="volume-high-outline" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    position: "relative",
  },
  userChatItem: {
    alignSelf: "flex-end", // Aligns user's chat on the right side
    backgroundColor: "#9bb1fd", // User chat background color
  },
  modelChatItem: {
    alignSelf: "flex-start", // Aligns model/chatbot chat on the left side
    backgroundColor: "#f39071", // Chatbot chat background color
  },
  chatText: {
    fontSize: 16,
    color: "#fff",
    fontFamily:"GothamBold" // Ensure text is visible
  },
  speakerIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
});

export default ChatBubble;
