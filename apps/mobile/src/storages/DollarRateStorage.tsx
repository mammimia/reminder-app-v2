import AsyncStorage from '@react-native-async-storage/async-storage';

const DOLLAR_RATE_KEY = 'dollarRate';

async function saveDollarRate(rate: number) {
  try {
    await AsyncStorage.setItem(DOLLAR_RATE_KEY, rate.toString());
  } catch (error) {
    console.error('Error saving dollar rate', error);
  }
}

async function getDollarRate(): Promise<number> {
  try {
    const rate = await AsyncStorage.getItem(DOLLAR_RATE_KEY);
    return rate ? parseFloat(rate) : 0;
  } catch (error) {
    console.error('Error getting dollar rate', error);
    return 0;
  }
}

export const DollarRateStorage = {
  saveDollarRate,
  getDollarRate,
};
