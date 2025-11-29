// screens/HowToPlayScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../src/theme/colors';
import BackButton from '../components/BackButton';

export default function HowToPlayScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.root,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <BackButton navigation={navigation} />

        <Text style={styles.title}>How to Play</Text>

        <Text style={styles.sectionTitle}>1. Pick a Scenario</Text>
        <Text style={styles.body}>
          Tap the <Text style={styles.bold}>Scenarios</Text> tab, then select a
          scenario card. Read the description and clues carefully.
        </Text>

        <Text style={styles.sectionTitle}>2. Study the Characters</Text>
        <Text style={styles.body}>
          Use the <Text style={styles.bold}>Characters</Text> tab to learn
          about each person&apos;s habits, skills, and online behavior. These
          details connect directly to the clues.
        </Text>

        <Text style={styles.sectionTitle}>3. Take Notes</Text>
        <Text style={styles.body}>
          Each scenario has a <Text style={styles.bold}>Notes</Text> section.
          Write down suspects, motives, and key evidence. All notes are saved
          locally and appear in the global <Text style={styles.bold}>Notes</Text>{' '}
          tab.
        </Text>

        <Text style={styles.sectionTitle}>4. Make Your Guess</Text>
        <Text style={styles.body}>
          When you&apos;re ready, tap a character under{' '}
          <Text style={styles.bold}>Who did it?</Text> to lock in your answer.
          You&apos;ll see immediately whether you solved the case.
        </Text>

        <Text style={styles.sectionTitle}>5. Unlock New Scenarios</Text>
        <Text style={styles.body}>
          Complete scenarios in order. Solving earlier cases unlocks later, more
          complex ones, just like leveling up in a game.
        </Text>

        <Text style={styles.sectionTitle}>Goal</Text>
        <Text style={styles.body}>
          Learn how real-world cybercrime and online scams work so you can
          recognize red flags, stay safe, and help others do the same.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 12,
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  bold: {
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
