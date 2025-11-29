// screens/ScenarioScreens/Scenario6Screen.js
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

const NOTES_KEY = 'scenario6_notes_v1';
const CORRECT_NAME = 'Ellie Jameson';

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

export default function Scenario6Screen() {
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
      // 🔓 mark Scenario 6 as completed for the locking system
      setScenarioCompleted(6);
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
        <Text style={styles.kicker}>Scenario #6</Text>
        <Text style={styles.title}>
          Cyberbullying others by mocking appearance
        </Text>

        <HeroImage source={require('../../assets/scenarios/cyberbully.png')} />

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.body}>
            An anonymous user created an account on social media and publicly
            posted photos of people they know. They specifically posted candid
            photos taken of other people, and the victims did not know the
            photos were online. Each post mocks the person’s physical
            characteristics to humiliate them. The account was reported and
            eventually taken down.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Task</Text>
          <Text style={styles.body}>
            Figure out who is behind the bullying account.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Clues</Text>
          <Bullet>
            Face filters and editing styles on the photos match software the
            suspect uses.
          </Bullet>
          <Bullet>
            Photos were shared in private group chats the suspect is part of.
          </Bullet>
          <Bullet>
            The user attends the same college as all victims and targets
            Cybersecurity majors.
          </Bullet>
          <Bullet>All photos were taken on the college campus.</Bullet>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Who did it?</Text>
          <Text style={styles.help}>Tap a character to make your guess.</Text>

          <View style={styles.grid}>
            {characters.map((c) => (
              <Pressable
                key={c.id}
                style={[
                  styles.item,
                  picked === c.id && styles.itemSelected,
                ]}
                onPress={() => onPick(c.id)}
              >
                <Image source={c.image} style={styles.avatar} />
                <Text style={styles.name} numberOfLines={1}>
                  {c.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.help}>
            Jot ideas here. Saved locally on this device.
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
              ? 'Nice deduction — you found the culprit!'
              : 'Not quite. Re-check the clues and try another profile.'}
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

/* ---------- Styles (dark themed) ---------- */
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
    marginTop: 4,
    marginBottom: 10,
    color: COLORS.textPrimary,
  },
  hero: {
    borderRadius: 14,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
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
    lineHeight: 20,
    color: COLORS.textPrimary,
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: '#262728',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 6,
    backgroundColor: '#262626',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  name: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.textPrimary,
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#262728',
    color: COLORS.textPrimary,
  },
  button: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
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
    marginBottom: 6,
    textAlign: 'center',
    color: COLORS.textPrimary,
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
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: '800',
  },
});
