// screens/CreditsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../src/theme/colors';
import BackButton from '../components/BackButton';

export default function CreditsScreen({ navigation }) {
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

        <Text style={styles.title}>Credits</Text>

        <Text style={styles.sectionTitle}>CyberForYouth Team</Text>
        <Text style={styles.body}>
          This game was created by members of{' '}
          <Text style={styles.bold}>CyberForYouth</Text> to help students learn
          about online safety, scams, and digital citizenship through
          storytelling and deduction.
        </Text>

        <Text style={styles.sectionTitle}>Roles</Text>
        <Text style={styles.body}>• Story & Scenario Design — Your team</Text>
        <Text style={styles.body}>• Character & Worldbuilding — Your team</Text>
        <Text style={styles.body}>• App Design & Development — Your team</Text>

        <Text style={styles.sectionTitle}>Learn More</Text>
        <Text style={styles.body}>
          To learn more about our work and other resources on cybersecurity for
          youth, visit our website.
        </Text>

        <Pressable
          onPress={() => Linking.openURL('https://www.cyberforyouth.org/')}
          style={({ pressed }) => [
            styles.linkBtn,
            pressed && { opacity: 0.85 },
          ]}
        >
          <Text style={styles.linkText}>Open cyberforyouth.org</Text>
        </Pressable>
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
  linkBtn: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  linkText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
});
