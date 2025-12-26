import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>🎨 Trace & Learn 🎨</Text>
        <Text style={styles.subtitle}>Practice your letters and numbers!</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.letterButton]}
          onPress={() => navigation.navigate('Intro', { type: 'letters' })}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonEmoji}>✏️</Text>
          <Text style={styles.buttonText}>Trace Letters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.numberButton]}
          onPress={() => navigation.navigate('Intro', { type: 'numbers' })}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonEmoji}>🔢</Text>
          <Text style={styles.buttonText}>Trace Numbers</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Tap a button to start!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5B4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  letterButton: {
    backgroundColor: '#FF6B9D',
  },
  numberButton: {
    backgroundColor: '#6BCF7F',
  },
  buttonEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footer: {
    marginTop: 40,
    fontSize: 18,
    color: '#777',
    fontStyle: 'italic',
  },
});
