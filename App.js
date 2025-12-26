import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import IntroScreen from './screens/IntroScreen';
import TracingScreen from './screens/TracingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6B9AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Trace & Learn' }}
        />
        <Stack.Screen 
          name="Intro" 
          component={IntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Tracing" 
          component={TracingScreen}
          options={{ title: 'Start Tracing!' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
