import React from 'react';
import { Text, StyleSheet, Button, View, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container}>
      <Text style={styles.title}>Boardgame Overview</Text>
      <Text style={styles.p}>
        Tap Characters to view suspects. Tap a face to open their profile page.
      </Text>

      <View style={styles.row}>
        <View style={styles.btn}><Button title="Characters" onPress={() => navigation.navigate('Characters')} /></View>
        <View style={styles.btn}><Button title="Scenario" onPress={() => navigation.navigate('Scenario')} /></View>
        <View style={styles.btn}><Button title="Notes" onPress={() => navigation.navigate('Notes')} /></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, gap: 12 },
  title: { fontSize: 26, fontWeight: '800' },
  p: { fontSize: 16, lineHeight: 22, opacity: 0.9 },
  row: { flexDirection: 'row', gap: 10, marginTop: 12, flexWrap: 'wrap' },
  btn: { minWidth: 120 },
});
