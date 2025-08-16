// screens/Scenario2Screen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { characters } from '../../data/characters';

const CORRECT = 'Derek Li'; // from your mapping (Scenarios 2, 3)

export default function Scenario2Screen() {
  const [answer, setAnswer] = useState(null);
  const [fire, setFire] = useState(false);

  const onPick = (name) => {
    setAnswer(name);
    const correct = name === CORRECT;
    if (correct) {
      setFire(true);
      Alert.alert('Correct 🎉', 'You identified the culprit!', [{ text: 'OK' }]);
    } else {
      Alert.alert('Not quite', 'Try another profile.', [{ text: 'OK' }]);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
      >
        <Text style={styles.h1}>Scenario #2: Doxxing / leaking confidential info</Text>

        <Text style={styles.h2}>Description</Text>
        <Text style={styles.p}>
          Someone&apos;s personal information (full name, address, etc.) was leaked online
          through an anonymous post. The information quickly spread across multiple
          platforms, causing serious emotional distress to the targeted individual. The
          original post has been taken down, but screenshots continue to circulate. The
          person responsible for the leak is still unknown.
        </Text>

        <Text style={styles.h2}>Your Task</Text>
        <Text style={styles.p}>Find out who is stealing the information.</Text>

        <Text style={styles.h2}>Clues</Text>
        <View style={styles.bullets}>
          <Text style={styles.li}>
            • The leaked details weren’t on the victim’s public profiles, implying private
            access or a close connection. The victim was also active on dating platforms.
          </Text>
          <Text style={styles.li}>
            • The victim had recently been involved in a heated online disagreement on a
            lesser-known discussion site, not a mainstream platform.
          </Text>
          <Text style={styles.li}>• The message was uploaded late at night.</Text>
        </View>

        <Text style={styles.h2}>Photo clue</Text>
        <Image
          source={require('../../assets/scenarios/doxxing.png')}
          style={styles.photo}
          resizeMode="contain"
        />

        <Text style={styles.h2}>Who did it?</Text>
        <View style={styles.grid}>
          {characters.map((c) => (
            <Pressable
              key={c.id}
              onPress={() => onPick(c.name)}
              style={({ pressed }) => [
                styles.choice,
                pressed && { opacity: 0.85 },
                answer === c.name && (c.name === CORRECT ? styles.correct : styles.incorrect),
              ]}
            >
              <Image source={c.image} style={styles.avatar} />
              <Text style={styles.choiceName}>{c.name}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      {fire && (
        <ConfettiCannon
          count={120}
          origin={{ x: 0, y: 0 }}
          fadeOut
          autoStart
          onAnimationEnd={() => setFire(false)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 40 },
  h1: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  h2: { fontSize: 18, fontWeight: '700', marginTop: 18, marginBottom: 6 },
  p: { fontSize: 16, color: '#222', lineHeight: 22 },
  bullets: { gap: 8, marginTop: 4 },
  li: { fontSize: 16, lineHeight: 22, color: '#222' },
  photo: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: '#f2f4f7',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  choice: {
    width: '47%',
    backgroundColor: '#f7f7f9',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  correct: { borderWidth: 2, borderColor: '#2ecc71' },
  incorrect: { borderWidth: 2, borderColor: '#e74c3c' },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  choiceName: { textAlign: 'center', fontWeight: '600' },
});
