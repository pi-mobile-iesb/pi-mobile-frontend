import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = '1d5da22be50ae8af1720d8c9376a501e';

export default function Inicio() {
  const [weather, setWeather] = useState<any>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [userName, setUserName] = useState<string>('');
  const router = useRouter();

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        Alert.alert('Erro', 'Não foi possível obter a previsão do tempo.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível acessar os dados do clima.');
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão de localização negada!');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      fetchWeather(loc.coords.latitude, loc.coords.longitude);

      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      } else {
        setUserName('Visitante'); 
      }
    })();
  }, []);

  const handleEmergency = () => {
    alert('Emergência acionada!');
  };

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>{`Bem-vindo ao CicloMobi, ${userName}!`}</Text> 

      {/* Exibir a previsão do tempo, se disponível */}
      {weather ? (
        <View style={styles.weatherBox}>
          <View style={styles.weatherInfo}>
            {/* Usando um ícone do Ionicons para representar o clima */}
            <Ionicons 
              name={weather.weather[0].main === 'Clear' ? 'sunny' : 'cloudy'}
              size={50} 
              color="#4B0082" 
            />
            <View style={styles.weatherDetails}>
              <Text style={styles.weatherText}>{`Localização: ${weather.name}`}</Text>
              <Text style={styles.weatherText}>{`Temperatura: ${Math.round(weather.main.temp)}°C`}</Text>
              <Text style={styles.weatherText}>{`Descrição: ${weather.weather[0].description}`}</Text>
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.weatherText}>Carregando a previsão do tempo...</Text>
      )}

      {/* Opções de funcionalidades */}
      <View style={styles.featuresContainer}>
        {/* Histórico de Viagens */}
        <TouchableOpacity style={styles.featureButton} onPress={() => router.push('/historico')}>
          <Ionicons name="time" size={24} color="#4B0082" />
          <Text style={styles.featureText}>Histórico de Viagens</Text>
        </TouchableOpacity>

        {/* Rotas Favoritas */}
        <TouchableOpacity style={styles.featureButton} onPress={() => router.push('/rotas-favoritas')}>
            <Ionicons name="heart-outline" size={24} color="#4B0082" />
            <Text style={styles.featureText}>Rotas Favoritas</Text>
        </TouchableOpacity>

        {/* Botão de Emergência */}
        <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergency}>
          <Ionicons name="alert-circle" size={24} color="white" />
          <Text style={styles.emergencyText}>Emergência</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  header: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 20,
  },
  weatherBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,  
    borderRadius: 10,
    width: '90%',  
    marginBottom: 20,
    alignItems: 'center', 
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',  
  },
  weatherDetails: {
    flexDirection: 'column',
    alignItems: 'center',  
  },
  weatherText: {
    fontSize: 16,
    color: '#4B0082',
  },
  featuresContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  featureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  featureText: {
    fontSize: 16,
    color: '#4B0082',
    marginLeft: 10,
  },
  emergencyButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emergencyText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
});
