import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const perfil = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo} >perfil</Text>
    </View>
  )
}

export default perfil

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    link:{
        color: 'blue',
        fontSize: 16,
        textDecorationLine: 'underline',
        marginTop: 20,
        textAlign: 'center'
    }
})