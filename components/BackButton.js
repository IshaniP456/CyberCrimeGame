// components/BackButton.js
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BackButton({ navigation }) {
  const handlePress = () => {
    // If there is something to go back to, go back.
    // If not (just in case), go to Home.
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <Pressable style={styles.btn} onPress={handlePress}>
      <Ionicons name="arrow-back" size={22} color="#ffffff" />
      <Text style={styles.text}>Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  text: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});
