import React, { useState, useEffect, useContext, FC, FunctionComponent } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity, ScrollView, RefreshControl, Image } from 'react-native';
// import firebase from 'firebase';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { DocumentData } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// import styles from './style';
import styles from './style';
import MyInput from '../../Profile/updateprofile/Textinput';
import { AppContext } from '../../../component/AppContext/AppContext';
import MyButton from '../../../component/Button/Mybutton';

// const CommentScreen: FC<{productid: string, username: string, timestamp:Date, id: string, content: string}> = ({productid, username, timestamp, id, content}) => {
const CommentScreen = ({fetchComment}) => {

  const {idProduct, emailname} = useContext(AppContext)
  const [comments, setComments] = useState<DocumentData[]>([]);
  const [commentText, setCommentText] = useState('');
  // const [refreshingComment, setRefreshingComment] = useState(false);

  // const { productId } = route.params;
  
    // const fetchComment = async () => {
    //   const snapshot = await firestore()
    //     .collection('comments')
    //     // .where('productId', '==', productid)
    //     .orderBy('timestamp', 'desc')
    //     .get();
  
    //   // const items = snapshot.docs.map((doc) => (doc.data()));
    //   const items = snapshot.docs.map(doc => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   setComments(items);
    // };
    // const handleRefresh = () => {
    //   setRefreshingComment(true);
    //   fetchComment().then(() => setRefreshingComment(false));
    // };

// const DeleteComment= () => {}
// const deleteComments = async (commentKey: string) => {
//   try {
//     await firestore().collection('Cart').doc(commentKey).delete();
//     Alert.alert('Xóa thành công!');
//     // console.log('Deleted product ID:', doc);
//     fetchComment();
//     console.log('productId: ', commentKey);
//   } catch (error) {
//     console.error('Error removing document: ', error);
//   }
// };


  const postComment = async () => {
    try {
      const commentData = {
        productId:idProduct,
        username: emailname,
        content: commentText,
        timestamp: firestore.Timestamp.fromDate(new Date()), 
        likes: 0,
        // usernamelike: [...emailname, emailname]
        usernamelike: 'hi'
        // hasLiked: false,
      };

      // Lưu bình luận vào Firestore
      await firestore().collection('comments').add(commentData);

      // Cập nhật lại danh sách bình luận
      // getComments();
      fetchComment;
      setCommentText('');
      Alert.alert('Thêm thành công')
    } catch (error) {
      console.log('Error posting comment: ', error);
    }
  };
  return (
    <View style={styles.addcomment}>
      <MyInput value={commentText} onChangeText={text => setCommentText(text)} />
      <TouchableOpacity style={styles.button} onPress={postComment}>
        <Text style={styles.buttonText}>Bình luận</Text>
      </TouchableOpacity>
      {/* <ScrollView
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
                  source={require('../../Image/Image/avatar.png')}
                  style={styles.imgavata}
                />
                <View>
                  <View style={styles.noidung}>
                    {cm.username == '' ? (
                      <Text style={styles.name}>Người dùng</Text>
                    ) : (
                      <Text style={styles.name}> {cm.username} </Text>
                    )}

                    <Text style={styles.name}>
                      {moment(cm.timestamp.toDate()).format('DD/MM/YYYY')}
                    </Text>
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
                        source={require('../../Image/Category/delete2.png')}
                        style={{width: 25, height: 25}}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.content}> {cm.content} </Text>
                </View>
              </View>
              ))}
              </ScrollView> */}
              
              {/* <View style={styles.binhluan2}>
                <Image
                  source={require('../../Image/Image/avatar.png')}
                  style={styles.imgavata}
                />
                <View>
                  <View style={styles.noidung}>
                    {username == '' ? (
                      <Text style={styles.name}>Người dùng</Text>
                    ) : (
                      <Text style={styles.name}> {username} </Text>
                    )}

                    <Text style={styles.name}>
                      {moment(timestamp.toDate()).format('DD/MM/YYYY')}
                    </Text>
                    
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert('Bạn có chắc chắn muốn xóa', '', [
                          {text: 'Cancel'},
                          {
                            text: 'OK',
                            // onPress: () => navigation.navigate('Home'),
                            onPress: () => {
                              deleteComments(id);
                              // console.log('produc id', product.name);
                            },
                            style: 'default',
                          },
                        ])
                      }>
                      <Image
                        source={require('../../Image/Category/delete2.png')}
                        style={{width: 25, height: 25}}
                      />
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.content}> {content} </Text>
                </View>
              </View> */}
    </View>
  );
};

export default CommentScreen;
