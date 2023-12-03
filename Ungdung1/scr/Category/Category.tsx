

// import React, {useEffect, useState, createContext} from 'react';
// import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import {DocumentData} from 'firebase/firestore';
// import { useNavigation } from '@react-navigation/native';


// import styles from './style';

// const Category = () => {
//   const [data, setData] = useState<DocumentData[]>([]);
//   const navigation = useNavigation();
//   // const AppContex = createContext(),
//   useEffect(() => {
//     const fetchData = async () => {
//       const snapshot = await firestore().collection('Category').get();
//       const items = snapshot.docs.map(doc => doc.data());
      

//       setData(items);
//       // console.log('data: ', data)
//     };

//     fetchData();
//   }, []);
//   const Categoryname = data.map(item => item.categoryname);
//   // console.log('Category Names: ', categoryNames);
// // const Categoryname = data[0]?.categoryname
// // console.log('Category: ', Categoryname)
//   const handleCategoryPress = () => {
//     navigation.navigate('ProductScreen', {  Categoryname });
//   };
  
//   // console.log('Category: ', data.categoryname)

//   const renderDataItem = ({ item }) => (
//     <View style={styles.category}>
//       <Text style={styles.catetitle}>Danh Mục</Text>
      
//       {data.map((categoryItem, index) => (
//       <TouchableOpacity
//         key={index}
//         style={styles.containercate}
//         onPress={() => handleCategoryPress(item.category)}
//       >
//         <Image
//           source={{ uri: categoryItem.image }}
//           style={{
//             width: '100%',
//             height: 120,
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//           }}
//         />
//         <View style={styles.catebottom}>
//           <Text style={styles.catename}>{categoryItem.categoryname}</Text>
//           <Text style={styles.cateinfo}>
//             Có nhiều loại cho các bạn lựa chọn
//           </Text>
//         </View>
//       </TouchableOpacity>
// ))}
//     </View>
//   );

//   return (
//     <View>
//       <FlatList
//         data={data}
//         renderItem={renderDataItem}
//         keyExtractor={item => item.categoryname.toString()}
//       />
//     </View>
//   );
// };

// export default Category;



/////////////2222222222222222222222222222222222222222222222222222////////////////////////////



// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import { DocumentData } from 'firebase/firestore';

// import styles from './style';

// const Category = () => {
//   // const navigation = useNavigation();
//   const [data, setData] = useState<DocumentData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const snapshot = await firestore().collection('Category').get();
//       const items = snapshot.docs.map((doc) => doc.data());
//       setData(items);
//     };

//     fetchData();
//   }, []);
//   console.log('data: ', data)

//   // const handleCategoryPress = (categoryId) => {
//   //   navigation.navigate('ProductScreen', { categoryId });
//   // };

//   const renderDataItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.containercate}
//       // onPress={() => handleCategoryPress(item.categoryId)}
//     >
//       <Image
//         source={{ uri: item.image }}
//         style={{
//           width: '100%',
//           height: 120,
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//         }}
//       />
//       <View style={styles.catebottom}>
//         <Text style={styles.catename}>{item.category}</Text>
//         <Text style={styles.cateinfo}>
//           Có nhiều loại cho các bạn lựa chọn
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View>
//       <FlatList
//         data={data}
//         renderItem={renderDataItem}
//         keyExtractor={(item) => item.category.toString()}
//       />
//     </View>
//   );
// };

// export default Category;

////////////////////////////////////////3333333333333333333333333333333333333///////////////////////////



import React, { useEffect, useState, createContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {DocumentData} from 'firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MainStackParamList } from '../types/RootList';
import styles from './style';
// const CategoryContext = createContext(null);
const CategoryContext = createContext<(categoryname: any) => void>(() => {});

const Category = ({navigation}:NativeStackScreenProps<MainStackParamList>) => {
  const [data, setData] = useState<DocumentData[]>([]);
  // const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      // Lấy dữ liệu từ Firestore
      const snapshot = await firestore().collection('Category').get();
      const items = snapshot.docs.map(doc => doc.data());
      setData(items);
    };

    fetchData();
  }, []);

  const handleCategoryPress = (categoryname: any) => {
    navigation.navigate('ProductScreen', { categoryname: categoryname});
  };
  const renderDataItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.category}
      onPress={() => handleCategoryPress(item.categoryname)}
    >
      <Text style={styles.catetitle}>Danh Mục</Text>
      <Image
        source={{ uri: item.image }}
        style={{
          width: '100%',
          height: 120,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      <View style={styles.catebottom}>
        <Text style={styles.catename}>{item.categoryname}</Text>
        <Text style={styles.cateinfo}>
          Có nhiều loại cho các bạn lựa chọn
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CategoryContext.Provider value={handleCategoryPress}>
        <FlatList
          data={data}
          renderItem={renderDataItem}
          keyExtractor={item => item.categoryname.toString()}
        />
      </CategoryContext.Provider>
    </View>
  );
};

export default Category;

// import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   category: {
//     margin: 10,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   catetitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     padding: 10,
//   },
//   catename: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   cateinfo: {
//     fontSize: 14,
//     marginTop: 5,
//   },
//   catebottom: {
//     padding: 10,
//   },
// });

// export default styles;