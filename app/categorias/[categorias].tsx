import { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function CategoriaProductos() {
    const { nombre } = useLocalSearchParams(); 
    const [productos, setProductos] = useState<{ 
        id: number; 
        title: string; 
        price: number; 
        image: string; 
    }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProductos() {
            if (!nombre) return; 

            try {
                const apiUrl = `https://fakestoreapi.com/products/category/${nombre}`;
                console.log("URL de la API:", apiUrl);

                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error(`Error en la API: ${response.status}`);
                
                const data = await response.json();
                console.log(" Productos recibidos:", data); 

                setProductos(data);
            } catch (error) {
                console.error(" Error al obtener productos:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProductos();
    }, [nombre]);

    if (loading) return <ActivityIndicator size="large" />;

    if (!productos.length) {
        console.log("📭 Lista de productos vacía:", productos);
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No se encontraron productos en esta categoría</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={productos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.text}>{item.title}</Text>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text>Precio: ${item.price}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    card: { padding: 10, margin: 10, backgroundColor: "white", borderRadius: 5, alignItems: "center" },
    text: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    image: { width: 100, height: 100, marginBottom: 10 },
    errorText: { fontSize: 18, color: "red", fontWeight: "bold" }
});
