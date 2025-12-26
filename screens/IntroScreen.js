import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

export default function IntroScreen({ route, navigation }) {
  const { type } = route.params;
  const lottieRef = useRef(null);
  const sound = useRef(null);

  useEffect(() => {
    // Play animation and audio when screen loads
    playIntroAnimation();

    // Auto-transition to TracingScreen after 4 seconds
    const timer = setTimeout(() => {
      navigation.replace('Tracing', { type });
    }, 4000);

    return () => {
      clearTimeout(timer);
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  const playIntroAnimation = async () => {
    // Play Lottie animation
    if (lottieRef.current) {
      lottieRef.current.play();
    }

    // Play Gujarati voice audio
    try {
      const { sound: gujaratiSound } = await Audio.Sound.createAsync(
        require('../assets/gujarati-intro.mp3'),
        { shouldPlay: true }
      );
      sound.current = gujaratiSound;
    } catch (error) {
      console.log('Audio error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Cute Tiger Lottie Animation */}
      <LottieView
        ref={lottieRef}
        source={require('../assets/Cute Tiger.json')}
        autoPlay
        loop={false}
        style={styles.lottie}
      />
      
      {/* Gujarati Text Overlay */}
      <View style={styles.textOverlay}>
        <Text style={styles.gujaratiText}>
          આજે આપણે અક્ષરો લખતા શીખીએ!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: width * 0.85,
    height: height * 0.85,
  },
  textOverlay: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 3,
    borderColor: '#FF6B9D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  gujaratiText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 40,
  },
});
