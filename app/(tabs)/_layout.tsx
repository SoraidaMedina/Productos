import { Tabs } from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{ title: 'Productos' }} />
            <Tabs.Screen 
                name="productos" 
                options={{ 
                    title: 'Productos', 
                    tabBarIcon: ({ color }) => <FontAwesome6 name="shopping-cart" size={24} color={color} />
                }} 
            />
            <Tabs.Screen 
                name="categorias"  // 📌 Agregamos la pestaña de categorías
                options={{ 
                    title: 'Categorías', 
                    tabBarIcon: ({ color }) => <FontAwesome6 name="list" size={24} color={color} />
                }} 
            />
            <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
            <Tabs.Screen name="settings" options={{ title: 'Configuración' }} />
        </Tabs>
    );
}