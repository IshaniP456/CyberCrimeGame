import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const demoScenarios = [
  {
    id: 1,
    title: 'Impersonation Scam',
    description:
      'Someone impersonated an influencer to DM followers for “giveaways”. Clues: late-night logins, reused passwords, public email breach.',
  },
  {
    id: 2,
    title: 'Bank Heist (Digital)',
    description:
      'Funds siphoned in micro-transactions. Clues: VPN used inconsistently, code comments match a known hobbyist forum user.',
  },
];

export default function ScenarioScreen() {
  const [idx, setIdx] = useState(0);
  const s = demoScenarios[idx];

  const nextScenario = () => setIdx((i) => (i + 1) % demoScenarios.length);

  return (
    <View style={styles.card}>
      <Text style={styles.h2}>{s.title}</Text>
      <Text style={styles.body}>{s.description}</Text>
      <View style={{ marginTop: 12 }}>
        <Button title="Next Scenario" onPress={nextScenario} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#FDFDFD',
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  h2: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  body: { fontSize: 16, lineHeight: 22 },
});
