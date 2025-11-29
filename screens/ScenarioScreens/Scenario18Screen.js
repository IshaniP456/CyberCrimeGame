// screens/ScenarioScreens/Scenario18Screen.js
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';

import { characters } from '../../data/characters';
import { COLORS } from '../../src/theme/colors';
import { setScenarioCompleted } from '../../src/progress';

const NOTES_KEY = 'scenario18_notes_v1';
const CORRECT_NAME = 'Javier Morales';

/** Auto-sized hero image */
function HeroImage({ source }) {
  const asset = Image.resolveAssetSource(source);
  const aspect =
    asset?.width && asset?.height ? asset.width / asset.height : 3 / 4;

  return (
    <Image
      source={source}
      resizeMode="contain"
      style={[styles.hero, { width: '100%', height: undefined, aspectRatio: aspect }]}
    />
  );
}

export default function Scenario18Screen() {
  const insets = useSafeAreaInsets();
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [picked, setPicked] = useState(null);

  const correctId = useMemo(
    () => characters.find((c) => c.name === CORRECT_NAME)?.id,
    []
  );

  // Load saved notes
  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem(NOTES_KEY);
        if (v) setNotes(v);
      } catch {}
    })();
  }, []);

  const onSave = async () => {
    try {
      setSaving(true);
      await AsyncStorage.setItem(NOTES_KEY, notes);
      Alert.alert('Saved', 'Your notes were saved on this device.');
    } catch {
      Alert.alert('Error', 'Could not save notes.');
    } finally {
      setSaving(false);
    }
  };

  const onPick = (id) => {
    const right = id === correctId;
    setPicked(id);
    setIsCorrect(right);

    if (right) {
      // mark Scenario 18 as completed for the locking system
      setScenarioCompleted(18);
    }

    setShowResult(true);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { paddingTop: insets.top }]}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.kicker}>Scenario #18</Text>
        <Text style={styles.title}>
          Fake Bank Fraud Call Used to Steal Personal Information
        </Text>

        <HeroImage source={require('../../assets/scenarios/BankCall.png')} />

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.body}>
            A scammer calls a victim while pretending to be from their bank&apos;s
            fraud department. They claim there is suspicious activity on the
            victim&apos;s account and insist that the victim must verify their
            full name, credit card information, and Social Security number to
            “protect” the account. The scammer secretly records the call and later
            uses the captured information for identity theft and fraudulent
            purchases — all while the phone number shows up as “No Caller ID.”
          </Text>
        </View>

        {/* Task */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Task</Text>
          <Text style={styles.body}>
            Figure out who made the fake bank call and recorded the victim&apos;s personal info.
          </Text>
        </View>

        {/* Clues */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Clues</Text>

          <Bullet>
            The call was placed over Wi-Fi connected to a locally owned café.
          </Bullet>

          <Bullet>
            The traced location of the call source is very close to a college campus.
          </Bullet>

          <Bullet>
            Background noise in the recording includes clinking dishes and low chatter,
            suggesting the caller was sitting in a public spot like a café.
          </Bullet>

          <Bullet>
            The phone number appeared as “No Caller ID,” a setting often used to mask
            outgoing scam calls.
          </Bullet>
        </View>

        {/* Character picker */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Who did it?</Text>
          <Text style={styles.help}>Tap a character to make your guess.</Text>

          <View style={styles.grid}>
            {characters.map((c) => (
              <Pressable
                key={c.id}
                onPress={() => onPick(c.id)}
                style={[
                  styles.item,
                  picked === c.id && styles.itemSelected,
                ]}
              >
                <Image source={c.image} style={styles.avatar} />
                <Text style={styles.name} numberOfLines={1}>
                  {c.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.help}>
            Jot ideas here — who hangs out in that café, who is near campus, who
            understands spoofing “No Caller ID,” etc. Saved locally on this device.
          </Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Type your notes..."
            placeholderTextColor={COLORS.textSecondary}
            multiline
            textAlignVertical="top"
            style={styles.input}
          />
          <Pressable
            onPress={onSave}
            style={({ pressed }) => [
              styles.button,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Text style={styles.buttonText}>
              {saving ? 'Saving…' : 'Save Notes'}
            </Text>
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      <ResultModal
        visible={showResult}
        correct={isCorrect}
        onClose={() => setShowResult(false)}
      />
    </KeyboardAvoidingView>
  );
}

/* ---------- Helpers ---------- */
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
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <View
          style={[
            styles.modalCard,
            correct ? styles.okBorder : styles.errBorder,
          ]}
        >
          <Text
            style={[
              styles.resultTitle,
              correct ? styles.okText : styles.errText,
            ]}
          >
            {correct ? 'Correct!' : 'Incorrect'}
          </Text>
          <Text style={styles.resultBody}>
            {correct
              ? 'Nice deduction — you caught the scammer behind the fake bank call!'
              : 'Not quite. Re-check the café Wi-Fi clue, campus proximity, and background noise, then try again.'}
          </Text>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.modalBtn,
              pressed && { opacity: 0.9 },
            ]}
          >
            <Text style={styles.modalBtnText}>Back</Text>
          </Pressable>
        </View>

        {correct ? (
          <ConfettiCannon
            count={140}
            fadeOut
            fallSpeed={3000}
            origin={{ x: width / 2, y: -20 }}
          />
        ) : null}
      </View>
    </Modal>
  );
}

/* ---------- Styles (dark theme, consistent with 10–17) ---------- */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 16,
  },
  kicker: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 4,
    marginBottom: 10,
  },
  hero: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    marginBottom: 8,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
    color: COLORS.primary,
  },
  body: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  help: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginTop: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  item: {
    width: '25%',
    paddingHorizontal: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  itemSelected: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    backgroundColor: '#262728',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#262626',
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 6,
  },
  name: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  input: {
    minHeight: 120,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#262728',
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.textPrimary,
  },
  button: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 2,
  },
  okBorder: { borderColor: '#22c55e' },
  errBorder: { borderColor: '#ef4444' },
  resultTitle: {
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  okText: { color: '#4ade80' },
  errText: { color: '#f87171' },
  resultBody: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  modalBtn: {
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: '800',
  },
});
