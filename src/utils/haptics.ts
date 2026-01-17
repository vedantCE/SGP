import * as Haptics from 'expo-haptics';

export function successHaptic() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}
// Haptics.notificationAsync -->This triggers:
//  -->Short vibration
//  -->System-native feedback
//  -->Feels natural on phone