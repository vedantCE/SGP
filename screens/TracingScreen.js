import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

// Letter and number templates as dotted outlines
const LETTERS = {
  A: 'M 100 250 L 200 50 L 300 250 M 130 180 L 270 180',
  B: 'M 100 50 L 100 250 L 250 250 Q 300 250 300 200 Q 300 150 250 150 L 100 150 M 250 150 Q 300 150 300 100 Q 300 50 250 50 L 100 50',
  C: 'M 300 80 Q 250 50 200 50 Q 100 50 100 150 Q 100 250 200 250 Q 250 250 300 220',
};

const NUMBERS = {
  1: 'M 180 80 L 200 50 L 200 250 M 150 250 L 250 250',
  2: 'M 120 100 Q 120 50 200 50 Q 280 50 280 120 Q 280 150 200 180 L 120 250 L 280 250',
  3: 'M 120 70 Q 150 50 200 50 Q 250 50 250 100 Q 250 130 220 150 Q 250 170 250 220 Q 250 250 200 250 Q 150 250 120 230',
};

// Encouraging messages for children
const ENCOURAGING_MESSAGES = [
  'Great Job!',
  'Well Done!',
  'Amazing!',
  'Fantastic!',
  "You're a Star!",
  'Superb!',
  'Excellent!',
];

// Requires completing FULL letter - all 3 strokes for letter A
const POINT_THRESHOLD = 100; // Requires all parts of the letter
const DISTANCE_THRESHOLD = 60; // Requires completing all strokes

