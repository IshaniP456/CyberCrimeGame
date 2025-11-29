// screens/CharactersScreen.js
import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  View,
  Dimensions,
} from 'react-native';
import { characters } from '../data/characters';
import { COLORS } from '../src/theme/colors';

const CARD_WIDTH = (Dimensions.get('window').width - 16*2 - 12) / 2;

export default function CharactersScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <FlatList
        data={characters}
        keyExtractor={(item, idx) => String(item.id ?? idx)}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerBox}>
            <Text style={styles.header}>Characters</Text>
            <Text style={styles.sub}>Tap a profile to view details</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('CharacterDetail', { character: item })}
          >
            <View style={styles.row}>
              <Image source={item.image} style={styles.avatar} />

              <View style={styles.textBox}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.meta} numberOfLines={2}>
                  {item.pronouns} • {item.age}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const AVATAR_SIZE = 60;

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 12,
  },
  column: {
    gap: 12,
  },
  headerBox: {
    marginBottom: 8,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  sub: {
    fontSize: 13,
    marginTop: 2,
    color: COLORS.textSecondary,
  },

  // CARD STYLE
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 10,
  },

  textBox: {
    flexShrink: 1,
    flex: 1,
  },

  name: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },

  meta: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
});
