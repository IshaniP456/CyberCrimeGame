// screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../src/theme/colors';
import { resetScenarioProgress } from '../src/progress';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [resetting, setResetting] = useState(false);

  const handlePlay = () => {
    navigation.navigate('MainTabs');
  };

  const handleHowToPlay = () => {
    navigation.navigate('HowToPlay');
  };

  const handleCredits = () => {
    navigation.navigate('Credits');
  };

  const handleWebsite = () => {
    Linking.openURL('https://www.cyberforyouth.org/');
  };

  const handleReset = async () => {
    Alert.alert(
      'Reset Progress?',
      'This will lock all scenarios again and clear completion status. Your notes will stay saved. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              setResetting(true);
              await resetScenarioProgress();
              Alert.alert('Progress reset', 'All scenario completion has been cleared.');
            } catch (e) {
              Alert.alert('Error', 'Could not reset progress.');
            } finally {
              setResetting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.root,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <LinearGradient
        colors={['#0b0b0f', '#14141c', '#0b0b0f']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        {/* Title / Logo area */}
        <View style={styles.headerBlock}>
          <Text style={styles.kicker}>Interactive Deduction Game</Text>
          <Text style={styles.title}>Cyber Crime Case Files</Text>
          <Text style={styles.subtitle}>
            Read the clues. Study the suspects. Protect yourself from real-world
            cyber threats.
          </Text>
        </View>

        {/* Main buttons */}
        <View style={styles.buttonsBlock}>
          <Pressable
            onPress={handlePlay}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && { opacity: 0.9 },
            ]}
          >
            <Ionicons name="play" size={22} color="#fff" />
            <Text style={styles.primaryButtonText}>Play</Text>
          </Pressable>

          <Pressable
            onPress={handleHowToPlay}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && { opacity: 0.9 },
            ]}
          >
            <Ionicons name="help-buoy-outline" size={20} color={COLORS.primary} />
            <Text style={styles.secondaryButtonText}>How to Play</Text>
          </Pressable>

          <Pressable
            onPress={handleCredits}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && { opacity: 0.9 },
            ]}
          >
            <Ionicons name="people-outline" size={20} color={COLORS.primary} />
            <Text style={styles.secondaryButtonText}>Credits</Text>
          </Pressable>

          <Pressable
            onPress={handleWebsite}
            style={({ pressed }) => [
              styles.linkButton,
              pressed && { opacity: 0.9 },
            ]}
          >
            <Ionicons name="globe-outline" size={18} color="#fff" />
            <Text style={styles.linkButtonText}>More info at cyberforyouth.org</Text>
          </Pressable>
        </View>

        {/* Reset progress button at bottom */}
        <View style={styles.footer}>
          <Pressable
            onPress={handleReset}
            style={({ pressed }) => [
              styles.resetButton,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Ionicons
              name="refresh-circle"
              size={20}
              color="#f97373"
            />
            <Text style={styles.resetText}>
              {resetting ? 'Resetting…' : 'Reset Scenario Progress'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  headerBlock: {
    marginTop: 10,
  },
  kicker: {
    fontSize: 13,
    color: COLORS.accent,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  buttonsBlock: {
    marginTop: 24,
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 999,
  },
  primaryButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '800',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  secondaryButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
  linkButton: {
    marginTop: 4,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#1f2933',
  },
  linkButtonText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#f97373',
  },
  resetText: {
    fontSize: 13,
    color: '#f97373',
    fontWeight: '600',
  },
});
