import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, Image } from 'react-native';

import styles from './style';
// const MyButton = (props) => {
const MyButton = (props) => {

    // const [isPressed, setIsPressed] = useState(false);
  
    // const handlePress = () => {
    //   setIsPressed(!isPressed);
    //   // Thực hiện các hành động khác khi button được nhấn
    // };
  
    return (
      <TouchableOpacity
        // style={[styles.button, {props.style}]}
        style = {[props.style, styles.button]}
        onPress={props.onPress}
      >
        <Text style={styles.buttonText}>{props.titlebtn}</Text>
      </TouchableOpacity>
    );
  };

  
  export default MyButton;