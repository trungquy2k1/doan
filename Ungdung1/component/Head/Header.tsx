// import { View } from "react-native"

// const Header = ()=> {
//     return(
//         <View></View>
//     )
// }
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
// import { Ionicons } from "@expo/vector-icons";

export default function Header2({navigation, trangcon, source, nd, ht, onPress}) {
  const [hienthi, setHienthi] = React.useState(false);
  const handleClick = () => {
    navigation.navigate(trangcon);
    setHienthi(!ht);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={{fontSize: 18, color: '#000'}}>Trở lại</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.back} onPress={onPress}>
        <ImageBackground
          source={source}
          style={{
            width: 30,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {!hienthi && 
              <Text style={styles.nd}>{nd}</Text>
            }
          
        </ImageBackground>
      </TouchableOpacity>
      <Text style={{width: 50}}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    height: 45,
    backgroundColor: '#fff',
    width: '90%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  nd: {
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
    fontWeight: '900',
  },
});
