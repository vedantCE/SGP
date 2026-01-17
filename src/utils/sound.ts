// // one central sound manager

// import { Audio } from 'expo-av';

// // Keeps sound instance in memory,Prevents reloading sound every time
// let successSound: Audio.Sound | null = null;

// export async function playSuccessSound() {
//   try {
//     if (!successSound) {
//       const { sound } = await Audio.Sound.createAsync( //Loads mp3 into memory,Prepares it for playback
//         require('../assets/sounds/success.wav'),
//         { shouldPlay: true }
//       );
//       successSound = sound;
//     } else {
//       await successSound.replayAsync();  //Replays already-loaded sound
//     }
//   } catch (e) {
//     console.log('Sound error:', e);
//   }
// }

// //  This Function do -->Frees memory
// // Prevents app crash on navigation
// // VERY important on Android
// export async function unloadSounds() {
//   if (successSound) {
//     await successSound.unloadAsync();
//     successSound = null;
//   }
// }

// Loads sound once
// Avoids lag
// Reusable everywhere
import Sound from 'react-native-sound';

// Ensures sound plays even in silent mode
Sound.setCategory('Playback');

const successSound = new Sound(
  'success.wav',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) console.log('Sound load error', error);
  },
);

const failSound = new Sound(
  'fail.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) console.log('Sound load error', error);
  },
);

export const playSuccess = () => {
  successSound.stop(() => successSound.play());
};

export const playFail = () => {
  failSound.stop(() => failSound.play());
};
