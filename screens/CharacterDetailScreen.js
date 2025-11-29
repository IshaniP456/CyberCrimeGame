// screens/CharacterDetailScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { COLORS } from '../src/theme/colors';

export default function CharacterDetailScreen({ route }) {
  const c = route.params?.character;

  if (!c) {
    return (
      <View style={styles.center}>
        <Text style={styles.centerText}>No character data passed.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Header: avatar top-left + text to the right */}
      <View style={styles.headerBlock}>
        <Image
          // support either c.image or c.avatar depending on how data is shaped
          source={c.image || c.avatar}
          style={styles.avatar}
        />
        <View style={styles.headerTextBlock}>
          <Text style={styles.name}>{c.name}</Text>
          <Text style={styles.meta}>
            {c.pronouns} • {c.age} • {c.occupation}
          </Text>
        </View>
      </View>

      <Section title="Tech Skills" items={c.techSkills} />
      <Section title="Known Habits" items={c.knownHabits} />
      <Section title="Digital Footprint" items={c.digitalFootprint} />
      <Section title="Search History" items={c.searchHistory} />
    </ScrollView>
  );
}

function Section({ title, items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((t, i) => (
        <Text key={`${title}-${i}`} style={styles.bullet}>
          • {t}
        </Text>
      ))}
    </View>
  );
}

const AVATAR_SIZE = 90;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: COLORS.background, // dark background
  },
  container: {
    padding: 16,
    gap: 14,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  centerText: {
    color: COLORS.textPrimary,
  },

  headerBlock: {
    flexDirection: 'row',
    alignItems: 'flex-start',      // keep avatar at top-left
    gap: 14,
    padding: 14,
    borderRadius: 14,
    backgroundColor: COLORS.card,  // dark card
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: COLORS.primary,   // accent border
  },
  headerTextBlock: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  meta: {
    fontSize: 14,
    marginTop: 4,
    color: COLORS.textSecondary,
  },

  section: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: COLORS.card,   // dark card instead of pale yellow
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
    color: COLORS.primary,          // accent color for section titles
  },
  bullet: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textPrimary,
  },
});
