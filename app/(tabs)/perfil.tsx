import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Perfil() {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadUserName = async () => {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    };
    loadUserName();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userName');
    router.replace('/login'); // ou a rota de login/cadastro
  };

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Perfil do Usuário</Text>
      
      <View style={styles.profileBox}>
        <Ionicons name="person-circle-outline" size={80} color="#4B0082" />
        <Text style={styles.userName}>{userName || 'Usuário'}</Text>
      </View>

      <View style={styles.options}>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="settings-outline" size={20} color="#4B0082" />
          <Text style={styles.optionText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="lock-closed-outline" size={20} color="#4B0082" />
          <Text style={styles.optionText}>Privacidade</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="red" />
          <Text style={[styles.optionText, { color: 'red' }]}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#4B0082',
  },
  profileBox: {
    alignItems: 'center',
    marginBottom: 40,
  },
  userName: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
  },
  options: {
    width: '100%',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4B0082',
  },
});
