// screens/ScenarioListScreen.js

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../src/theme/colors';
import { getScenarioProgress } from '../src/progress';

const SCENARIOS = [
  { id: 1, title: 'Scenario #1', subtitle: 'Anonymous school gossip account', screen: 'Scenario1', requiresCompletionOf: null },
  { id: 2, title: 'Scenario #2', subtitle: 'Doxxing / posting private info', screen: 'Scenario2', requiresCompletionOf: 1 },
  { id: 3, title: 'Scenario #3', subtitle: 'Identity theft / catfishing on dating apps', screen: 'Scenario3', requiresCompletionOf: 2 },
  { id: 4, title: 'Scenario #4', subtitle: 'Fake online store (credit card + PII theft)', screen: 'Scenario4', requiresCompletionOf: 3 },
  { id: 5, title: 'Scenario #5', subtitle: 'Pop-ups + sketchy ads fake website', screen: 'Scenario5', requiresCompletionOf: 4 },
  { id: 6, title: 'Scenario #6', subtitle: 'Cyberbullying appearance posts', screen: 'Scenario6', requiresCompletionOf: 5 },
  { id: 7, title: 'Scenario #7', subtitle: 'Fake job/DMV messages with malware', screen: 'Scenario7', requiresCompletionOf: 6 },
  { id: 8, title: 'Scenario #8', subtitle: 'Malware download → phone attack', screen: 'Scenario8', requiresCompletionOf: 7 },
  { id: 9, title: 'Scenario #9', subtitle: 'Birthday “you won this” scam', screen: 'Scenario9', requiresCompletionOf: 8 },
  { id: 10, title: 'Scenario #10', subtitle: 'Hacked grades portal', screen: 'Scenario10', requiresCompletionOf: 9 },
  { id: 11, title: 'Scenario #11', subtitle: 'Virus → infinite looping video', screen: 'Scenario11', requiresCompletionOf: 10 },
  { id: 12, title: 'Scenario #12', subtitle: 'Fake cause via edited videos', screen: 'Scenario12', requiresCompletionOf: 11 },
  { id: 13, title: 'Scenario #13', subtitle: 'Deepfake influencer promotion', screen: 'Scenario13', requiresCompletionOf: 12 },
  { id: 14, title: 'Scenario #14', subtitle: 'Fake social media impersonation', screen: 'Scenario14', requiresCompletionOf: 13 },
  { id: 15, title: 'Scenario #15', subtitle: 'Anonymous writer spreads fake articles', screen: 'Scenario15', requiresCompletionOf: 14 },
  { id: 16, title: 'Scenario #16', subtitle: 'Fake petition website scam', screen: 'Scenario16', requiresCompletionOf: 15 },
  { id: 17, title: 'Scenario #17', subtitle: 'Screen-recorded Zoom clip posted', screen: 'Scenario17', requiresCompletionOf: 16 },
  { id: 18, title: 'Scenario #18', subtitle: 'Fake bank call to steal info', screen: 'Scenario18', requiresCompletionOf: 17 },
  { id: 19, title: 'Scenario #19', subtitle: 'Group chat phishing link', screen: 'Scenario19', requiresCompletionOf: 18 },
  { id: 20, title: 'Scenario #20', subtitle: 'Fake scholarship → identity theft', screen: 'Scenario20', requiresCompletionOf: 19 },
  { id: 21, title: 'Scenario #21', subtitle: 'Fake Wi-Fi network steals data', screen: 'Scenario21', requiresCompletionOf: 20 },
  { id: 22, title: 'Scenario #22', subtitle: 'Fake early-access update malware', screen: 'Scenario22', requiresCompletionOf: 21 },
  { id: 23, title: 'Scenario #23', subtitle: 'Edited celebrity image → rumors', screen: 'Scenario23', requiresCompletionOf: 22 },
  { id: 24, title: 'Scenario #24', subtitle: 'Bought followers, fake brand deals', screen: 'Scenario24', requiresCompletionOf: 23 },
];

export default function ScenarioListScreen({ navigation }) {
  const [progress, setProgress] = useState({});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Scenarios',
      headerStyle: { backgroundColor: COLORS.background },
      headerTitleStyle: { color: COLORS.textPrimary },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{ paddingHorizontal: 12 }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const load = async () => {
        const data = await getScenarioProgress();
        if (active) setProgress(data);
      };

      load();

      return () => { active = false; };
    }, [])
  );

  const isScenarioUnlocked = (s) => {
    if (!s.requiresCompletionOf) return true;
    return !!progress[String(s.requiresCompletionOf)];
  };

  const isScenarioCompleted = (s) => !!progress[String(s.id)];

  const handlePress = (item) => {
    const unlocked = isScenarioUnlocked(item);
    if (!unlocked) {
      Alert.alert('Locked', `Complete Scenario #${item.requiresCompletionOf} first.`);
      return;
    }
    navigation.navigate(item.screen);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {SCENARIOS.map((item) => {
          const unlocked = isScenarioUnlocked(item);
          const completed = isScenarioCompleted(item);

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={unlocked ? 0.85 : 1}
              onPress={() => handlePress(item)}
              style={[
                styles.card,
                !unlocked && styles.cardLocked,
                completed && styles.cardCompleted,
              ]}
            >
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text
                  style={[styles.cardSubtitle, !unlocked && styles.cardSubtitleLocked]}
                  numberOfLines={2}
                >
                  {item.subtitle}
                </Text>

                {!unlocked && (
                  <Text style={styles.lockHint}>
                    Locked — complete Scenario #{item.requiresCompletionOf} first.
                  </Text>
                )}

                {completed && (
                  <Text style={styles.completedHint}>Completed</Text>
                )}
              </View>

              <View style={styles.iconColumn}>
                {!unlocked ? (
                  <Ionicons name="lock-closed" size={18} color={COLORS.textSecondary} />
                ) : (
                  <Ionicons name="lock-open" size={18} color={COLORS.primary} />
                )}
              </View>

            </TouchableOpacity>
          );
        })}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLocked: { opacity: 0.55 },
  cardCompleted: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  cardTextWrap: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  cardSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  cardSubtitleLocked: {
    color: COLORS.textSecondary,
  },
  lockHint: {
    marginTop: 4,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  completedHint: {
    marginTop: 4,
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '600',
  },
  iconColumn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 24,
  },
});
