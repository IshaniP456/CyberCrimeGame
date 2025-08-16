import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@player_notes_v1';

export default function NotesScreen() {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setNotes(saved);
      } catch {}
    })();
  }, []);

  const save = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, notes);
      Alert.alert('Saved', 'Your notes are saved on this device.');
    } catch (e) {
      Alert.alert('Error', 'Could not save notes.');
    }
  };

  const clearNotes = async () => {
    setNotes('');
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.h2}>Your Notes</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Type your ideas / deductions…"
        multiline
        value={notes}
        onChangeText={setNotes}
      />
      <View style={styles.row}>
        <View style={styles.btn}><Button title="Save" onPress={save} /></View>
        <View style={styles.btn}><Button title="Clear" color="#cc3333" onPress={clearNotes} /></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#FFFDF7',
    borderWidth: 1,
    borderColor: '#E6DFA8',
  },
  h2: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  textarea: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 12,
    backgroundColor: '#FFFBE6',
    padding: 12,
    textAlignVertical: 'top',
    minHeight: 220,
  },
  row: { flexDirection: 'row', gap: 12, marginTop: 12 },
  btn: { flex: 1 }
});
