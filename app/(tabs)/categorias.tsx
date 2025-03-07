import { useEffect, useState } from 'react';
import { FlatList, Text, View, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function CategoriasScreen() {
    const router = useRouter();
    const [categorias, setCategorias] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('https://fakestoreapi.com/products/categories');
                if (!response.ok) throw new Error('Error al obtener las categorías');
                
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    if (loading) return <ActivityIndicator size="large" />;

    return (
        <FlatList
            data={categorias}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.text}>{item}</Text>
                    <Button 
                        title="Ver Productos" 
                        onPress={() => router.push(`/categorias/${item}`)} 
                    />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    card: { padding: 10, margin: 10, backgroundColor: 'white', borderRadius: 5 },
    text: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 }
});