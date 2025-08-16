// screens/ScenarioListScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const rows = [
  { id: 1, title: "Scenario #1", description: "Anonymous school gossip account" },
  { id: 2, title: "Scenario #2", description: "Doxxing / posting private info" },
  { id: 3, title: "Scenario #3", description: "Identity theft / catfishing on dating apps" },
  { id: 4, title: "Scenario #4", description: "Fake online store (credit card + PII theft)" },
  { id: 5, title: "Scenario #5", description: "Pop-ups + sketchy ads fake website" },
  { id: 6, title: "Scenario #6", description: "Cyberbullying appearance posts" },
  { id: 7, title: "Scenario #7", description: "Fake job/DMV messages with links" },
  // 8–24 as coming soon
  ...Array.from({ length: 24 - 7 }).map((_, i) => ({
    id: 8 + i, title: `Scenario #${8 + i}`, description: 'Coming soon', comingSoon: true
  })),
];

export default function ScenarioListScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {rows.map((s) => (
        <TouchableOpacity
          key={s.id}
          style={styles.card}
          onPress={() => !s.comingSoon && navigation.navigate(`Scenario${s.id}`)}
          disabled={!!s.comingSoon}
        >
          <Text style={styles.title}>{s.title}</Text>
          <Text style={[styles.description, s.comingSoon && styles.soon]}>{s.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  card: {
    backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 2,
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  description: { fontSize: 14, color: '#333' },
  soon: { color: 'darkred', fontWeight: '700' },
});
