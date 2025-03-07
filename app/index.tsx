import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

// Definir el tipo de usuario
type User = {
  id: number
  username: string;
  password: string;
  email: string;
  name: { firstname: string; lastname: string };
  address: { city: string };
  phone: string;
};

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]); // Definir que es una lista de User

  // Obtener usuarios de la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/users");
        const data: User[] = await response.json(); // Asegurar el tipo de datos
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  // Función para iniciar sesión
  const handleLogin = () => {
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      Alert.alert("Inicio de sesión exitoso", `Bienvenido ${foundUser.username}`);
      router.replace("/(tabs)"); // Redirigir a la pantalla de Tabs
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Usuario"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Ingresar" onPress={handleLogin} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
