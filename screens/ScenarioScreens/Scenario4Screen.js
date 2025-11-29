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
import { COLORS } from '../../src/theme/colors';
import { setScenarioCompleted } from '../../src/progress';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_IMG_HEIGHT = SCREEN_HEIGHT * 0.6;

// culprit for Scenario 4
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
      console.log(
        'Set CORRECT_NAME for Scenario 4 to a valid character name.'
      );
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

    if (right) {
      // 🔓 mark Scenario 4 as completed for the locking system
      setScenarioCompleted(4);
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
        showsVerticalScrollIndicator
      >
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
              height: undefined,
              maxHeight: MAX_IMG_HEIGHT,
              aspectRatio: 3 / 4,
            },
          ]}
          resizeMode="contain"
        />

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.body}>
            An individual creates a website to promote a fake online store. They
            display photos for popular, trendy clothing dupes with affordable
            prices to appeal to teens on a budget. The website prompts them to
            enter in their credit card information, as well as other personal
            info including their full name, home address, and other bank
            details.
          </Text>
        </View>

        {/* Task */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Task</Text>
          <Text style={styles.body}>
            Figure out who is behind the fake store and harvesting sensitive
            information.
          </Text>
        </View>

        {/* Clues */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Clues</Text>
          <Bullet>
            Individuals noticed that the victims all have mutual followers from
            a local college. It is suspected that the criminal is part of this
            group.
          </Bullet>
          <Bullet>
            The software used to construct the website is one that this suspect
            has experience with.
          </Bullet>
          <Bullet>
            All of the clothing “available” through the website appeals to
            teenagers, and specifically shows styles that suggest that the
            suspect also is interested in the same type of clothing.
          </Bullet>
          <Bullet>
            The payments were routed through a digital account registered under
            the user name “k45719”.
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
                style={styles.item}
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

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Result Modal + confetti */}
      <ResultModal
        visible={showResult}
        correct={isCorrect}
        onClose={() => setShowResult(false)}
      />
    </KeyboardAvoidingView>
  );
}

/* ---------- Reusable bits ---------- */
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

/* ---------- Styles (dark theme) ---------- */
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
    marginBottom: 8,
    alignSelf: 'stretch',
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
  modalBtnText: { color: '#fff', fontWeight: '800' },
});
