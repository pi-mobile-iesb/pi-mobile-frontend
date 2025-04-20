import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const rotasFavoritasMock = [
  {
    id: '1',
    nome: 'IESB',
    distancia: '10,5 km',
    pontosDeInteresse: ['Ciclovia'],
  },
  {
    id: '2',
    nome: 'Rodoviária',
    distancia: '6,2 km',
    pontosDeInteresse: ['Shopping', 'Bicicletário'],
  },
  {
    id: '3',
    nome: 'W3 Sul',
    distancia: '15,8 km',
    pontosDeInteresse: [''],
  },
];

export default function Favoritas() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/inicio')}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Rotas Favoritas</Text>

      <FlatList
        data={rotasFavoritasMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Text style={styles.cardText}>📏 Distância: {item.distancia}</Text>
            <Text style={styles.cardText}>📌 Pontos de interesse:</Text>
            {item.pontosDeInteresse.map((ponto, index) => (
              <Text key={index} style={styles.bullet}>• {ponto}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4B0082',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
});
