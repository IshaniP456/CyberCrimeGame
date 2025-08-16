// screens/ScenarioScreens/Scenario3Screen.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';
import { characters } from '../../data/characters';

const CORRECT_NAME = 'Derek Li'; // culprit for Scenario #3
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
// Original image is 1338 x 2018 (portrait)
const IMG_RATIO = 1338 / 2018;

export default function Scenario3Screen({ navigation }) {
  const insets = useSafeAreaInsets();

  // result state (same behavior as Scenario #1)
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [picked, setPicked] = useState(null);

  const correctId = useMemo(
    () => characters.find((c) => c.name === CORRECT_NAME)?.id,
    []
  );

  const onPick = (id) => {
    const right = id === correctId;
    setPicked(id);
    setIsCorrect(right);
    setShowResult(true);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { paddingTop: insets.top }]}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator>
        <Text style={styles.kicker}>Scenario #3</Text>
        <Text style={styles.title}>Identity theft / catfishing on dating apps</Text>

        {/* Auto-sized portrait image:
           - keeps full image visible (contain)
           - caps height so it never takes over the screen */}
        <Image
          source={require('../../assets/scenarios/catfish.png')}
          style={[
            styles.hero,
            {
              // Full width, computed height respecting aspect ratio
              width: '100%',
              height: Math.min(SCREEN_WIDTH / IMG_RATIO, SCREEN_HEIGHT * 0.6),
            },
          ]}
          resizeMode="contain"
        />

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.body}>
            A user on a popular dating app was discovered to be using stolen photos, a fake name,
            and fabricated personal details to engage with multiple people. Several individuals
            reported feeling emotionally manipulated after realizing they had been speaking to
            someone pretending to be someone else. One victim lost money after being asked for
            help with a fake emergency. The account has since been reported and removed, but
            similar profiles have appeared under different names.
          </Text>
        </View>

        {/* Task */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Task</Text>
          <Text style={styles.body}>
            Figure out who is the individual behind the fake profiles.
          </Text>
        </View>

        {/* Clues */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Clues</Text>
          <Bullet>
            The photos used belong to a real person whose Instagram is set to public and who is
            unaware that their images are being misused.
          </Bullet>
          <Bullet>
            Conversations often turn personal quickly, with the fake profile steering the talk
            towards long-term connections or financial vulnerability.
          </Bullet>
          <Bullet>
            A pattern shows the catfish targeting users between 10 pm and 1 a.m. in multiple time
            zones.
          </Bullet>
          <Bullet>
            Multiple victims say the scammer eventually steers the conversation to messaging
            outside the app.
          </Bullet>
        </View>

        {/* Character picker (same grid behavior as Scenario #1) */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Who did it?</Text>
          <Text style={styles.help}>Tap a character to make your guess.</Text>

          <View style={styles.grid}>
            {characters.map((c) => (
              <Pressable key={c.id} style={styles.item} onPress={() => onPick(c.id)}>
                <Image source={c.image} style={styles.avatar} />
                <Text style={styles.name} numberOfLines={1}>
                  {c.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Result Modal + confetti, exactly like Scenario #1 */}
      <ResultModal
        visible={showResult}
        correct={isCorrect}
        onClose={() => setShowResult(false)}
      />
    </KeyboardAvoidingView>
  );
}

/* ---------- Reusable pieces (same as Scenario #1 style) ---------- */
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
            {correct
              ? 'Nice deduction — you found the culprit!'
              : 'Not quite. Re-check the clues and try another profile.'}
          </Text>

          <Pressable
            onPress={onClose}
            style={({ pressed }) => [styles.modalBtn, pressed && { opacity: 0.9 }]}
          >
            <Text style={styles.modalBtnText}>Back</Text>
          </Pressable>
        </View>

        {correct ? (
          <ConfettiCannon count={140} fadeOut fallSpeed={3000} origin={{ x: width / 2, y: -20 }} />
        ) : null}
      </View>
    </Modal>
  );
}

/* ---------- Styles (kept consistent with Scenario #1) ---------- */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F6F7F9' },
  container: { padding: 16 },
  kicker: { fontSize: 13, fontWeight: '700', color: '#ff4d3d', letterSpacing: 0.5 },
  title: { fontSize: 22, fontWeight: '800', marginTop: 4, marginBottom: 10 },

  hero: {
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e7e7e7',
    marginBottom: 8,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    padding: 14,
    marginTop: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 8 },
  body: { fontSize: 14, lineHeight: 20, color: '#222' },
  help: { fontSize: 12, color: '#6b7280', marginBottom: 8 },

  bulletRow: { flexDirection: 'row', gap: 8, marginBottom: 8, alignItems: 'flex-start' },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#ff4d3d', marginTop: 6 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  item: { width: '25%', paddingHorizontal: 6, paddingVertical: 8, alignItems: 'center' },
  avatar: { width: 70, height: 70, borderRadius: 35, marginBottom: 6, backgroundColor: '#f1f1f1' },
  name: { fontSize: 11, fontWeight: '700', textAlign: 'center' },

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
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 2,
  },
  okBorder: { borderColor: '#22c55e' },
  errBorder: { borderColor: '#ef4444' },
  resultTitle: { fontSize: 22, fontWeight: '900', marginBottom: 6, textAlign: 'center' },
  okText: { color: '#16a34a' },
  errText: { color: '#dc2626' },
  resultBody: { textAlign: 'center', color: '#111827', marginBottom: 12 },
  modalBtn: {
    alignSelf: 'center',
    backgroundColor: '#111827',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  modalBtnText: { color: '#fff', fontWeight: '800' },
});
