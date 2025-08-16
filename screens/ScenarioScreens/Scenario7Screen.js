// screens/ScenarioScreens/Scenario7Screen.js
import React, { useEffect, useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TextInput,
  Pressable, KeyboardAvoidingView, Platform, Alert, Modal, Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';
import { characters } from '../../data/characters';

const NOTES_KEY = 'scenario7_notes_v1';
const CORRECT_NAME = 'Sania George';

function HeroImage({ source }) {
  const asset = Image.resolveAssetSource(source);
  const aspect = asset?.width && asset?.height ? asset.width / asset.height : 3 / 4;
  return (
    <Image source={source} resizeMode="contain" style={[styles.hero, { width: '100%', height: undefined, aspectRatio: aspect }]} />
  );
}

export default function Scenario7Screen() {
  const insets = useSafeAreaInsets();
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [picked, setPicked] = useState(null);

  const correctId = useMemo(() => characters.find(c => c.name === CORRECT_NAME)?.id, []);

  useEffect(() => { (async () => { try { const v = await AsyncStorage.getItem(NOTES_KEY); if (v) setNotes(v); } catch {} })(); }, []);

  const onSave = async () => {
    try { setSaving(true); await AsyncStorage.setItem(NOTES_KEY, notes); Alert.alert('Saved', 'Your notes were saved on this device.'); }
    catch { Alert.alert('Error', 'Could not save notes.'); }
    finally { setSaving(false); }
  };

  const onPick = (id) => { const right = id === correctId; setPicked(id); setIsCorrect(right); setShowResult(true); };

  return (
    <KeyboardAvoidingView style={[styles.root, { paddingTop: insets.top }]} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.kicker}>Scenario #7</Text>
        <Text style={styles.title}>Fake job offers / fake DMV messages with malicious links</Text>

        <HeroImage source={require('../../assets/scenarios/fakejob1.png')} />

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.body}>
            Individuals have reported receiving direct messages and emails claiming to be from the DMV or a legitimate
            company offering remote job opportunities. These messages use urgent language and a shortened link to push
            quick clicks. Following the link leads to a fake login page that downloads malware.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Task</Text>
          <Text style={styles.body}>Figure out who has been sending the messages.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Clues</Text>
          <Bullet>The sender’s email/username closely mimics an official one but contains slight misspellings (“dmvnotice.org” vs “dmv-notice.gov”).</Bullet>
          <Bullet>Some job offer messages reference real job apps.</Bullet>
          <Bullet>Messages typically arrive early morning or late night, outside normal business hours.</Bullet>
          <Bullet>The phone number was traced to an external country, indicating a VPN.</Bullet>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Who did it?</Text>
          <Text style={styles.help}>Tap a character to make your guess.</Text>

          <View style={styles.grid}>
            {characters.map((c) => (
              <Pressable key={c.id} style={styles.item} onPress={() => onPick(c.id)}>
                <Image source={c.image} style={styles.avatar} />
                <Text style={styles.name} numberOfLines={1}>{c.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.help}>Jot ideas here. Saved locally on this device.</Text>
          <TextInput value={notes} onChangeText={setNotes} placeholder="Type your notes..." placeholderTextColor="#9aa0a6" multiline textAlignVertical="top" style={styles.input} />
          <Pressable onPress={onSave} style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}>
            <Text style={styles.buttonText}>{saving ? 'Saving…' : 'Save Notes'}</Text>
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      <ResultModal visible={showResult} correct={isCorrect} onClose={() => setShowResult(false)} />
    </KeyboardAvoidingView>
  );
}

function Bullet({ children }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.dot} />
      <Text style={styles.body}>{children}</Text>
    </View>
  );
}

function ResultModal({ visible, correct, onClose }) {
  const { width } = Dimensions.get('window');
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalCard, correct ? styles.okBorder : styles.errBorder]}>
          <Text style={[styles.resultTitle, correct ? styles.okText : styles.errText]}>
            {correct ? 'Correct!' : 'Incorrect'}
          </Text>
          <Text style={styles.resultBody}>
            {correct ? 'Nice deduction — you found the culprit!' : 'Not quite. Re-check the clues and try another profile.'}
          </Text>
          <Pressable onPress={onClose} style={({ pressed }) => [styles.modalBtn, pressed && { opacity: 0.9 }]}>
            <Text style={styles.modalBtnText}>Back</Text>
          </Pressable>
        </View>
        {correct ? <ConfettiCannon count={140} fadeOut fallSpeed={3000} origin={{ x: width / 2, y: -20 }} /> : null}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F6F7F9' },
  container: { padding: 16 },
  kicker: { fontSize: 13, fontWeight: '700', color: '#ff4d3d', letterSpacing: 0.5 },
  title: { fontSize: 22, fontWeight: '800', marginTop: 4, marginBottom: 10 },
  hero: { borderRadius: 14, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e7e7e7' },
  card: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#e7e7e7', padding: 14, marginTop: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 8 },
  body: { fontSize: 14, lineHeight: 20, color: '#222' },
  help: { fontSize: 12, color: '#6b7280', marginBottom: 8 },
  bulletRow: { flexDirection: 'row', gap: 8, marginBottom: 8, alignItems: 'flex-start' },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#ff4d3d', marginTop: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  item: { width: '25%', paddingHorizontal: 6, paddingVertical: 8, alignItems: 'center' },
  avatar: { width: 70, height: 70, borderRadius: 35, marginBottom: 6, backgroundColor: '#f1f1f1' },
  name: { fontSize: 11, fontWeight: '700', textAlign: 'center' },
  input: { minHeight: 120, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, padding: 12, fontSize: 14, backgroundColor: '#fafafa' },
  button: { marginTop: 10, backgroundColor: '#ff4d3d', paddingVertical: 12, borderRadius: 999, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '100%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 16, padding: 18, borderWidth: 2 },
  okBorder: { borderColor: '#22c55e' },
  errBorder: { borderColor: '#ef4444' },
  resultTitle: { fontSize: 22, fontWeight: '900', marginBottom: 6, textAlign: 'center' },
  okText: { color: '#16a34a' },
  errText: { color: '#dc2626' },
  resultBody: { textAlign: 'center', color: '#111827', marginBottom: 12 },
  modalBtn: { alignSelf: 'center', backgroundColor: '#111827', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 999 },
  modalBtnText: { color: '#fff', fontWeight: '800' },
});
