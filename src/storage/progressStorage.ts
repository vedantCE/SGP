import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'LETTER_PROGRESS';

export type LetterProgress = {
  [letter: string]: number; // stars (0–3)
};

export const loadProgress = async (): Promise<LetterProgress> => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : { A: 0 };
};

export const saveProgress = async (progress: LetterProgress) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(progress));
};
