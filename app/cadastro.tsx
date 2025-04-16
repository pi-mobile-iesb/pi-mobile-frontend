import { useState, useRef, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Cliente } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Cadastro() {
  const [cliente, setCliente] = useState<Cliente>({
    nome: "",
    email: "",
    sobrenome: "",
    senha: "",
  });
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  async function handleCadastro() {
    if (cliente.nome && cliente.email && cliente.sobrenome && cliente.senha) {
      if (cliente.senha !== confirmarSenha) {
        Alert.alert("Erro", "As senhas não coincidem!");
        return;
      }

      const clienteExistente = await AsyncStorage.getItem("cliente");
      if (clienteExistente) {
        const parsedCliente = JSON.parse(clienteExistente);
        if (parsedCliente.email === cliente.email) {
          Alert.alert("Erro", "Este email já está cadastrado!");
          return;
        }
      }

      await AsyncStorage.setItem("cliente", JSON.stringify(cliente));

      Alert.alert(
        "Cadastro",
        `Cadastro de ${cliente.nome} salvo!\nE-mail: ${cliente.email}\nSenha: ${cliente.senha}`
      );
      router.replace("/login");
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
  }

  return (
    <LinearGradient colors={["#8a2be2", "#ffffff"]} style={styles.gradient}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.replace("/login")}
          >
            <Ionicons name="arrow-back" size={30} color="#fff" /> 
          </TouchableOpacity>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY }],
          }}
        >
          <Text style={styles.title}>Cadastro</Text>

          <TextInput
            style={styles.input}
            value={cliente.nome}
            onChangeText={(nome) => setCliente({ ...cliente, nome })}
            placeholder="Nome"
            placeholderTextColor="#aaa"
          />

          <TextInput
            style={styles.input}
            value={cliente.email}
            onChangeText={(email) => setCliente({ ...cliente, email })}
            placeholder="E-mail"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            value={cliente.sobrenome}
            onChangeText={(sobrenome) => setCliente({ ...cliente, sobrenome })}
            placeholder="Sobrenome"
            placeholderTextColor="#aaa"
          />

          <TextInput
            style={styles.input}
            value={cliente.senha}
            onChangeText={(senha) => setCliente({ ...cliente, senha })}
            placeholder="Senha"
            placeholderTextColor="#aaa"
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholder="Confirmar Senha"
            placeholderTextColor="#aaa"
            secureTextEntry
          />


          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Salvar Cadastro</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4B0082",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
});
