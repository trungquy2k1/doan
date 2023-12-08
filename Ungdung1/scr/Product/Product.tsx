// import React, { useState } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// // import ProductList from './ProductList';
// import ProductList from './ListProduct';

// const Product = () => {
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const handleCategoryPress = (category: React.SetStateAction<string>) => {
//     setSelectedCategory(category);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.categoryContainer}>
//         <TouchableOpacity
//           style={styles.categoryItem}
//           onPress={() => handleCategoryPress('Pizza')}
//         >
//           <Text style={styles.categoryText}>Category 1</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.categoryItem}
//           onPress={() => handleCategoryPress('Category 2')}
//         >
//           <Text style={styles.categoryText}>Category 2</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.categoryItem}
//           onPress={() => handleCategoryPress('Category 3')}
//         >
//           <Text style={styles.categoryText}>Category 3</Text>
//         </TouchableOpacity>
//       </View>
//       <ProductList category={selectedCategory} />
//     </View>
//   );
// };

// export default Product;

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       marginTop: 20,
//       paddingHorizontal: 16,
//     },
//     categoryContainer: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginBottom: 16,
//     },
//     categoryItem: {
//       backgroundColor: '#ccc',
//       borderRadius: 8,
//       paddingVertical: 8,
//       paddingHorizontal: 16,
//     },
//     categoryText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: '#fff',
//     },
//   });

// -----------------------Sử dụng đoạn này-----------------------------------------------------

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import firestore from '@react-native-firebase/firestore';
// import {DocumentData} from 'firebase/firestore';
// import styles from './style';
// import {MainStackParamList} from '../types/RootList';
// import {useNavigation} from '@react-navigation/native';
// const ProductScreen = ({route}: any) => {
//   // const { Categoryname } = route.params;
//   const navigation = useNavigation();
//   const {categoryname} = route.params;
//   const [products, setProducts] = useState<DocumentData[]>([]);
//   const [searchText, setSearchText] = useState('');

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const snapshot = await firestore()
//   //       .collection('Product')
//   //       .where('category', '==', categoryname)
//   //       .get();
//   //     const items = snapshot.docs.map(doc => doc.data());
//   //     setProducts(items);
//   //   };

//   //   fetchData();
//   //   console.log('category: ', categoryname);
//   // }, [categoryname]);

//   const fetchData = async () => {
//     const snapshot = await firestore()
//       .collection('Product')
//       .where('category', '==', categoryname)
//       .get();

//     const items = snapshot.docs.map(doc => doc.data());
//     setProducts(items);
//   };
  

//   useEffect(() => {
//     fetchData();
//     console.log('category: ', categoryname);
//   }, [categoryname]);

//   // const handleProductPress = (product) => {
//   //   navigation.navigate('ChitietSP', {product});
//   // };
//   const handleProductPress = (product: any) => {
//     navigation.navigate('ChitietSP', {product});
//   };

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
//           {/* <View style={styles.giamgia}>
//             <Text style={[styles.gia, {color: 'red', fontSize: 18}]}>Sốt!!! Giảm đến    </Text>
//             <Text style={[styles.gia, {color: 'red', fontSize: 18}]}>{item.giamgia} %</Text>
//           </View> */}
//           {item.giamgia != 0 && (
//             <View style={styles.giamgia}>
//               <Text style={[styles.gia, {color: 'red', fontSize: 18}]}>
//                 Sốt!!! Giảm đến
//               </Text>

//               <Text style={[styles.gia, {color: 'red', fontSize: 18}]}>
//                 {item.giamgia} %
//               </Text>
//             </View>
//           )}
//           <Text style={styles.productName}>{item.name}</Text>
//           {item.giamgia != 0 ? (
//             <View>
//               <View style={styles.hiengia}>
//                 <Text style={styles.gia}>Từ: </Text>
//                 <Text style={styles.gia}>{item.giagoc} đ</Text>
//               </View>
//               <View style={styles.hiengia}>
//                 <Text style={styles.gia}>Xuống còn: </Text>
//                 <Text style={styles.productPrice}>{item.price} đ</Text>
//               </View>
//             </View>
//           ):(
//             <View>
//             <Text style={[styles.productPrice , {fontSize: 22}]}>Giá: {item.price} đ</Text>
//             </View>
//           )}

          
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
//         {/* <TouchableOpacity style={styles.btntimkiem} >
//           <Text style={{color: '#fff', fontSize: 16, textAlign: 'center'}}>
//             Tìm kiếm
//           </Text>
//         </TouchableOpacity> */}
//       </View>
//       <FlatList
//         // data={products}
//         data={filteredProducts}
//         renderItem={renderProductItem}
//         // keyExtractor={(item) => item.id.toString()}
//         keyExtractor={item => item.name.toString()}
//       />
//     </View>
//   );
// };

// export default ProductScreen;


// -----------------------Sử dụng đoạn này-----------------------------------------------------


import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

// import { AppContext } from '../../component/AppContext/AppContext';
const ProductListScreen = ( {route}: any ) => {
  // const {productId, setProductId} = useContext(AppContext);
  const {categoryname} = route.params;
  const navigation = useNavigation();
  // const [products, setProducts] = useState([]);
  const [products, setProducts] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // const [lastDocId, setLastDocId] = useState(null);
  const [lastDocId, setLastDocId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);

  //     const snapshot = await firestore()
  //       .collection('Product')
  //       .where('category', '==', categoryname)
  //       .orderBy(firestore.FieldPath.documentId())
  //       .limit(8)
  //       .get();

  //     const items = snapshot.docs.map((doc) => doc.data());
  //     setProducts(items);
  //     setLastDocId(snapshot.docs[snapshot.docs.length - 1].id);
  //     setHasMore(items.length >= 8);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);

  //     const snapshot = await firestore()
  //       .collection('Product')
  //       .where('category', '==', categoryname)
  //       .orderBy(firestore.FieldPath.documentId())
  //       .limit(8)
        
  //       .onSnapshot(querySnapshot => {
  //         const product: React.SetStateAction<DocumentData[]> | { key: string; }[] = [];

  //         querySnapshot.forEach(documentSnapshot => {
  //           product.push({
  //             ...documentSnapshot.data(),
  //             key: documentSnapshot.id,
  //           });
  //         });

  //         setProducts(product);
  //         setLoading(false);
  //       });
  //       // console.log('product: ', JSON.stringify(products, null, 3))

  //       // console.log('product: ', products)
  //       // products.map((product, index)=>console.log('Product: ', product.key))
  //     // const items = snapshot.docs.map((doc) => doc.data());
  //     // setProducts(items);
  //     // setLastDocId(snapshot.docs[snapshot.docs.length - 1].id);
  //     // setHasMore(items.length >= 8);
  //     if (querySnapshot.docs.length > 0) {
  //       const items = querySnapshot.docs.map((doc) => doc.data());
  //       setProducts(items);
  //       setLastDocId(querySnapshot.docs[querySnapshot.docs.length - 1].id);
  //       setHasMore(items.length >= 8);
  //     }


  //       return () => snapshot();
  //     //   
  //     //   .orderBy(firestore.FieldPath.documentId())
  //     //   .limit(8)
  //     //   .get();

  //     // const items = snapshot.docs.map((doc) => doc.data());
  //     // setProducts(items);
  //     // setLastDocId(snapshot.docs[snapshot.docs.length - 1].id);
  //     // setHasMore(items.length >= 8);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData = async () => {
    try {
      setLoading(true);
  
      const snapshot = await firestore()
        .collection('Product')
        .where('category', '==', categoryname)
        .orderBy(firestore.FieldPath.documentId())
        .limit(8)
        .get();
  
      const items = snapshot.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
      }));
  
      setProducts(items);
      setLastDocId(snapshot.docs[snapshot.docs.length - 1].id);
      setHasMore(items.length >= 8);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