// Calculate distance between two points
const calculateDistance = (point1, point2) => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export default function TracingScreen({ route, navigation }) {
  const { type } = route.params;
  const [currentPath, setCurrentPath] = useState([]);
  const [drawingPaths, setDrawingPaths] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [currentItem, setCurrentItem] = useState(type === 'letters' ? 'A' : '1');
  
  // Auto-detection state
  const [hasMovement, setHasMovement] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [lastPoint, setLastPoint] = useState(null);
  
  const sound = useRef(null);
  const lottieRef = useRef(null);

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  // Auto-detection: Check if completion criteria are met
  // This runs automatically during drawing
  useEffect(() => {
    if (completed) return;

    // Trigger success if ALL 3 conditions are met:
    // 1. User has actually moved (not just press-and-hold)
    // 2. Enough distance traveled (ensures real tracing)
    // 3. Enough points drawn (minimum coverage)
    if (
      hasMovement &&
      totalDistance >= DISTANCE_THRESHOLD &&
      totalPoints >= POINT_THRESHOLD
    ) {
      triggerSuccess();
    }
  }, [hasMovement, totalDistance, totalPoints, completed]);

  const triggerSuccess = async () => {
    setCompleted(true);
    
    // Play success sound
    try {
      const { sound: successSound } = await Audio.Sound.createAsync(
        require('../assets/success.mp3'),
        { shouldPlay: true }
      );
      sound.current = successSound;
    } catch (error) {
      console.log('Sound error:', error);
    }

    // Play Lottie animation once
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  };

  const handleTouchStart = (event) => {
    // Prevent drawing after completion
    if (completed) return;
    
    const { locationX, locationY } = event.nativeEvent;
    const startPoint = { x: locationX, y: locationY };
    setCurrentPath([startPoint]);
    setLastPoint(startPoint);
  };

  const handleTouchMove = (event) => {
    // Prevent drawing after completion
    if (completed) return;
    
    const { locationX, locationY } = event.nativeEvent;
    const newPoint = { x: locationX, y: locationY };
    
    // Calculate distance from last point
    if (lastPoint) {
      const distance = calculateDistance(lastPoint, newPoint);
      setTotalDistance((prev) => prev + distance);
    }
    
    // Mark that actual movement has occurred (not just press-and-hold)
    if (!hasMovement) {
      setHasMovement(true);
    }
    
    setCurrentPath((prev) => [...prev, newPoint]);
    setTotalPoints((prev) => prev + 1);
    setLastPoint(newPoint);
    
    // Auto-detection will trigger via useEffect watching these state changes
  };

  const handleTouchEnd = () => {
    // Prevent drawing after completion
    if (completed) return;
    
    if (currentPath.length > 0) {
      setDrawingPaths((prev) => [...prev, currentPath]);
      setCurrentPath([]);
    }
    setLastPoint(null);
  };

  const resetDrawing = () => {
    setCurrentPath([]);
    setDrawingPaths([]);
    setCompleted(false);
    setHasMovement(false);
    setTotalPoints(0);
    setTotalDistance(0);
    setLastPoint(null);
    
    if (sound.current) {
      sound.current.unloadAsync();
    }
    
    if (lottieRef.current) {
      lottieRef.current.reset();
    }
  };

  const nextItem = () => {
    const items = type === 'letters' ? Object.keys(LETTERS) : Object.keys(NUMBERS);
    const currentIndex = items.indexOf(currentItem);
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentItem(items[nextIndex]);
    resetDrawing();
  };

  // Convert path array to SVG path string
  const pathToString = (path) => {
    if (path.length < 2) return '';
    let d = `M ${path[0].x} ${path[0].y}`;
    for (let i = 1; i < path.length; i++) {
      d += ` L ${path[i].x} ${path[i].y}`;
    }
    return d;
  };

  const template = type === 'letters' ? LETTERS[currentItem] : NUMBERS[currentItem];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Instructions */}
      <View style={styles.header}>
        <Text style={styles.instruction}>
          Trace the dotted {type === 'letters' ? 'letter' : 'number'}: {currentItem}
        </Text>
      </View>

      {/* Drawing Canvas */}
      <View
        style={styles.canvas}
        onStartShouldSetResponder={() => true}
        onResponderGrant={handleTouchStart}
        onResponderMove={handleTouchMove}
        onResponderRelease={handleTouchEnd}
      >
        <Svg width="100%" height="100%">
          {/* Dotted template */}
          <Path
            d={template}
            stroke="#BBBBBB"
            strokeWidth="8"
            strokeDasharray="10,10"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* User's completed paths */}
          {drawingPaths.map((path, index) => (
            <Path
              key={index}
              d={pathToString(path)}
              stroke="#FF6B9D"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          
          {/* Current drawing path */}
          {currentPath.length > 0 && (
            <Path
              d={pathToString(currentPath)}
              stroke="#FF6B9D"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </Svg>

        {/* Success Overlay - Trophy Animation Only */}
        {completed && (
          <View style={styles.successOverlay}>
            {/* Trophy Lottie Animation */}
            <LottieView
              ref={lottieRef}
              source={require('../assets/Cute bear dancing.json')}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
            
            {/* Simple Success Message */}
            <View style={styles.successContent}>
              <Text style={styles.successText}>Great Job!</Text>
            </View>
          </View>
        )}
      </View>

      {/* Control Buttons */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, styles.clearButton]}
          onPress={resetDrawing}
        >
          <Text style={styles.controlButtonText}>Clear</Text>
        </TouchableOpacity>

        {/* Done Button (Fallback) - Shows when user starts drawing */}
        {hasMovement && !completed && (
          <TouchableOpacity
            style={[styles.controlButton, styles.doneButton]}
            onPress={triggerSuccess}
          >
            <Text style={styles.controlButtonText}>Done</Text>
          </TouchableOpacity>
        )}

        {/* Next Button - Shows after completion */}
        {completed && (
          <TouchableOpacity
            style={[styles.controlButton, styles.nextButton]}
            onPress={nextItem}
          >
            <Text style={styles.controlButtonText}>Next {type === 'letters' ? 'Letter' : 'Number'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E6',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#6B9AFF',
  },
  instruction: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#6B9AFF',
    overflow: 'hidden',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    paddingBottom: 30,
  },
  controlButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    minWidth: 120,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#FF9966',
  },
  doneButton: {
    backgroundColor: '#FFD700',
  },
  nextButton: {
    backgroundColor: '#6BCF7F',
  },
  controlButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    position: 'absolute',
    width: width * 0.8,
    height: height * 0.8,
  },
  successContent: {
    alignItems: 'center',
    zIndex: 10,
  },
  successText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#6BCF7F',
    textAlign: 'center',
  },
});
