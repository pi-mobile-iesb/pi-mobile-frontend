import { useState, useEffect, useRef } from "react";
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
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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

  async function handleLogin() {
    const clienteSalvo = await AsyncStorage.getItem("cliente");

    if (clienteSalvo) {
      const cliente = JSON.parse(clienteSalvo);

      if (cliente.email === email && cliente.senha === senha) {
        await AsyncStorage.setItem("user", JSON.stringify({ email }));
        router.replace("/(tabs)");
      } else {
        Alert.alert("Erro", "E-mail ou senha inválidos");
      }
    } else {
      Alert.alert("Erro", "Cliente não encontrado. Faça o cadastro.");
    }
  }

  function handleCadastro() {
    router.push("/cadastro");
  }

  return (
    <LinearGradient
      colors={["#8a2be2", "#ffffff"]}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY }],
            },
          ]}
        >
          <Text style={styles.title}>CicloMobi</Text>
          <FontAwesome5 name="biking" size={48} color="#fff" style={styles.icon} />

          <TextInput
            style={[styles.input, styles.outlined]}
            placeholder="E-mail"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={[styles.input, styles.outlined]}
            placeholder="Senha"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCadastro}>
            <Text style={styles.registerText}>Ainda não tem uma conta? Cadastre-se</Text>
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
    alignItems: "center",
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  input: {
    width: "85%",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  outlined: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    width: "85%",
    padding: 15,
    backgroundColor: "#4B0082",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 15,
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
