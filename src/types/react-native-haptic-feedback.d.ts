declare module 'react-native-haptic-feedback' {
  export type HapticOptions = {
    enableVibrateFallback?: boolean;
    ignoreAndroidSystemSettings?: boolean;
  };

  export function trigger(
    type:
      | 'impactLight'
      | 'impactMedium'
      | 'impactHeavy'
      | 'notificationSuccess'
      | 'notificationWarning'
      | 'notificationError'
      | 'selection',
    options?: HapticOptions,
  ): void;

  const HapticFeedback: {
    trigger: typeof trigger;
  };

  export default HapticFeedback;
}
