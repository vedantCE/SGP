import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { successHaptic } from '../utils/haptics';
import { LETTER_PATHS, LETTER_POINTS } from '../constants/LetterPaths';
import { validateTracing } from '../utils/tracingValidator';
// import { unloadSounds } from '../utils/sound';
// import { playSuccessSound } from '../utils/sound';
import HapticFeedback from 'react-native-haptic-feedback';
import { playSuccess, playFail } from '../utils/sound';

const { width } = Dimensions.get('window');

//Convert points array → SVG path string
const pointsToPath = (pts: { x: number; y: number }[]) => {
  if (pts.length === 0) return '';
  return pts.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : acc + ` L ${p.x} ${p.y}`),
    '',
  );
};

type Props = {
  letter: keyof typeof LETTER_PATHS;
  onBack: () => void;
  onComplete: (letter: string, score: number) => void;
};

export default function CanvasScreen({ letter, onBack, onComplete }: Props) {
  console.log('CanvasScreen rendered for letter:', letter);

  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [score, setScore] = useState<number | null>(null);

/*  Cleanup Effect 
    This runs when screen unmounts
     Prevents:
     -->memory leaks
     -->Android red screen
     -->“Sound already loaded” errors   */
//   useEffect(() => {
//   return () => {
//     unloadSounds();
//   };
// }, []);

  //gesture logic 
  const pan = Gesture.Pan()
    .onBegin(e => {
      setPoints([{ x: e.x, y: e.y }]);
      setScore(null);
    })
    .onUpdate(e => {
      setPoints(prev => [...prev, { x: e.x, y: e.y }]);
    })
 

     .onEnd(async () => {
      const guidePoints = LETTER_POINTS[letter];
      if (!guidePoints) return;

      const result = validateTracing(guidePoints, points);
      console.log('Tracing score:', result);

      setScore(result);

      //score → stars
      let stars = 0;
      if (result >= 90) stars = 3;
      else if (result >= 80) stars = 2;
      else if (result >= 70) stars = 1;

      // Send STARS to App.tsx (NOT percentage)
      onComplete(letter, result);

      if (result >= 70) {
    // ✅ Correct tracing
    playSuccess();
    HapticFeedback.trigger('notificationSuccess');
  } else {
    // ❌ Incorrect tracing
    playFail();
    HapticFeedback.trigger('notificationError');
  }
    });

  const clearDrawing = () => {
    setPoints([]);
    setScore(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.debugText}>🖍️ Trace Letter {letter}</Text>
      <Text onPress={onBack} style={styles.backBtn}>
        ← Back
      </Text>

      <GestureDetector gesture={pan}>
        <View style={styles.canvas}>
          {/* CLEAR BUTTON */}
          <View style={{ padding: 12 }}>
            <Text onPress={clearDrawing} style={styles.clearBtn}>
              Clear Drawing
            </Text>
          </View>

          {/* FEEDBACK */}
          {score !== null && (
            <Text
              style={[
                styles.scoreText,
                { color: score >= 70 ? '#16A34A' : '#DC2626' },
              ]}
            >
              {score >= 70 ? '🎉 Good Job!' : '✏️ Try Again'} ({score}%)
            </Text>
          )}

          <Svg width="100%" height="100%" viewBox="0 0 300 350">
            {/* LETTER GUIDE */}
            <Path
              d={LETTER_PATHS[letter]}
              stroke="#CBD5E1"
              strokeWidth={12}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* USER DRAWING */}
            <Path
              d={pointsToPath(points)}
              stroke="#2563EB"
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: 40,
  },
  debugText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 10,
  },
  canvas: {
    width: width - 40,
    height: width - 40,
    marginHorizontal: 20,
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0284C7',
    overflow: 'hidden',
  },
  clearBtn: {
    backgroundColor: '#EF4444',
    color: 'white',
    padding: 12,
    textAlign: 'center',
    borderRadius: 8,
    fontWeight: '600',
  },
  scoreText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  backBtn: {
    marginLeft: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
});

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function CanvasScreen() {
//   console.log('CanvasScreen rendered');

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>CANVAS SCREEN LOADED</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#cd1919',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 22,
//     color: 'black',
//     fontWeight: 'bold',
//   },
// });
