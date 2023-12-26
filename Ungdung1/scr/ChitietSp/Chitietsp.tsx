import React, {useContext, useEffect, useState} from 'react';
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
  RefreshControl,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {DocumentData, where} from 'firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';

import styles from './style';
import CommentScreen from './Comment/Comment';
import {AppContext} from '../../component/AppContext/AppContext';
// import DeletedComment from './Comment/Deletecomment';
import Header2 from '../../component/Head/Header';
const ChitietSP = ({route, fetchUpdate}: any) => {
  const {params} = useRoute();
  const {idProduct, setIdproduct, emailname} = useContext(AppContext);
  const navigation = useNavigation();
  const {product} = route.params;

  const [products, setProducts] = useState<DocumentData[]>([]);
  const [comments, setComments] = useState<DocumentData[]>([]);

  const [quantity, setQuantity] = useState(1);
  const [selectedButton, setSelectedButton] = useState('mota');
  const [proid, setProid] = useState('');
  const [uselike, setUserlike] = useState('');
  const [selectedFavories, setSelectedFavories] = useState(!product.favories);
  const [refreshingComment, setRefreshingComment] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [clickLike, setClickLike] = useState(false)
  const [numberLike, setNumberLike] = useState(0)


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

    // const items = snapshot.docs.map(doc => doc.data());
    const items = snapshot.docs.map(doc => ({
      ...doc.data(),
      key: doc.id,
    }));
    // {products.map(((pro)=>(setProid(pro.key)))}

    // {products.map((pr=>(console.log('Favories là: ', pr.favories))))}
    setProducts(items);
  };
  const fetchComment = async () => {
    const snapshot = await firestore()
      .collection('comments')
      .where('productId', '==', product.key)
      .orderBy('timestamp', 'desc')
      .get();

    // const items = snapshot.docs.map((doc) => (doc.data()));
    const items = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      // hasLiked: false, 
    }));
    {comments.map(((cm)=>(
      setUserlike(cm.usernamelike)
    )))}
    setComments(items);
  };
  const deleteComments = async (commentKey: string) => {
    try {
      await firestore().collection('comments').doc(commentKey).delete();
      Alert.alert('Xóa thành công!');
      // console.log('Deleted product ID:', doc);
      fetchComment();
      console.log('productId: ', commentKey);
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchComment();
    setIdproduct(product.key);
    // console.log('category chitiet: ', product.category);
    // console.log('product.id ', product.name);
    console.log('product.id ', product.key);
    console.log('id ', proid);

    // console.log('comments là: ', comments);
  }, [product]);
  //hienthi-an
  const handleToggleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleProductPress = (product: any) => {
    navigation.navigate('ChitietSP', {product});
  };

  const handleRefresh = () => {
    setRefreshingComment(true);
    fetchComment().then(() => setRefreshingComment(false));
  };
  // them vao so thich
  // const addFavorite = async () => {
  //   // const totalPrice = product.price * quantity;
  //   const querySnapshot = await firestore()
  //     .collection('Favorites')
  //     .where('name', '==', product.name)
  //     .get();

  //   if (querySnapshot.empty) {
  //     // Tạo tài liệu mới nếu không tìm thấy sản phẩm
  //     const favoriteItem = {
  //       name: product.name,
  //       image: product.image,
  //       price: product.price,
  //       description: product.description,
  //       category: product.category,
  //       giamgia: product.giamgia,
  //     };
  //     try {
  //       await firestore().collection('Favorites').add(favoriteItem);
  //       // Alert.alert('Thêm thành công vào sở thích của bạn')
  //       Alert.alert('Thêm thành công vào sở thích của bạn');
  //     } catch (error) {
  //       console.log('Lỗi khi thêm sản phẩm :', error);
  //     }
  //   } else {
  //     Alert.alert('Sản phẩm đã có trong sở thích của bạn');
  //   }
  // };
  // const handleUpdate = () => {
  //   // setSelectedFavories(!product.favories)
  //   setSelectedFavories(!product.favories);
  //   // setSelectedFavories(true)

  //   console.log('favories: ', selectedFavories);

  //   console.log('favories: lllllllllll');
  // };
  const UpdateFavories = () => {
    // setIsFavorite(!isFavorite);
    setSelectedFavories(!selectedFavories);
    firestore()
      .collection('Product')
      .doc(product.key)
      .update({
        // age: 31,
        favories: !selectedFavories,
      })
      .then(() => {
        console.log('Favories updated!');
        // fetchUpdate;
        
        // setSelectedFavories(!product.favories);
        console.log('favories: ', product.favories);
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật dữ liệu:', error);
      });

    // setSelectedFavories(!selectedFavories)
    // console.log('favories: ', product.favories)
  };
  //them vao gio hang
  const addToCart = async () => {
    const querySnapshot = await firestore()
      .collection('Cart')
      .where('name', '==', product.name)
      .where('username', '==', emailname)
      .get();

    if (querySnapshot.empty) {
      // Tạo tài liệu mới nếu không tìm thấy sản phẩm trong giỏ hàng
      const cartItem = {
        name: product.name,
        quantity: quantity,
        price: product.price * quantity,
        image: product.image,
        username: emailname,
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

  // const handleLike = () => {
  //   if(!clickLike){
  //     setNumberLike(numberLike+1)
  //   }else{
  //     setNumberLike(numberLike-1)
  //   }
  //   setClickLike(!clickLike)
  // }
  const handleLikeComment = async (commentID) => {
    try {
      const commentRef = await firestore().collection('comments').where('usernamelike', '==', emailname).get();
      // const items = commentRef.docs.map(doc => ({
      //   ...doc.data(),
      //   id: doc.id,
      //   userlike: doc.data().usernamelike,
      //   // hasLiked: false, 
      // }));
      if(commentRef.empty){
        //   commentRef.update({
        //   // usernamelike: emailname,
        //   likes: !clickLike
        // });
        // const updatedLike = existingLike.likes + 1;
        // await docRef.update({
        //   likes: updatedLike,
          
        //   // price: updatedPrice,
        // });
        // const commentlike = {
        //   likes: numberLike+1
        // };
        // const docRef = commentRef.docs[0].ref;
      // const existingLike = commentRef.docs[0].data();
        // const updatedLike = [...existingLike.usernamelike, emailname]
        await firestore().collection('comment').doc(commentID).update({
          likes: numberLike+1,
          // usernamelike: [...uselike, emailname]
        });
          Alert.alert('Like Okokok');
      }
      else{
        const docRef = commentRef.docs[0].ref;
      const existingLike = commentRef.docs[0].data();
        
        const updatedLike = existingLike.likes - 1;
        await docRef.update({
          likes: updatedLike,
          // price: updatedPrice,
        });
        Alert.alert('Bỏ like');
      }
      
      
      
      // setClickLike(!clickLike)
    } catch (error){
        console.log(error);
      }
    };
    const handleClick = () =>{
      navigation.navigate('Cart')
    }
  
  return (
    <View style={styles.container}>
      <Header2 navigation={navigation}
      source={require('../../scr/Image/Category/cart.png')}
      trangcon='Cart' nd={undefined}  onPress={handleClick}    />
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
                  <TouchableOpacity
                    style={styles.sptuongtu}
                    onPress={() => handleProductPress(item)}>
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
                  source={require('../Image/Icon/cart.png')}
                  style={styles.imgcart}
                />
              </View>

              <Text style={{fontSize: 18, color: '#fff'}}>
                Thêm vào giỏ hàng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tim}
              // onPress={() => UpdateFavories(product.key)}>
              onPress={UpdateFavories}>
              <Image
                source={require('../Image/Icon/heart.png')}
                style={styles.imgtim}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{backgroundColor: '#fff', width: '100%', height: 500}}>
          <Text>Bình Luận</Text>
          {/* <CommentScreen /> */}
          {/* <FlatList
            // horizontal
            data={comments}
            renderItem={({item}) => (
              // <CommentScreen productid={item.key} />
              <CommentScreen
                productid={item.key}
                username={item.username}
                timestamp={item.timestamp}
                id={item.id}
                content={item.content}
              />
            )}
          /> */}
          <CommentScreen fetchComment={fetchComment()}/>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshingComment}
                onRefresh={handleRefresh}
              />
            }
            style={styles.binhluan}>
            {comments.map((cm, index) => (
              <View key={index} style={styles.binhluan2}>
                <Image
                  source={require('../Image/Image/avatar.png')}
                  style={styles.imgavata}
                />
                <View>
                  <View style={styles.noidung}>
                  <View>
                    
                    {cm.username == '' ? (
                      <Text style={styles.name}>Người dùng</Text>
                    ) : (
                      
                      <Text style={styles.name}> {cm.username} </Text>
                    )}

                    <Text style={[styles.name, {fontSize: 14, color: 'grey'}]}>
                      {moment(cm.timestamp.toDate()).format('DD/MM/YYYY')}
                    </Text>
                    </View>
                    
                    {/* <DeletedComment id={cm.key} productkey={product.key}/> */}
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert('Bạn có chắc chắn muốn xóa', '', [
                          {text: 'Cancel'},
                          {
                            text: 'OK',
                            // onPress: () => navigation.navigate('Home'),
                            onPress: () => {
                              deleteComments(cm.id);
                              // console.log('produc id', product.name);
                            },
                            style: 'default',
                          },
                        ])
                      }>
                      <Image
                        source={require('../Image/Category/delete2.png')}
                        style={{width: 25, height: 25}}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* Nội dung comment */}
                  <Text style={styles.content}> {cm.content} </Text>
                  <View style={{flexDirection:'row', marginTop: 5}}>
                  <TouchableOpacity onPress={() =>handleLikeComment(cm.key)}>
                  {/* <TouchableOpacity onPress={handleLikeComment}> */}

                  {!clickLike  ? (
                      <Image 
                      source={require('../Image/Icon/like.png')}
                      style={{width: 25, height: 25, marginRight: 5}}
                    />
                  ):(
                  <Image 
                      source={require('../Image/Icon/like2.png')}
                      style={{width: 25, height: 25, marginRight: 5}}
                    />
                  )}
                    
                    </TouchableOpacity>
                    {/* <Text style={{fontSize: 18}}> {numberLike} </Text> */}
                    <Text style={{fontSize: 18}}> {cm.likes} </Text>
                    {/* <Text style={{fontSize: 18}}> {cm.usernamelike} </Text> */}
                    {cm.usernamelike == '' ? (
                      <Text style={styles.name}>Người dùng</Text>
                    ) : (
                      
                      <Text style={styles.name}> {cm.usernamelike} </Text>
                    )}

                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          {/* <Text></Text> */}
          {/* <CommentScreen /> */}
          {/* hieenr thij comment------------------------------------------------ */}
          {/* <Text></Text> */}
          {/* <FlatList
                data={comments}
                // data={showAllSimilarProducts ? products : products.slice(0, 5)}
                // horizontal={true}
                // keyExtractor={item => item.id}
                keyExtractor={item => item.productId.toString()}
                renderItem={({item}) => (
                  // <TouchableOpacity style={styles.sptuongtu} onPress={()=>handleProductPress(item)}>
                  //   <Image
                  //     source={{uri: item.image}}
                  //     style={styles.imgtuongtu}
                  //   />
                  <View style={{backgroundColor: 'blue'}}>
                    <Text
                      style={[
                        styles.tentuongtu,
                        {marginVertical: 5, height: 36},
                      ]}>
                      {item.content}
                    </Text>
                    <Text style={styles.tentuongtu}>Giá: {item.price}</Text>
                   {/* </TouchableOpacity> 
                   </View>
                )} 
              />*/}
        </View>
      )}
    </View>
  );
};
export default ChitietSP;
