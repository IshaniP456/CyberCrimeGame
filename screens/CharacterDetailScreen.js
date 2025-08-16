import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function CharacterDetailScreen({ route }) {
  const c = route.params?.character;

  if (!c) {
    return (
      <View style={styles.center}>
        <Text>No character data passed.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} contentInsetAdjustmentBehavior="automatic">
      <View style={styles.headerBlock}>
        <Image source={c.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{c.name}</Text>
          <Text style={styles.meta}>{c.pronouns} • {c.age} • {c.occupation}</Text>
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
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((t, i) => (
        <Text key={`${title}-${i}`} style={styles.bullet}>• {t}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 14 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerBlock: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  avatar: { width: 90, height: 90, borderRadius: 45 },
  name: { fontSize: 22, fontWeight: '800' },
  meta: { fontSize: 14, opacity: 0.75, marginTop: 2 },
  section: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FFFBE6',
    borderWidth: 1,
    borderColor: '#E6DFA8',
  },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
  bullet: { fontSize: 14, lineHeight: 20 },
});
