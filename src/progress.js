// src/progress.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'scenario_progress_v1';

// Get an object like { "1": true, "2": true, ... }
export async function getScenarioProgress() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading scenario progress', e);
    return {};
  }
}

// Mark a scenario as completed by id (number)
export async function setScenarioCompleted(id) {
  try {
    const existing = await getScenarioProgress();
    const key = String(id);
    const updated = { ...existing, [key]: true };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Error saving scenario progress', e);
  }
}

// 🚨 NEW: Reset ALL scenario progress
export async function resetScenarioProgress() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Error resetting scenario progress', e);
  }
}
