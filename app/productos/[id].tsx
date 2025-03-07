import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Definir la estructura del producto
type Producto = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

export default function ProductDetail() {
    const params = useLocalSearchParams();
    const id = params.id ? String(params.id) : null; 

    const [product, setProduct] = useState<Producto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchProduct() {
            if (!id) {
                console.error('❌ ID del producto no válido:', id);
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) throw new Error(`Error en la API: ${response.status}`);

                const text = await response.text();
                console.log('🔍 Respuesta de la API:', text);

                if (text.startsWith('<') || text.includes('html')) {
                    throw new Error('⚠️ La API devolvió HTML en lugar de JSON.');
                }

                const data = JSON.parse(text);
                setProduct(data);
            } catch (error) {
                console.error('❌ Error obteniendo detalles del producto:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) return <ActivityIndicator size="large" />;

    return (
        <View style={styles.container}>
            {product ? (
                <>
                    <Text style={styles.title}>{product.title}</Text>
                    <Image source={{ uri: product.image }} style={styles.image} />
                    <Text style={styles.price}>Precio: ${product.price}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </>
            ) : (
                <Text style={styles.error}>⚠️ Producto no encontrado.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
    image: { width: 200, height: 200, marginVertical: 20 },
    price: { fontSize: 18, fontWeight: 'bold' },
    description: { textAlign: 'center', marginTop: 10 },
    error: { fontSize: 18, color: 'red', fontWeight: 'bold' }
});
