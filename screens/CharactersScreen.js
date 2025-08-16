// screens/CharactersScreen.js
import React from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, Pressable, Image, View } from 'react-native';
import { characters } from '../data/characters';

export default function CharactersScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No characters found. Check data import and image file names.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('CharacterDetail', { character: item })}
          >
            <Image source={item.image} style={styles.avatar} />
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.meta} numberOfLines={2}>
              {item.pronouns} • {item.age}
            </Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 12 },
  column: { gap: 12 },
  headerBox: { marginBottom: 8 },
  header: { fontSize: 28, fontWeight: '800' },
  sub: { fontSize: 13, opacity: 0.7, marginTop: 2 },
  card: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#FDFDFD',
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 8 },
  name: { fontSize: 15, fontWeight: '800', textAlign: 'center' },
  meta: { fontSize: 12, opacity: 0.7, textAlign: 'center', marginTop: 2 },
  empty: { padding: 24 },
  emptyText: { textAlign: 'center', color: '#888' },
});
