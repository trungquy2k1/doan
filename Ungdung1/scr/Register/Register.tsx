import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
// import firestore, { firebase } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
// import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MainStackParamList } from '../types/RootList';
import {styles} from './style';
import MyButton from '../../component/Button/Mybutton';
const Register = ({navigation}: NativeStackScreenProps<MainStackParamList>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsename] = useState('');

  const [data, setData] = useState<{id: string}[]>([]);

  const handleLogin = () => {navigation.navigate('Login')};
  // const handleSignup = async () => {
  //   try {
  //       await firebase.auth().createUserWithEmailAndPassword(email, password);
  //       await firestore().collection('User').add({ username: username, email, password });
    
  //       Alert.alert('Thông báo', 'Đăng ký thành công');
  //     } catch (error) {
  //       console.error('Error signing up: ', error);
  //     }
  // };

const handleSignup = async () => {

  auth()
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    const uid = user.uid;

    // Lưu thông tin người dùng vào Firestore
    firestore()
      .collection('User')
      .doc(uid)
      .set({
        email: user.email,
        username: username,
      })
      .then(() => {
        console.log('Đăng ký thành công');
      })
      .catch((error) => {
        console.log('Lỗi khi lưu thông tin người dùng:', error);
      });
  })
  .catch((error) => {
    console.log('Lỗi khi đăng ký:', error);
  });
};
useEffect(() => {
  const unsubscribe = auth().onAuthStateChanged((user) => {
    if (user) {
      // Người dùng đã đăng nhập, hãy điều hướng đến màn hình BottomTabNavigation
      navigation.navigate('BottomTabNavigation');
    }
  });

  return () => unsubscribe(); // Hủy đăng ký sự kiện khi component bị hủy
}, []);

  
  // useEffect(() => {
  //   fetchData();
  // }, []);

  //   const fetchData = async () => {
  //     try {
  //       const collectionRef = firestore().collection('User');
  //       const snapshot = await collectionRef.get();

  //       const documents = snapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       setData(documents);
  //     } catch (error) {
  //       console.error('Error fetching data: ', error);
  //     }
  //   };
 
  
  


  return (
    <View style={styles.container}>
      <Text style={[styles.texttitle, {color: '#ff6600', marginVertical: 20}]}>
      ĐĂNG KÝ
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng..."
        value={username}
        onChangeText={text => setUsename(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email..."
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu..."
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      {/* <TouchableOpacity
        style={[styles.buttonLogin, {justifyContent: 'center', width: '80%'}]}
        onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity> */}
      <MyButton 
        onPress={handleSignup}
        titlebtn='Đăng Kí'
        
      />
      {/* <TouchableOpacity
        style={[styles.buttonLogin, {justifyContent: 'center', width: '80%'}]}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity> */}
      <MyButton 
        onPress={handleLogin}
        titlebtn='Đăng nhập'
        
      />

      
    </View>
  );
};

export default Register;
