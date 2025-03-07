import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Boton from '../../app-temp/Components/Boton'; 

const productoDetails = () => {
    const ruta = useRouter();
    
    type producto = {
        id: number;
        title: string;
        price?: number;
        description: string;
        category?: string;
        image: string;
        rating?: {
            rate: number;
            count: number;
        };
    };
    
    const [Productos, setProductos] = useState<producto[]>([]);
    const [Cargando, setCargando] = useState<boolean>(true);

    useEffect(() => {
        const consultarAPI = async () => {
            setCargando(true);
            try {
                const respuesta = await fetch('https://fakestoreapi.com/products');
                if (!respuesta.ok) {
                    throw new Error(`Error al obtener productos: ${respuesta.status}`);
                }
                const datos = await respuesta.json();
                setProductos(datos);
            } catch (error) {
                console.log('❌ Error:', error);
            } finally {
                setCargando(false);
            }
        };
        consultarAPI();
    }, []);

    if (Cargando) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="blue" />
                <Text>Cargando lista de productos...</Text>
            </View>
        );
    }

 
    const renderProducto = ({ item }: { item: producto }) => (
        <View style={styles.card}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Image source={{ uri: item.image }} style={styles.imagen} />
            <Boton
                  titulo="Ver Detalles"
                  onPress={() => ruta.push({
                      pathname: '/productos/data',
                      params: { producto: encodeURIComponent(JSON.stringify(item)) }
                  })}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={Productos}
                renderItem={renderProducto}
                style={styles.flatlist}
            />
        </View>
    );
};

export default productoDetails;


const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, alignItems: 'center', paddingTop: 10 },
    card: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    imagen: { height: 100, width: 100, marginVertical: 10 },
    flatlist: { width: '100%' },
});
