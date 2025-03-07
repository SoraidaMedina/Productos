import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const propiedades = () => {
  return (
    <View>
      <Text>Propiedades</Text>
      <Link href={'/'}>Ir a Index...</Link>
    </View>
  )
}

export default propiedades

const styles = StyleSheet.create({})