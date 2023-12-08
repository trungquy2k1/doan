// import { View } from "react-native"

// const Header = ()=> {
//     return(
//         <View></View>
//     )
// }
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
// import { Ionicons } from "@expo/vector-icons";

export default function Header2({navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}>
        {/* <Ionicons
                    name='chevron-back'
                    size={37}>
                </Ionicons> */}
        <Text style={{fontSize: 18, color: '#000'}}>Trở lại</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('Cart')}>
        {/* <Ionicons
                    name='chevron-back'
                    size={37}>
                </Ionicons> */}
        {/* <Text style={{fontSize: 18, color: '#000'}}>Trở lại</Text> */}
        <Image source={require('../../scr/Image/Category/cart.png')} 
            style={{width: 30, height: 30}}
        />
      </TouchableOpacity>

      {/* <Text style={{ alignItems: 'center' }}>{title}</Text> */}
      <Text style={{width: 50}}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
    back:{
        height: 45,
        backgroundColor: '#fff',
        width: '90%',
        justifyContent: 'center',
        // alignItems: 'center',
    }
})