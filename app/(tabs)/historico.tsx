import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const viagensMock = [
  {
    id: '1',
    data: '14/04/2025',
    distancia: '12,3 km',
    duracao: '42 min',
    velocidade: '17 km/h',
    rota: 'Casa → IESB',
  },
  {
    id: '2',
    data: '12/04/2025',
    distancia: '8,1 km',
    duracao: '30 min',
    velocidade: '16,2 km/h',
    rota: 'Estágio → Casa',
  },
  {
    id: '3',
    data: '10/04/2025',
    distancia: '15,4 km',
    duracao: '55 min',
    velocidade: '16,8 km/h',
    rota: 'Casa → Asa Norte',
  },
];

export default function Historico() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/inicio')}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Histórico de Viagens</Text>

      <FlatList
        data={viagensMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.rota}</Text>
            <Text style={styles.cardText}>📅 {item.data}</Text>
            <Text style={styles.cardText}>📏 Distância: {item.distancia}</Text>
            <Text style={styles.cardText}>⏱ Duração: {item.duracao}</Text>
            <Text style={styles.cardText}>🚴 Velocidade média: {item.velocidade}</Text>
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
    marginBottom: 4,
    color: '#333',
  },
});
