// import { View } from "react-native"

// const Header = ()=> {
//     return(
//         <View></View>
//     )
// }
import {View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground} from 'react-native';
import React from 'react';
// import { Ionicons } from "@expo/vector-icons";

export default function Header2({navigation, trangcon, source, nd}) {
  const [hienthi, setHienthi] = React.useState(false)
  const handleClick = () =>{
    navigation.navigate(trangcon)
    setHienthi(true)
  }
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
        onPress={handleClick}>
        {/* <Ionicons
                    name='chevron-back'
                    size={37}>
                </Ionicons> */}
        {/* <Text style={{fontSize: 18, color: '#000'}}>Trở lại</Text> */}
        {/* <Image source={require('../../scr/Image/Category/cart.png')}  */}
        {/* {hienthi} */}
        {/* <Image source={source} 

            style={{width: 30, height: 30}}
        /> */}
        <ImageBackground source={source} style={{width: 30, height: 40, justifyContent:'center', alignItems: 'center'}}>
          <Text style={styles.nd}>{nd}</Text>
        </ImageBackground>
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
    },
    nd:{
    // width: 40,
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 15,
    top: 0,
    color: 'red',
    borderRadius: 18,
    // justifyContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900'
    }
})