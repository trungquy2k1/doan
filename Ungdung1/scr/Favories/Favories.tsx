// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   RefreshControl,
// } from 'react-native';
// // import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import firestore from '@react-native-firebase/firestore';
// import {DocumentData} from 'firebase/firestore';
// import styles from './style';
// // import {MainStackParamList} from '../types/RootList';
// import {useNavigation} from '@react-navigation/native';
// const Favories = () => {
//   const navigation = useNavigation();
//   //   const {categoryname} = route.params;
//   const [products, setProducts] = useState<DocumentData[]>([]);
//   const [searchText, setSearchText] = useState('');
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [numColumns, setNumColumns] = useState(2);

//   const fetchData = async () => {
//     const snapshot = await firestore()
//       .collection('Favorites')
//       //   .where('category', '==', categoryname)
//       .get();

//     const items = snapshot.docs.map(doc => doc.data());
//     setProducts(items);

//   };
//   const handleRefresh = () => {
//     setIsRefreshing(true);
//     fetchData().then(() => setIsRefreshing(false));
//   };

//   useEffect(() => {
//     fetchData();
//     //
//   }, []);

//   const handleProductPress = (product: any) => {
//     navigation.navigate('ChitietSP', {product});

//   };

//   // const handleChangeNumColumns = (newNumColumns) => {
//   //   setNumColumns(newNumColumns);
//   // };
//   const flatListKey = numColumns.toString();

//   const filterProducts = (keyword: string) => {
//     const filteredProducts = products.filter(item =>
//       item.name.toLowerCase().includes(keyword.toLowerCase()),
//     );
//     return filteredProducts;
//   };
//   const filteredProducts = filterProducts(searchText);

//   const renderProductItem = ({item}: any) => (
//     <View>
//       <TouchableOpacity
//         style={styles.productContainer}
//         onPress={() => handleProductPress(item)}>
//         <Image source={{uri: item.image}} style={styles.productImage} />
//         <View style={styles.productInfo}>
//           {item.giamgia != 0 && (
//             <View style={styles.giamgia}>
//               <Text style={[styles.gia, {color: 'red', fontSize: 18}]}>
//                 Giảm
//               </Text>
//               <Text> </Text>
//               <Text style={[styles.gia, {color: 'red', fontSize: 18}]}>
//                 {item.giamgia} %
//               </Text>
//             </View>
//           )}
//           <Text style={styles.productName}>{item.name}</Text>

//           <View>
//             <Text style={[styles.productPrice, {fontSize: 22}]}>
//               Giá: {item.price} đ
//             </Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={{marginBottom: 50}}>
//       <View style={styles.timkiem}>
//         <TextInput
//           value={searchText}
//           onChangeText={text => setSearchText(text)}
//           placeholder="Tìm sản phẩm..."
//           style={styles.inputtimkiem}
//         />
//       </View>
//       <FlatList
//         // data={products}
//         data={filteredProducts}
//         // numColumns={2}
//         renderItem={renderProductItem}
//         keyExtractor={item => item.name.toString()}
//         refreshControl={
//           <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
//         }
//         numColumns={numColumns}
//         key={flatListKey}
//       />
//     </View>
//   );
// };

// export default Favories;

import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import {DocumentData} from 'firebase/firestore';
import {useNavigation} from '@react-navigation/native';

import styles from './style';
import {AppContext} from '../../component/AppContext/AppContext';
// import {MainStackParamList} from '../types/RootList';
const Favories = () => {
  const navigation = useNavigation();
  const {emailname} = useContext(AppContext);
  //   const {categoryname} = route.params;
  const [products, setProducts] = useState<DocumentData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [numColumns, setNumColumns] = useState(2);

  const fetchFavories = async () => {
    const snapshot = await firestore()
      .collection('Favorites')
      .where('user', '==', emailname)
      .get();

    // const items = snapshot.docs.map(doc => doc.data());
    const items = snapshot.docs.map(doc => ({
      ...doc.data(),
      key: doc.id,
    }));
    setProducts(items);
  };
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchFavories().then(() => setIsRefreshing(false));
  };

  useEffect(() => {
    fetchFavories();
    //
  }, [products.length]);

  const handleProductPress = (product: any) => {
    navigation.navigate('ChitietSP', {product});
  };

  // const handleChangeNumColumns = (newNumColumns) => {
  //   setNumColumns(newNumColumns);
  // };
  const flatListKey = numColumns.toString();

  const filterProducts = (keyword: string) => {
    const filteredProducts = products.filter(item =>
      item.name.toLowerCase().includes(keyword.toLowerCase()),
    );
    return filteredProducts;
  };
  const filteredProducts = filterProducts(searchText);

  //Bỏ thích
  const Dislike = async idfavories => {
    try {
      const snapshot = await firestore()
        .collection('Favorites')
        .doc(idfavories)
        .delete();
      fetchFavories();
    } catch (err) {
      console.log('Lỗi rồi: ', err);
    }
  };

  const renderProductItem = ({item}: any) => (
    <View style={styles.favories}>
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => handleProductPress(item)}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.productInfo}>
          {item.giamgia != 0 && (
            <View style={styles.giamgia}>
              <Text style={[styles.gia, {color: 'red', fontSize: 18}]}>
                Giảm
              </Text>
              <Text> </Text>
              <Text style={[styles.gia, {color: 'red', fontSize: 18}]}>
                {item.giamgia} %
              </Text>
            </View>
          )}
          <Text style={styles.productName}>{item.name}</Text>

          <View>
            <Text style={[styles.productPrice, {fontSize: 22}]}>
              Giá: {item.price} đ
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnxoa} onPress={() => Dislike(item.key)}>
        <Text style={styles.txtbothich}>Bỏ thích</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{marginBottom: 50}}>
      <View style={styles.timkiem}>
        <TextInput
          value={searchText}
          onChangeText={text => setSearchText(text)}
          placeholder="Tìm sản phẩm..."
          style={styles.inputtimkiem}
        />
      </View>
      <Text
        style={[
          styles.txtbothich,
          {color: 'blue', fontSize: 24, marginBottom: 10, textAlign: 'center', fontWeight: '500'},
        ]}>
        Đây là các sản phẩm yêu thích của bạn
      </Text>

      <FlatList
        // data={products}
        data={filteredProducts}
        // numColumns={2}
        renderItem={renderProductItem}
        keyExtractor={item => item.name.toString()}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        numColumns={numColumns}
        key={flatListKey}
      />
    </View>
  );
};

export default Favories;
