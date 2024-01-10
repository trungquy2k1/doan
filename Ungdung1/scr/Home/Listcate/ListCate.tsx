import { useEffect, useState } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { DocumentData } from "firebase/firestore"
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"

import { getAllCategory } from "../../../redux/Action/getAction"
import styles from "./style"
const ListCate = () =>{
    // const cateList = useSelector(state=> state.supply);
    const navigation = useNavigation();
    const cateList = useSelector(state => state.supply.cateList);
    const dispatch = useDispatch();
    const [showAll, setShowAll] = useState(false);
    const [num, setNum] = useState(2)
    // console.log(JSON.stringify( cateList, null, 2));
    // console.log(typeof cateList);
    // const [category, setCategory] = useState<DocumentData[]>([])

    // const FetchCate = async() =>{
    //     const dl = await firestore().collection('Category').get();
    //     const items = dl.docs.map(doc=>(
    //         {
    //             ...doc.data(),
    //             id: doc.id,
    //         }
    //     ))
    //     setCategory(items)
    // }
    const handleCategoryPress = (categoryname: any) => {
      navigation.navigate('ProductScreen', { categoryname: categoryname});
    };

   const RenderItem = ({ item }) => (
    <TouchableOpacity style={styles.cate} onPress={() => handleCategoryPress(item.categoryname)}>
      <Image
        source={{ uri: item.imagelogo }}
        style={styles.img}
      />
      <Text>{item.categoryname}</Text>
    </TouchableOpacity>
  );

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const renderFooter = () => {
    if (showAll) {
      return (
        <TouchableOpacity onPress={toggleShowAll}>
          <Text>Show less</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={toggleShowAll}>
          <Text>Show more</Text>
        </TouchableOpacity>
      );
    }
  };
    useEffect(()=>{
        dispatch(getAllCategory())
    },[])

    return (
        <View>
            <Text>List cate</Text>
            
            <FlatList
        data={showAll ? cateList : cateList.slice(0, 4)}
        numColumns={num}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderFooter}
      />
        </View>
    )
}
export default ListCate