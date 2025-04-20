import { useEffect, useRef, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { LocationObjectCoords } from "expo-location";
import { useRouter } from "expo-router"; 

export default function MapaComBusca() {
  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.warn("Permissão negada");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      const coords: Region = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setLocation(loc.coords);
      setRegion(coords);
    })();
  }, []);

  const handleLocalizar = async () => {
    let loc = await Location.getCurrentPositionAsync({});
    const coords: Region = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setRegion(coords);
    setLocation(loc.coords);
    mapRef.current?.animateToRegion(coords, 1000); // anima em 1 segundo
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          region={region}
          showsUserLocation
        >
          <Marker coordinate={region} title="Você está aqui" />
        </MapView>
      )}

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar endereço ou local..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.footer}>
        {/* Botão "Início" */}
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => router.push("/inicio")}
        >
          <Ionicons name="home" size={24} color="white" />
          <Text style={styles.footerText}>Início</Text>
        </TouchableOpacity>

        {/* Botão Perfil */}
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => router.push("/perfil")}
        >
          <Ionicons name="person" size={24} color="white" />
          <Text style={styles.footerText}>Perfil</Text>
        </TouchableOpacity>

        {/* Botão Localizar (agora funcionando!) */}
        <TouchableOpacity style={styles.footerButton} onPress={handleLocalizar}>
          <Ionicons name="navigate" size={24} color="white" />
          <Text style={styles.footerText}>Localizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchInput: {
    fontSize: 16,
    color: "#000",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#4B0082",
    paddingVertical: 20, 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerButton: {
    alignItems: "center",
    marginTop: -4, 
  },
  footerText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
});
