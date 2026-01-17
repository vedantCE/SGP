import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CanvasScreen from './src/screens/CanvasScreen';
import LetterGridScreen from './src/screens/LetterGridScreen';
import { ALPHABET } from './src/constants/Alphabet';
import {
  loadProgress,
  saveProgress,
} from './src/storage/progressStorage';


//  Score → Stars
const getStarsFromScore = (score: number): number => {
  if (score >= 90) return 3;
  if (score >= 80) return 2;
  if (score >= 70) return 1;
  return 0;
};

export default function App() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  /**
   * Progress map:
   * {
   *   A: 2,
   *   B: 0,
   *   C: 1
   * }
   */
  const [progress, setProgress] = useState<Record<string, number>>({
    A: 0,
  });

  // Load saved progress on app start
  useEffect(() => {
    loadProgress().then(setProgress);
  }, []);

  /**
   * Called from CanvasScreen when tracing ends
   */
  const handleComplete = (letter: string, stars: number) => {
  // unlock only if at least 1 star
  if (stars < 1) return;

  setProgress(prev => {
    const updated = {
      ...prev,
      // keep highest stars earned for this letter
      [letter]: Math.max(prev[letter] || 0, stars),
    };

    // unlock next letter
    const index = ALPHABET.indexOf(letter);
    const nextLetter = ALPHABET[index + 1];

    if (nextLetter && updated[nextLetter] === undefined) {
      updated[nextLetter] = 0; // unlocked but not completed
    }

    saveProgress(updated);
    return updated;
  });
};


  return (
    <GestureHandlerRootView style={styles.root}>
      {selectedLetter ? (
        <CanvasScreen
          letter={selectedLetter}
          onBack={() => setSelectedLetter(null)}
          onComplete={handleComplete}
        />
      ) : (
        <LetterGridScreen
          progress={progress}
          onSelect={setSelectedLetter}
        />
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
