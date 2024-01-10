// import { Text, View } from "react-native"

// const Cart = () => {
//     return (
//         <View>
//             <Text>Cart screen</Text>
//         </View>
//     )
// }

// export default Cart

import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
// import firebase from '../../../firebase/Firebase';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {DocumentData, doc} from 'firebase/firestore';
// import firebase from '../firebase/Firebase';
// import Drawer from '../navigation/Drawer';
import {AppContext} from '../../component/AppContext/AppContext';
import styles from './style';

const Giohang = () => {
  const [products, setProducts] = useState<DocumentData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const {emailname} = useContext(AppContext);
  const navigation = useNavigation();

  const featchData = async () => {
    try {
      const subscriber = firestore()
        .collection('Cart')
        .where('username', '==', emailname)
        .onSnapshot(querySnapshot => {
          const cart: React.SetStateAction<DocumentData[]> | {key: string}[] =
            [];

          querySnapshot.forEach(documentSnapshot => {
            cart.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setProducts(cart);
          // setLoading(false);
        });

      return () => subscriber();
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  // console.log(' so luong: ', products.length)
  useEffect(() => {
    // Lắng nghe các thay đổi đối với thông tin sản phẩm trong giỏ hàng
    featchData();
    // console.log('product: ', JSON.stringify(products, null, 3));
  }, []);
  const handleRefresh = () => {
    setIsRefreshing(true);
    featchData().then(() => setIsRefreshing(false));
  };
  const deleteProduct = async (productId: string) => {
    try {
      await firestore().collection('Cart').doc(productId).delete();
      Alert.alert('Xóa thành công!');
      // console.log('Deleted product ID:', doc);
      featchData();
      console.log('productId: ', productId);
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };
  const totalAmount = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );
  // let formattedTotalAmount = totalAmount.toLocaleString('vi-VN', {
  //   style: 'currency',
  //   currency: 'VND'
  // });
  let formattedTotalAmount = totalAmount.toLocaleString();
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.name, {color: 'blue', fontSize: 24, marginBottom: 10}]}>Giỏ hàng</Text>
      {/* <Text style={[styles.name, {fontSize: 18}]}>
        Các sản phẩm mà {emailname} đã chọn
      </Text> */}
      <View style={styles.tongquan}>
        <Text style={[styles.name, {fontSize: 18}]}>Bạn đã chọn {products.length} sản phẩm</Text>
        <Text style={styles.totalText}>
          Tổng tiền: {formattedTotalAmount} VNĐ
        </Text>
      </View>
      {/* <View> */}
        {!isShow ? (
          <TouchableOpacity
            onPress={() => setIsShow(true)}
            style={styles.btnhien}>
            <Text style={[styles.name, {fontSize: 18, color: '#fff'}]}>Hiển thị</Text>
          </TouchableOpacity>
        ) : (
          // <View>

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
            >
              <View style={{justifyContent: 'center', alignItems:'center'}}>
            <TouchableOpacity
              onPress={() => setIsShow(false)}
              style={styles.btnhien}>
              <Text style={[styles.name, {fontSize: 18, color: '#fff'}]}>Ẩn</Text>
            </TouchableOpacity>
            </View>

            {products.map((product, index) => (
              <View key={index} style={styles.product}>
                <Image source={{uri: product.image}} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{product.name}</Text>
                  <Text style={styles.price}>
                    {product.price.toLocaleString()} VNĐ
                  </Text>
                  <Text style={styles.quantity}>x{product.quantity}</Text>
                  {/* <Text style={styles.quantity}>x{product.key}</Text> */}

                  <Text>______________________________________</Text>
                </View>
                <TouchableOpacity
                  style={styles.delete}
                  // onPress={() => {
                  //   deleteProduct(product.key);
                  //   console.log('produc id', product.name);
                  // }}
                  onPress={() =>
                    Alert.alert('Bạn có chắc chắn muốn xóa', '', [
                      {text: 'Cancel'},
                      {
                        text: 'OK',
                        // onPress: () => navigation.navigate('Home'),
                        onPress: () => {
                          deleteProduct(product.key);
                          console.log('produc id', product.name);
                        },
                        style: 'default',
                      },
                    ])
                  }>
                  <Image
                    source={require('../Image/Category/delete1.png')}
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: '#fff',
                      borderRadius: 28,
                    }}
                  />
                  <Text style={{color: '#fff', fontSize: 16}}>Xóa</Text>
                  {/* console.console.log('id: ', product.id); */}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          // </View>
        )}
      {/* </View> */}

      {/* <Drawer tile="GIỎ HÀNG" /> */}

      {/* <View style={styles.total}>
        <Text style={styles.totalText}>Tổng tiền: </Text>
        <Text style={styles.totalText}>{formattedTotalAmount} VNĐ</Text>
      </View> */}

      {formattedTotalAmount === '0' ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.totalText}>Bạn hãy lựa chọn sản phẩm trước</Text>
        <TouchableOpacity style={[styles.thanhtoan,{width: 160, height: 40}]} onPress={()=>navigation.navigate('Category')}>
        <Text style={styles.totalText}>Đi Tới</Text>

        </TouchableOpacity>
        </View>
      ):(
        <View style={styles.thanhtoan}>
        <TouchableOpacity
          // onPress={() =>
          //   Alert.alert('Thanh toán thành công', 'Cảm ơn bạn đã đặt hàng', [
          //     {text: 'Cancel'},
          //     {
          //       text: 'OK',
          //       onPress: () => navigation.navigate('Payment'),
          //       style: 'default',
          //     },
          //   ])
          // }
          // onPress={()=>navigation.navigate('Payment')}
          onPress={() =>
            navigation.navigate('Payment', {formattedTotalAmount})
          }>
          <Text style={styles.totalText}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
      )}
      
    </View>
  );
};

export default Giohang;
