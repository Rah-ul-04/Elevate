import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image, Dimensions, Linking } from 'react-native';
import { Audio } from 'expo-av';
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');

export default function App() {
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState(null);
  const [songList, setSongList] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [fontsLoaded] = useFonts({
    'GothamBold': require('./assets/fonts/Gotham-Light.otf'),
    'GothamBold': require('./assets/fonts/Gotham-Bold.otf'),
  });

  const moodQuestions = [
    { question: "How are you feeling today?", options: ["Happy", "Sad", "Inspiring", "Relaxed"] },
    { question: "How was your day today?", options: ["Excellent", "Good", "OK-ish", "Bad"] },
  ];

  const songRecommendations = {
    Happy: [
      { title: "Happy - Pharrell Williams", source: require('./assets/music/Happy/Pharrell Williams - Happy (Video).mp3'), image: require('./assets/music/Happy/williams.jpeg') },
      { title: "Dancing - Aaron Smith", source: require('./assets/music/Happy/Aaron Smith - Dancin - Krono Remix (Official Video) ft. Luvli.mp3'), image: require('./assets/music/Happy/download.jpeg') },
      { title: "Feeling - Justin Timberlake", source: require('./assets/music/Happy/Aaron Smith - Dancin - Krono Remix (Official Video) ft. Luvli.mp3'), image: require('./assets/music/Happy/justin.jpeg') },
    ],
    Sad: [
      { title: "Losing Interest-Stract", source: require('./assets/music/Calm/Stract - Losing Interest (Remix) [Lyrics] ft. Burgettii & Shiloh Dynasty.mp3'), image: require('./assets/music/Happy/williams.jpeg') },
      { title: "Yellow - Coldplay", source: require('./assets/music/Calm/Yellow - Coldplay (LyricsVietsub).mp3'), image: require('./assets/music/Happy/download.jpeg') },
      { title: "Mystery of Love-Stevens", source: require('./assets/music/Calm/Sufjan Stevens - Mystery of Love (From Call Me By Your Name Soundtrack).mp3'), image: require('./assets/music/Happy/justin.jpeg') },
    ],
    Relaxed: [
      { title: "Losing Interest-Stract", source: require('./assets/music/Happy/Pharrell Williams - Happy (Video).mp3'), image: require('./assets/music/Calm/stract.jpeg') },
      { title: "Yellow - Coldplay", source: require('./assets/music/Happy/Aaron Smith - Dancin - Krono Remix (Official Video) ft. Luvli.mp3'), image: require('./assets/music/Calm/coldplay.jpeg') },
      { title: "Mystery of Love-Stevens", source: require('./assets/music/Happy/Aaron Smith - Dancin - Krono Remix (Official Video) ft. Luvli.mp3'), image: require('./assets/music/Calm/steve.jpeg') },
    ],
    Inspiring: [
      { title: "Hall of Fame-The Script", source: require('./assets/music/inspiring/The Script - Hall Of Fame (Lyrics).mp3'), image: require('./assets/music/inspiring/script.jpeg') },
      { title: "Not Afraid-Eminem", source: require('./assets/music/inspiring/Eminem - Not Afraid (Lyrics).mp3'), image: require('./assets/music/inspiring/em.jpeg') },
      { title: "Unstopabble-Sia", source: require('./assets/music/inspiring/Sia - Unstoppable (Lyrics).mp3'), image: require('./assets/music/inspiring/sia.jpeg') },
    ],
    // Additional songs for other moods...
  };

  const bookRecommendations = {
    Happy: [
      { title: "Greenlights-Mathew McCanaughey", url: "https://www.audible.in/pd/Greenlights-Audiobook/B0BKR1HT8M?eac_link=FCm6fGmhpijp&ref=web_search_eac_asin_1&eac_selected_type=asin&eac_selected=B0BKR1HT8M&qid=iyj9v9aXT2&eac_id=261-2834541-7007456_iyj9v9aXT2&sr=1-1", image: require('./assets/books/Happy/52838315.jpg') },
      { title: "Happily Ever Afters - Chade-Meng-Shey ", url: "https://play.google.com/store/books/details?_bbid=238558134&_bbreg=us&_bbtype=blog&id=U2DbDwAAQBAJ", image: require('./assets/books/Happy/download.jpeg') },
      { title: "Heaven and Earth Grocery Store-James Mcbride", url: "https://play.google.com/store/books/details?_bbid=238397710&_bbreg=us&_bbtype=blog&id=D-GgEAAAQBAJ", image: require('./assets/books/Happy/james.jpeg') },
    ],
    Sad: [
      { title: "Greenlights-Mathew McCanaughey", url: "https://www.audible.in/pd/Greenlights-Audiobook/B0BKR1HT8M?eac_link=FCm6fGmhpijp&ref=web_search_eac_asin_1&eac_selected_type=asin&eac_selected=B0BKR1HT8M&qid=iyj9v9aXT2&eac_id=261-2834541-7007456_iyj9v9aXT2&sr=1-1", image: require('./assets/books/Happy/52838315.jpg') },
      { title: "Happily Ever Afters - Chade-Meng-Shey ", url: "https://play.google.com/store/books/details?_bbid=238558134&_bbreg=us&_bbtype=blog&id=U2DbDwAAQBAJ", image: require('./assets/books/Happy/download.jpeg') },
      { title: "Heaven and Earth Grocery Store-James Mcbride", url: "https://play.google.com/store/books/details?_bbid=238397710&_bbreg=us&_bbtype=blog&id=D-GgEAAAQBAJ", image: require('./assets/books/Happy/james.jpeg') },
    ],
    Relaxed: [
      { title: "Ikigai-Keira Miki ", url: "https://play.google.com/store/books/details/Keira_Miki_Ikigai_Japanese_Art_of_staying_Young_Wh?id=N5llEAAAQBAJ", image: require('./assets/books/Calm/ikigai.jpeg') },
      { title: "Mindfulness-Thich Nhat ", url: "https://play.google.com/store/books/details/Thich_Nhat_Hanh_The_Miracle_of_Mindfulness?id=uSIRAAAAQBAJ", image: require('./assets/books/Calm/mindful.jpeg') },
      { title: "The Alchemist-Paoulo Cohelo", url: "https://play.google.com/store/books/details/Paulo_Coelho_The_Alchemist?id=FzVjBgAAQBAJ", image: require('./assets/books/Calm/alchem.jpeg') },
    ],
    Inspiring: [
      { title: "Atomic Habits-Janmes Clear ", url: "https://play.google.com/store/books/details/James_Clear_Atomic_Habits?id=fFCjDQAAQBAJ", image: require('./assets/books/inspiring/atom.jpeg') },
      { title: "Life Worth Living ", url: "https://play.google.com/store/books/details/Miroslav_Volf_Life_Worth_Living?id=3T1uEAAAQBAJ", image: require('./assets/books/inspiring/life.jpeg') },
      { title: "Becoming Michelle Obama", url: "https://play.google.com/store/books/details/Michelle_Obama_Becoming?id=I3lNDwAAQBAJ", image: require('./assets/books/inspiring/michelle.jpeg') },
    ],
    // Additional books for other moods...
  };

  const handleOptionSelect = (option) => {
    if (step === 1) {
      setSelectedMood(option);
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setSongList(songRecommendations[selectedMood] || []);
        setBookList(bookRecommendations[selectedMood] || []);
        setLoading(false);
        setStep(step + 1);
      }, 2000); // Simulating a loading time
    }
  };

  const playSong = async (song) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(song.source);
    setSound(newSound);
    await newSound.playAsync();
  };

  const openBookLink = (url) => {
    Linking.openURL(url);
  };

  const restartQuiz = () => {
    setStep(1);
    setSelectedMood(null);
    setSongList([]);
    setBookList([]);
    if (sound) {
      sound.unloadAsync();
    }
  };

  return (
    <View style={[styles.container, step <= moodQuestions.length && styles.centerContainer]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {step <= moodQuestions.length ? (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{moodQuestions[step - 1].question}</Text>
            {moodQuestions[step - 1].options.map((option) => (
              <TouchableOpacity key={option} style={styles.optionButton} onPress={() => handleOptionSelect(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : loading ? (
          <ActivityIndicator size="large" color="#555" />
        ) : (
          <View>
            <Text style={styles.questionText}>Recommended Songs:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.songScrollView}>
              {songList.map((song) => (
                <View key={song.title} style={styles.songContainer}>
                  <Image source={song.image} style={styles.songImage} />
                  <Text style={styles.songTitle}>{song.title}</Text>
                  <TouchableOpacity style={styles.playButton} onPress={() => playSong(song)}>
                    <Text style={styles.playButtonText}>Play</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <View style={styles.booksSection}>
              <Text style={styles.questionText}>Recommended Books:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bookScrollView}>
                {bookList.map((book) => (
                  <View key={book.title} style={styles.bookContainer}>
                    <Image source={book.image} style={styles.bookImage} />
                    <Text style={styles.bookTitle}>{book.title}</Text>
                    <TouchableOpacity style={styles.readButton} onPress={() => openBookLink(book.url)}>
                      <Text style={styles.readButtonText}>Read</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        )}
      </ScrollView>
      
      {/* Render the restart button only if the step is greater than the length of moodQuestions */}
      {step > moodQuestions.length && (
        <TouchableOpacity onPress={restartQuiz} style={styles.restartButton}>
          <Text style={styles.restartText}>Try Mood Tracker</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  centerContainer: {
    justifyContent: 'center',
    marginTop: 220,
  },
  scrollViewContent: {
    paddingBottom: 150,
  },
  questionContainer: {
    alignItems: 'center',
  },
  questionText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'GothamBold',
  },
  optionButton: {
    backgroundColor: '#f39071',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    width: 0.8 * width,
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'GothamBold',
  },
  songScrollView: {
    marginTop: 10,
  },
  songContainer: {
    width: 0.55 * width,
    marginHorizontal: 9,
    borderRadius: 15,
    overflow: 'hidden',
    height: 310,
    backgroundColor:'#f39071' // Increased height for better display
  },
  songImage: {
    width: 225,
    height: 225,
    resizeMode: 'cover',
  },
  songTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'GothamBold',
    marginVertical: 5,
    position:"absolute",
    top:230,
    left:20
  },
  playButton: {
    backgroundColor: '#f39071',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop:50
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'GothamBold',
  },
  booksSection: {
    marginTop: 30,
  },
  bookScrollView: {
    marginTop: 10,
  },
  bookContainer: {
    width: 0.55 * width,
    marginHorizontal: 12,
    borderRadius: 15,
    overflow: 'hidden',
    height: 390, 
    backgroundColor:'#f39071'// Increased height for better display
  },
  bookImage: {
    width: 220,
    height: 310,
    resizeMode: 'cover',
  },
  bookTitle: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'GothamBold',
    marginVertical: 5,
  },
  readButton: {
    backgroundColor: '#f39071',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  readButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'GothamBold',
  },
  restartButton: {
    backgroundColor: '#f39071',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    width:200,
    marginLeft:.25*width  },
  restartText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'GothamBold',
  },
});