// const testproduct = products.map((product, index)=>console.log('Product: ', product.key))
  useEffect(() => {
    fetchData();
    console.log('category:', categoryname);
  }, [categoryname]);

  const loadMoreData = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const snapshot = await firestore()
        .collection('Product')
        .where('category', '==', categoryname)
        .orderBy(firestore.FieldPath.documentId())
        .startAfter(lastDocId)
        .limit(8)
        .get();
        

      const newItems = snapshot.docs.map((doc) => doc.data());

      if (newItems.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...newItems]);
        setLastDocId(snapshot.docs[snapshot.docs.length - 1].id);
        setHasMore(newItems.length >= 8);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoading(false);
    }
  };

    const handleProductPress = (product: any) => {
    navigation.navigate('ChitietSP', {product});
    // console.log('ID: ', product.id);
  };
  const filterProducts = (keyword: string) => {
        const filteredProducts = products.filter(item =>
          item.name.toLowerCase().includes(keyword.toLowerCase()),
        );
        return filteredProducts;
      };
      const filteredProducts = filterProducts(searchText);

  const renderProductItem = ({ item }) => (
    // <TouchableOpacity>
    //   <Text>{item.name}</Text>
    // </TouchableOpacity>


    <View>
       <TouchableOpacity
        style={styles.productContainer}
        onPress={() => handleProductPress(item)}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.productInfo}>
          {/* <View style={styles.giamgia}>
            <Text style={[styles.gia, {color: 'red', fontSize: 18}]}>Sốt!!! Giảm đến    </Text>
            <Text style={[styles.gia, {color: 'red', fontSize: 18}]}>{item.giamgia} %</Text>
          </View> */}
          {item.giamgia != 0 && (
            <View style={styles.giamgia}>
              <Text style={[styles.gia, {color: 'red', fontSize: 18}]}>
                Sốt!!! Giảm đến
              </Text>

              <Text style={[styles.gia, {color: 'red', fontSize: 18}]}>
                {item.giamgia} %
              </Text>
            </View>
          )}
          <Text style={styles.productName}>{item.name}</Text>
          {item.giamgia != 0 ? (
            <View>
              <View style={styles.hiengia}>
                <Text style={styles.gia}>Từ: </Text>
                <Text style={styles.gia}>{item.giagoc} đ</Text>
              </View>
              <View style={styles.hiengia}>
                <Text style={styles.gia}>Xuống còn: </Text>
                <Text style={styles.productPrice}>{item.price} đ</Text>
              </View>
            </View>
          ):(
            <View>
            <Text style={[styles.productPrice , {fontSize: 22}]}>Giá: {item.price} đ</Text>
            </View>
          )}

          
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderLoadMoreButton = () => {
    if (!hasMore) return null;

    return (
      <TouchableOpacity onPress={loadMoreData} disabled={loading}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          // <Text>Load more</Text>
          <ActivityIndicator size="large" />

        )}
      </TouchableOpacity>
    );
  };

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
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.name.toString()}
        ListFooterComponent={renderLoadMoreButton}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default ProductListScreen;

// -----------------------Sử dụng đoạn này-----------------------------------------------------

// import React from 'react';
// import { View, Text } from 'react-native';

// const ProductScreen = ({ route }) => {
//   const { categoryname } = route.params;

//   return (
//     <View>
//       <Text>Category Name: {categoryname}</Text>
//       {/* Các thành phần khác trong màn hình ProductScreen */}
//     </View>
//   );
// };

// export default ProductScreen;
