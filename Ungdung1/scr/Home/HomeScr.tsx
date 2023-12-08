import React, {memo, useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {DocumentData} from 'firebase/firestore';
import {useNavigation} from '@react-navigation/native';

import {styles} from './style';
interface FlatListItemProps {
  item: DocumentData;
  handleProductPress: (product: DocumentData) => void;
}

const FlatListItem = memo(({item, handleProductPress}: FlatListItemProps) => {
  return (
    <TouchableOpacity
      style={styles.sptuongtu}
      onPress={() => handleProductPress(item)}>
      <Image
        source={{uri: item.image}}
        style={{
          width: '100%',
          height: 130,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      <View style={styles.catebottom}>
        <Text style={[styles.catename, {color: 'red', fontSize: 22}]}>
          Giảm {item.giamgia}%
        </Text>
        <Text style={styles.catename}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
});
const HomeScr = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<DocumentData[]>([]);
  const [favories, setFavories] = useState<DocumentData[]>([]);

  const fetchData = async () => {
    const snapshot = await firestore()
      .collection('Product')
      .where('giamgia', '!=', '0')
      .get();

    // const items = snapshot.docs.map(doc => doc.data());
    const items = snapshot.docs.map(doc => ({
      ...doc.data(),
      key: doc.id,
    }));
    setProducts(items);
  };
  const FavoriesData = async () => {
    const snapshot = await firestore()
      .collection('Favorites')
      // .where('category', '==', categoryname)
      .get();

    // const items = snapshot.docs.map(doc => doc.data());
    const items = snapshot.docs.map(doc => ({
      ...doc.data(),
      key: doc.id,
    }));
    setFavories(items);
  };

  useEffect(() => {
    fetchData();
    FavoriesData();
  }, []);
  const handleProductPress = (product: any) => {
    navigation.navigate('ChitietSP', {product});
  };

  return (
    <View style={styles.homecontainer}>
      <Text style={styles.title}>BẠN MUỐN ĐẶT MÓN GÌ CHO HÔM NAY ???</Text>
      <View style={styles.homecontainer}>
        <View>
          <Text style={{fontSize: 20, color: '#cc9900'}}>
            Sản phẩm đang được giảm giá
          </Text>
          <FlatList
            data={products}
            // data={showAllSimilarProducts ? products : products.slice(0, 5)}
            horizontal={true}
            // keyExtractor={item => item.id}
            keyExtractor={item => item.name.toString()}
            renderItem={({item}) => (
              // <TouchableOpacity
              //   style={styles.sptuongtu}
              //   onPress={() => handleProductPress(item)}>
              //   <Image
              //     source={{uri: item.image}}
              //     style={{
              //       width: '100%',
              //       height: 130,
              //       borderTopLeftRadius: 20,
              //       borderTopRightRadius: 20,
              //     }}
              //   />
              //   <View style={styles.catebottom}>
              //   <Text style={[styles.catename, {color:'red', fontSize: 22}]}>Giảm {item.giamgia}%</Text>
              //     <Text style={styles.catename}>{item.name}</Text>
              //     {/* <Text style={styles.catename}>Giá còn: {item.price}</Text> */}

              //   </View>
              // </TouchableOpacity>
              // <FlatListItem item={item} handleProductPress={handleProductPress} />
              <FlatListItem
                item={item}
                handleProductPress={handleProductPress}
              />
            )}
          />
        </View>
        <View style={styles.spyeuthich}>
          <Text style={styles.spyeuthich}>Sản phẩm yêu thích của bạn</Text>
          <FlatList
            // data={products}
            data={favories}
            horizontal={true}
            renderItem={({item}) => (
              <View>
              <TouchableOpacity >
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: '80%',
                    height: 70,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                />
                <View style={styles.catebottom}>
                  {/* <Text style={[styles.catename, {color:'red', fontSize: 22}]}>Giảm {item.giamgia}%</Text> */}
                  <Text style={styles.catename}>{item.name}</Text>
                  {/* <Text style={styles.catename}>Giá còn: {item.price}</Text> */}
                </View>
              </TouchableOpacity>
              
              </View>
            )}
            // keyExtractor={(item) => item.id.toString()}
            keyExtractor={item => item.name.toString()}
            // numColumns={2} 
          />
        </View>
      </View>
    </View>
  );
};
export default HomeScr;
