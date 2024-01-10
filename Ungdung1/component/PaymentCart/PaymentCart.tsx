import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './style';
// import Space from './Space';

const PaymentCard = () => {
  return (
    <View style={styles.viewcart}>
      <View style={styles.cart}>
        <Image
          style={styles.imgcart}
          source={require('../../scr/Image/Image/Paypal.jpg')}
        />
        <View>
          <Text style={styles.titlecart}>Paypal</Text>
          {/* <Text>faster and safer way to transfer money</Text> */}
        </View>
      </View>
      {/* <Space Size={10} /> */}
      <View style={styles.cart}>
        <Image
          style={styles.imgcart}
          source={require('../../scr/Image/Image/CreditCard.jpg')}
        />
        <View>
          <Text style={styles.titlecart}>Credit card</Text>
          {/* <Text>faster and safer way to transfer money</Text> */}
        </View>
      </View>
      {/* <Space Size={10} /> */}
      <View style={styles.cart}>
        <Image
          style={styles.imgcart}
          source={require('../../scr/Image/Image/momo.jpg')}
        />
        <View>
          <Text style={styles.titlecart}>Mo mo</Text>
          {/* <Text>faster and safer way to transfer money</Text> */}
        </View>
      </View>
      {/* <Space Size={10} /> */}
    </View>
  );
};

export default PaymentCard;
