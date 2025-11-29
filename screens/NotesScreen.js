// screens/NotesScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../src/theme/colors';

// List of scenarios that actually have notes saved in AsyncStorage
// (we used these keys in the scenario screens)
const SCENARIO_NOTES = [
  { id: 1,  key: 'scenario1_notes_v1',  label: 'Scenario #1 — Gossip Page' },
  { id: 5,  key: 'scenario5_notes_v1',  label: 'Scenario #5 — Fake Piano Site' },
  { id: 6,  key: 'scenario6_notes_v1',  label: 'Scenario #6 — Cyberbullying Account' },
  { id: 7,  key: 'scenario7_notes_v1',  label: 'Scenario #7 — Fake Job/DMV Messages' },
  { id: 8,  key: 'scenario8_notes_v1',  label: 'Scenario #8 — Malware App Download' },
  { id: 9,  key: 'scenario9_notes_v1',  label: 'Scenario #9 — Birthday Scam Message' },
  { id: 10, key: 'scenario10_notes_v1', label: 'Scenario #10 — Grade Changing Hack' },
  { id: 11, key: 'scenario11_notes_v1', label: 'Scenario #11 — Company Virus Video' },
  { id: 12, key: 'scenario12_notes_v1', label: 'Scenario #12 — Fake Donation Videos' },
  { id: 13, key: 'scenario13_notes_v1', label: 'Scenario #13 — Deepfake Influencer Ad' },
  { id: 14, key: 'scenario14_notes_v1', label: 'Scenario #14 — Impersonation Account' },
  { id: 15, key: 'scenario15_notes_v1', label: 'Scenario #15 — Fake Articles' },
  { id: 16, key: 'scenario16_notes_v1', label: 'Scenario #16 — Fake Petition Site' },
  { id: 17, key: 'scenario17_notes_v1', label: 'Scenario #17 — Zoom Recording Leak' },
  { id: 18, key: 'scenario18_notes_v1', label: 'Scenario #18 — Fake Bank Call' },
  { id: 19, key: 'scenario19_notes_v1', label: 'Scenario #19 — Sketchy Group Link' },
  { id: 20, key: 'scenario20_notes_v1', label: 'Scenario #20 — Fake Scholarship' },
  { id: 21, key: 'scenario21_notes_v1', label: 'Scenario #21 — Fake Wi-Fi Network' },
  { id: 22, key: 'scenario22_notes_v1', label: 'Scenario #22 — Fake iOS Update' },
  { id: 23, key: 'scenario23_notes_v1', label: 'Scenario #23 — Edited Celebrity Photo' },
  { id: 24, key: 'scenario24_notes_v1', label: 'Scenario #24 — Fake Followers & Endorsements' },
];

export default function NotesScreen() {
  const insets = useSafeAreaInsets();
  const [notesMap, setNotesMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const keys = SCENARIO_NOTES.map((s) => s.key);
      const pairs = await AsyncStorage.multiGet(keys);

      const map = {};
      pairs.forEach(([key, value]) => {
        if (value && value.trim().length > 0) {
          map[key] = value;
        }
      });

      setNotesMap(map);
    } catch (e) {
      console.log('Error loading notes', e);
    } finally {
      setLoading(false);
    }
  };

  const scenariosWithNotes = SCENARIO_NOTES.filter(
    (s) => notesMap[s.key] && notesMap[s.key].trim().length > 0
  );

  return (
    <View
      style={[
        styles.root,
        { paddingTop: insets.top, backgroundColor: '#0d0d0e' },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>All Scenario Notes</Text>
        <Text style={styles.subtitle}>
          This page compiles your notes from each scenario into one place.
        </Text>

        {loading ? (
          <Text style={styles.loading}>Loading notes…</Text>
        ) : scenariosWithNotes.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No notes yet</Text>
            <Text style={styles.emptyText}>
              Add notes inside the individual scenarios, and they&apos;ll show up here.
            </Text>
          </View>
        ) : (
          scenariosWithNotes.map((s) => (
            <View key={s.id} style={styles.noteCard}>
              <View style={styles.noteHeaderRow}>
                <Text style={styles.noteScenario}>{s.label}</Text>
                {/* mini tag to show length / “has notes” */}
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Saved</Text>
                </View>
              </View>
              <Text style={styles.noteBody} numberOfLines={6}>
                {notesMap[s.key]}
              </Text>
            </View>
          ))
        )}

        {/* Manual refresh button */}
        <Pressable
          onPress={loadNotes}
          style={({ pressed }) => [
            styles.refreshBtn,
            pressed && { opacity: 0.85 },
          ]}
        >
          <Text style={styles.refreshText}>Refresh Notes</Text>
        </Pressable>

        <View style={{ height: 40 }} />
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
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  loading: {
    color: COLORS.textSecondary,
    marginTop: 12,
  },
  emptyBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  noteCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  noteHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  noteScenario: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    flex: 1,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#262728',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tagText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  noteBody: {
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  refreshBtn: {
    marginTop: 16,
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  refreshText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
});
