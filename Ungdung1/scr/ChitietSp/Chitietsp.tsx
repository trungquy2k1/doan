// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { useRoute } from '@react-navigation/native';

// import {useNavigation} from '@react-navigation/native';
// // import firebase from '../../../firebase/Firebase';
// // import firebase from '../firebase/Firebase';
// import { MainStackParamList, ChitietRouteProp } from '../types/RootList';

// const ChitietSP = () => {
//   const route = useRoute<ChitietRouteProp>();

//   const {product} = route.params;
//   const navigation = useNavigation();
//   const [quantity, setQuantity] = useState(1);

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const increaseQuantity = () => {
//     setQuantity(quantity + 1);
//   };

//   // const addToCart = () => {
//   //   const cartItem = {
//   //     imageUrl: product.imageUrl,
//   //     name: product.text,
//   //     quantity: quantity,
//   //     price: product.gia,
//   //     totalPrice: product.gia * quantity,
//   //   };

//     return (
//       <View style={styles.container}>
//         <View style={{flexDirection: 'row', marginTop: 10}}>
//           <View>
//             {product.image && (
//               <Image
//                 source={{uri: product.image}}
//                 style={{width: 160, height: 200}}
//               />
//             )}
//           </View>
//           <View style={{marginLeft: 10}}>
//             <View>
//               <Text style={styles.nametree}>{product.name}</Text>
//             </View>
//             <View>
//               <Text style={styles.text}>{product.price} VNĐ</Text>
//             </View>

//             {/* <QuantitySelector /> */}
//             <View style={styles.soluong}>
//               <TouchableOpacity onPress={decreaseQuantity} style={styles.btnSL}>
//                 <Text style={[styles.textSL1, {fontSize: 28, color: 'black'}]}>
//                   -
//                 </Text>
//               </TouchableOpacity>
//               <Text style={[styles.textSL, {fontSize: 25, color: '#000'}]}>
//                 {quantity}
//               </Text>
//               <TouchableOpacity onPress={increaseQuantity} style={styles.btnSL}>
//                 <Text style={[styles.textSL1, {fontSize: 28, color: 'black'}]}>
//                   +
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <TouchableOpacity style={styles.addToCartButton}>
//               <Text style={{color: 'black'}}>Thêm vào giỏ hàng</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <ScrollView style={styles.scrollView}>
//           <Text style={styles.text2}>{product.description}</Text>
//           <Text style={styles.text2}>
//             ____________________________________________
//           </Text>
//           <Text style={styles.text2}>
//             ----------------------------------------------------------------------
//           </Text>
//         </ScrollView>
//       </View>
//     );
//   };
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ecc6d9',
//   },
//   scrollView: {
//     flex: 1,
//     backgroundColor: '#ecc6d9',
//     marginTop: 10,
//   },
//   text2: {
//     fontSize: 18,
//     color: '#808000',
//     marginHorizontal: 10,
//     textAlign: 'justify',
//   },
//   text: {
//     fontSize: 20,
//     color: 'black',
//   },
//   nametree: {
//     fontSize: 20,
//     flexWrap: 'wrap',
//     color: '#B22222',
//     fontWeight: 'bold',
//   },
//   soluong: {
//     marginTop: 20,
//     width: '70%',
//     height: 50,
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   textSL: {
//     textAlign: 'center',
//     color: '#000',
//     fontWeight: '800',

//     width: '30%',
//     height: 50,
//     paddingTop: 8,
//   },
//   textSL1: {
//     textAlign: 'center',
//     color: '#000',
//     fontWeight: '800',
//     width: 40,
//     height: 50,
//     paddingTop: 8,
//   },
//   btnSL: {
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 10,
//     alignItems: 'center',
//     width: 50,
//     backgroundColor: 'white',
//   },
//   addToCartButton: {
//     height: 50,
//     width: 200,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 10,
//     marginVertical: 10,
//   },
// });

// export default ChitietSP;

// import React from 'react';
// import { View, Text, Image } from 'react-native';

// const ChitietSP = ({ route }:any) => {
//   const { product } = route.params;

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Image source={{ uri: product.image }} style={{ width: 200, height: 200 }} />
//       <Text style={{fontSize: 30}}>{product.name}</Text>
//       <Text style={{fontSize: 30}}>{product.price}</Text>
//       {/* Thêm nhiều chi tiết khác nếu cần */}
//     </View>
//   );
// };

// export default ChitietSP;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {DocumentData} from 'firebase/firestore';

import styles from './style';
// import Navigation from '../Navigation';
import { useNavigation } from '@react-navigation/native';
const ChitietSP = ({route}: any) => {
  const navigation = useNavigation();
  const {product} = route.params;

  const [products, setProducts] = useState<DocumentData[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedButton, setSelectedButton] = useState('mota');
  // const [showAllSimilarProducts, setShowAllSimilarProducts] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleButtonPress = (buttonName: React.SetStateAction<string>) => {
    setSelectedButton(buttonName);
  };

  /*  Hiển thị sanpham*/

  const fetchData = async () => {
    const snapshot = await firestore()
      .collection('Product')
      .where('category', '==', product.category)
      .get();

    const items = snapshot.docs.map(doc => doc.data());
    setProducts(items);
  };
  useEffect(() => {
    fetchData();
    console.log('category chitiet: ', product.category);
  }, [product.category]);
  //hienthi-an
  const handleToggleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleProductPress = (product: any) => {
    navigation.navigate('ChitietSP', {product});
  };


  // them vao so thich
  const addFavorite = async () => {
    // const totalPrice = product.price * quantity;
    const querySnapshot = await firestore()
    .collection('Favorites')
    .where('name', '==', product.name)
    .get();
    
    if (querySnapshot.empty) {
      // Tạo tài liệu mới nếu không tìm thấy sản phẩm 
      const favoriteItem = {
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
        category: product.category,
        giamgia: product.giamgia,
      };
      try {

      await firestore().collection('Favorites').add(favoriteItem);
      // Alert.alert('Thêm thành công vào sở thích của bạn')
        Alert.alert('Thêm thành công vào sở thích của bạn')
      }catch (error) {
        console.log('Lỗi khi thêm sản phẩm :', error);
      }
      
    }else {
      // Cập nhật tài liệu hiện có nếu sản phẩm đã tồn tại trong giỏ hàng
      // const docRef = querySnapshot.docs[0].ref;
      // const existingCartItem = querySnapshot.docs[0].data();
  
      // const updatedQuantity = existingCartItem.quantity + quantity;
      // const updatedPrice = existingCartItem.price + product.price * quantity;
  
      // await docRef.update({
      //   quantity: updatedQuantity,
      //   price: updatedPrice,
      // });
      Alert.alert('Sản phẩm đã có trong sở thích của bạn');
    }
  }
  
  //   try {

      
  //     Alert.alert('Thêm thành công vào sở thích của bạn')
  //   } catch (error) {
  //     console.log('Lỗi khi thêm sản phẩm :', error);
  //   }
  // };

//them vao gio hang
  const addToCart = async () => {
    const querySnapshot = await firestore()
      .collection('Cart')
      .where('name', '==', product.name)
      .get();
  
    if (querySnapshot.empty) {
      // Tạo tài liệu mới nếu không tìm thấy sản phẩm trong giỏ hàng
      const cartItem = {
        name: product.name,
        quantity: quantity,
        price: product.price * quantity,
        image: product.image,
      };
  
      await firestore().collection('Cart').add(cartItem);
      Alert.alert('Sản phẩm đã được thêm vào giỏ hàng');
    } else {
      // Cập nhật tài liệu hiện có nếu sản phẩm đã tồn tại trong giỏ hàng
      const docRef = querySnapshot.docs[0].ref;
      const existingCartItem = querySnapshot.docs[0].data();
  
      const updatedQuantity = existingCartItem.quantity + quantity;
      const updatedPrice = existingCartItem.price + product.price * quantity;
  
      await docRef.update({
        quantity: updatedQuantity,
        price: updatedPrice,
      });
      Alert.alert('Số lượng sản phẩm đã được cập nhật trong giỏ hàng');
    }
  };


  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: product.image }} style={{ width: 200, height: 200 }} /> */}
      <View style={styles.img}>
        <ImageBackground
          source={{uri: product.image}}
          style={styles.imgbackground}>
          {product.giamgia != 0 && (
            <Text style={styles.textgiamgia}>Giảm {product.giamgia} %</Text>
          )}
        </ImageBackground>

        <View style={styles.info}>
          <Text style={styles.tensp}>{product.name}</Text>
          <View style={styles.soluong}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.btnSL}>
              <Text style={[styles.textSL1, {fontSize: 28, color: 'black'}]}>
                -
              </Text>
            </TouchableOpacity>
            <Text style={[styles.textSL, {fontSize: 25, color: '#000'}]}>
              {quantity}
            </Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.btnSL}>
              <Text style={[styles.textSL1, {fontSize: 28, color: 'black'}]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          {product.giamgia != 0 ? (
            <View style={styles.giamgia}>
              <Text style={styles.giagoc}>Giá từ: {product.giagoc}</Text>
              <Text style={styles.giaban}>Còn: {product.price}</Text>
            </View>
          ) : (
            <Text style={[styles.giaban, {marginTop: 5}]}>
              Giá chỉ: {product.price} đ
            </Text>
          )}
        </View>
      </View>

      {/* <QuantitySelector /> */}

      <View style={styles.motavaBluan}>
        <TouchableOpacity
          style={[
            styles.btnmota,
            selectedButton === 'mota' && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress('mota')}>
          <Text
            style={[
              styles.txtmota,
              selectedButton === 'mota' && styles.selectedButtonText,
            ]}>
            Thông tin sản phẩm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnmota,
            selectedButton === 'binhluan' && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress('binhluan')}>
          <Text
            style={[
              styles.txtmota,
              selectedButton === 'binhluan' && styles.selectedButtonText,
            ]}>
            Bình Luận
          </Text>
        </TouchableOpacity>
      </View>
      {selectedButton === 'mota' ? (
        <View style={styles.mota}>
          <ScrollView>

            <View style={styles.motatext}>
              <Text
                style={[
                  styles.motatext,
                  showFullDescription ? {height: 'auto'} : {height: 180},
                ]}>
                {product.description}
              </Text>
              {product.description.length > 200 && (
                <TouchableOpacity onPress={handleToggleShowFullDescription}>
                  <Text style={styles.viewMoreText}>
                    {showFullDescription ? 'Ẩn bớt' : 'Xem thêm'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View>
              <Text style={{fontSize: 20, color: 'black', fontWeight: '400'}}>
                Sản phẩm tương tự
              </Text>
              {/**hiển thị sản phẩm tương tự */}

              <FlatList
                data={products}
                // data={showAllSimilarProducts ? products : products.slice(0, 5)}
                horizontal={true}
                // keyExtractor={item => item.id}
                keyExtractor={item => item.name.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity style={styles.sptuongtu} onPress={()=>handleProductPress(item)}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.imgtuongtu}
                    />
                    <Text
                      style={[
                        styles.tentuongtu,
                        {marginVertical: 5, height: 36},
                      ]}>
                      {item.name}
                    </Text>
                    <Text style={styles.tentuongtu}>Giá: {item.price}</Text>
                  </TouchableOpacity>
                )}
              />
              {/* ---------------------------------------- */}
            </View>
          </ScrollView>
          <View style={styles.dathang}>
            <TouchableOpacity style={styles.cart} onPress={addToCart}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}>
                <Image
                  source={require('./Icon/cart.png')}
                  style={styles.imgcart}
                />
              </View>

              <Text style={{fontSize: 18, color: '#fff'}}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tim} onPress={addFavorite}>
              <Image
                source={require('./Icon/heart.png')}
                style={styles.imgtim}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text>Bình Luận</Text>
      )}
    </View>
  );
};
export default ChitietSP;
