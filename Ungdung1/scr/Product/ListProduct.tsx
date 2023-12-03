import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { DocumentData } from 'firebase/firestore';

import styles from './style';

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore()
        .collection('Product')
        .where('category', '==', category)
        .get();
      const items = snapshot.docs.map((doc) => doc.data());
      setProducts(items);
    };

    fetchData();
  }, [category]);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.name.toString()}
      />
    </View>
  );
};

export default ProductList;