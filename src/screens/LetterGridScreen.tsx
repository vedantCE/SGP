import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ALPHABET } from '../constants/Alphabet';

type Props = {
  progress: Record<string, number>; // { A: 2, B: 0, C: 1 }
  onSelect: (letter: string) => void;
};

export default function LetterGridScreen({ progress, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Letter</Text>

      <View style={styles.grid}>
        {ALPHABET.map(letter => {
          //CHANGE 1: safely read stars, default to -1 if locked
          const rawStars = progress[letter];
          const unlocked = rawStars !== undefined;

          // CHANGE 2: cap stars to MAX 3
          const stars = unlocked ? Math.min(rawStars, 3) : 0;

          return (
            <Pressable
              key={letter}
              onPress={() => unlocked && onSelect(letter)}
              style={({ pressed }) => [
                styles.card,
                !unlocked && styles.lockedCard,
                pressed && unlocked && styles.pressedCard,
              ]}
            >
              {unlocked ? (
                <>
                  <Text style={styles.letter}>{letter}</Text>

                  {/*CHANGE 3: controlled star rendering */}
                  {stars > 0 && (
                    <View style={styles.starsRow}>
                      {Array.from({ length: stars }).map((_, i) => (
                        <Text key={i} style={styles.star}>
                          ⭐
                        </Text>
                      ))}
                    </View>
                  )}
                </>
              ) : (
                <Text style={styles.lockIcon}>🔒</Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F8FAFC',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0F172A',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 80,
    height: 90,
    margin: 10,
    backgroundColor: '#E0F2FE',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0284C7',
  },
  pressedCard: {
    transform: [{ scale: 0.96 }],
  },
  lockedCard: {
    backgroundColor: '#E5E7EB',
    borderColor: '#9CA3AF',
  },
  letter: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  //CHANGE: prevent vertical star stacking
  starsRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  star: {
    fontSize: 14,
    marginHorizontal: 1,
  },

  lockIcon: {
    fontSize: 26,
  },
});
