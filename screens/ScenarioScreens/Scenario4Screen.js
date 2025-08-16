// screens/ScenarioScreens/Scenario4Screen.js
import React, { useMemo, useState, useEffect } from 'react';
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
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';
import { characters } from '../../data/characters';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
// If your fakestore image is a normal portrait, adjust this ratio to your image if needed.
// If unknown, we compute size against width with a reasonable cap.
const MAX_IMG_HEIGHT = SCREEN_HEIGHT * 0.6;

// TODO: ⬇️ Set this to the correct culprit for Scenario 4 when you provide it.
const CORRECT_NAME = 'Kassidy Howard';

export default function Scenario4Screen() {
  const insets = useSafeAreaInsets();
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [picked, setPicked] = useState(null);

  const correctId = useMemo(
    () => characters.find((c) => c.name === CORRECT_NAME)?.id,
    []
  );

  useEffect(() => {
    if (!correctId) {
      // Friendly reminder until we set the culprit name
      console.log('Set CORRECT_NAME for Scenario 4 to a valid character name.');
    }
  }, [correctId]);

  const onPick = (id) => {
    if (!correctId) {
      Alert.alert(
        'Set culprit',
        'Please set CORRECT_NAME in Scenario4Screen.js to the correct character name.'
      );
      return;
    }
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
        <Text style={styles.kicker}>Scenario #4</Text>
        <Text style={styles.title}>
          Creating fake online stores to steal card + personal info
        </Text>

        {/* Auto-size image to fit nicely without overwhelming the screen */}
        <Image
          source={require('../../assets/scenarios/fakestore.png')}
          style={[
            styles.hero,
            {
              width: '100%',
              // Let RN calculate height with contain; cap with maxHeight
              height: undefined,
              // If your image is extremely tall, this keeps it in check:
              maxHeight: MAX_IMG_HEIGHT,
              aspectRatio: 3 / 4, // ✅ tweak if needed to match your actual image proportions
            },
          ]}
          resizeMode="contain"
        />

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.body}>
            An individual creates a website to promote a fake online store. They display photos
            for popular, trendy clothing dupes with affordable prices to appeal to teens on a
            budget. The website prompts them to enter in their credit card information, as well
            as other personal info including their full name, home address, and other bank
            details.
          </Text>
        </View>

        {/* Task */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Task</Text>
          <Text style={styles.body}>
            Figure out who is behind the fake store and harvesting sensitive information.
          </Text>
        </View>

        {/* Clues */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Clues</Text>
          <Bullet>
            Individuals noticed that the victims all have mutual followers from a local college.
            It is suspected that the criminal is part of this group.
          </Bullet>
          <Bullet>
            The software used to construct the website is one that this suspect has experience
            with.
          </Bullet>
          <Bullet>
            All of the clothing “available” through the website appeals to teenagers, and
            specifically shows styles that suggest that the suspect also is interested in the
            same type of clothing.
          </Bullet>
          <Bullet>
            The payments were routed through a digital account registered under the user name
            “k45719”.
          </Bullet>
        </View>

        {/* Character picker (same grid behavior) */}
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

      {/* Result Modal + confetti, matching Scenario #1 */}
      <ResultModal
        visible={showResult}
        correct={isCorrect}
        onClose={() => setShowResult(false)}
      />
    </KeyboardAvoidingView>
  );
}

/* ---------- Reusable bits (kept consistent) ---------- */
function Bullet({ children }) {
  return (
    <View style={styles.bulletRow}>
      <View className="dot" style={styles.dot} />
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

/* ---------- Styles ---------- */
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
    alignSelf: 'stretch',
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
