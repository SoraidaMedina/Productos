import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const ProductoDetalles = () => {
    const params = useLocalSearchParams();
    const producto = Array.isArray(params.producto) ? params.producto[0] : params.producto;

    if (!producto) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>⚠️ Error: No hay datos del producto</Text>
            </View>
        );
    }

    let productoJson;
    try {
        productoJson = JSON.parse(decodeURIComponent(producto)); 
    } catch (error) {
        console.error('❌ Error al analizar JSON:', error);
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>⚠️ Error al cargar el producto</Text>
            </View>
        );
    }

    // 🔍 Verificar URL de imagen
    console.log('🖼️ URL de la imagen:', productoJson.image);

    // Asegurar que la URL es segura (https://)
    const imageUrl = productoJson.image?.startsWith('http://') 
        ? productoJson.image.replace('http://', 'https://') 
        : productoJson.image;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{productoJson.title}</Text>

            {imageUrl ? (
                <Image 
                    source={{ uri: imageUrl }} 
                    style={styles.image} 
                    resizeMode="contain"
                />
            ) : (
                <Text style={styles.errorText}>⚠️ Imagen no disponible</Text>
            )}

            <Text style={styles.price}>Precio: ${productoJson.price}</Text>
            <Text style={styles.description}>{productoJson.description}</Text>
        </View>
    );
};

export default ProductoDetalles;

const styles = StyleSheet.create({
  container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 20 
  },
  center: {  // 🔹 Agregamos el estilo "center"
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  title: { 
      fontSize: 20, 
      fontWeight: 'bold', 
      textAlign: 'center' 
  },
  image: { 
      width: 200, 
      height: 200, 
      marginVertical: 20 
  },
  price: { 
      fontSize: 18, 
      fontWeight: 'bold' 
  },
  description: { 
      textAlign: 'center', 
      marginTop: 10 
  },
  errorText: { 
      color: 'red', 
      fontSize: 16, 
      fontWeight: 'bold' 
  }
});
