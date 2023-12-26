import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DocumentData, QueryDocumentSnapshot} from 'firebase/firestore';

import {styles} from './style';
import MyButton from '../../component/Button/Mybutton';
import {AppContext} from '../../component/AppContext/AppContext';
import {MainStackParamList} from '../types/RootList';

const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<MainStackParamList>) => {
  //  const navigation = useNavigation<NativeStackScreenProps<MainStackParamList>>();
  const {emailname, setEmailname} = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<DocumentData[]>([]);
  // const [data, setData] = useState([]);
  // const [data, setData] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  // const [data, setData] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  // const [data, setData] = useState<
  //   {
  //     // password: string;
  //     // email: string;
  //     id: string;
  //   }[]
  // >([]);

  const handleLogin = async () => {
    // const user = data.find(
    //   item => item.email === email && item.password === password,
    // );
    const user = data.map((datas)=>(datas.email === email && datas.password === password))

    if (user) {
      // Đăng nhập thành công

      // Alert.alert('Thông báo', 'Đăng nhập thành công');
      // navigation.navigate('Home');
      navigation.navigate('BottomTabNavigation');
      data.map((datas)=>(setEmailname(datas.username)))

      // setEmailname(user.username);
      // setEmailname(email)
    } else {
      // Đăng nhập thất bại
      Alert.alert('Thông báo', 'Email hoặc mật khẩu không đúng');
    }
    // data.map((datas)=>(setEmailname(datas.username)))
// console.log('User: ', data);
    // try {
    //   const userCredential = await auth().signInWithEmailAndPassword(
    //     email,
    //     password,
    //   );
    //   if (userCredential) {
    //     // Đăng nhập t'User: ', data)hành công
    //     Alert.alert('Thông báo', 'Đăng nhập thành công');
    //     navigation.navigate('Home');
    //     setEmailname(email);
    //     // console.log('User: ', data);
    //   }
    // } catch (error) {
    //   // Đăng nhập thất bại
    //   Alert.alert('Thông báo', 'Email hoặc mật khẩu không đúng');
    // }
  };

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    Alert.alert('Đăng nhập thành công');
    navigation.navigate('Home');
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '66553430569-qsha8cu9ee9pf9q4hu0it5e2v827pp22.apps.googleusercontent.com',
    });
  }, []);

  
  // console.log('email: ', email)
  const fetchData = async () => {
    const emailInput = email; 
    const passwordInput = password;
    try {
      const collectionRef = firestore()
        .collection('User')
        .where('email', '==', emailInput)
        .where('password', '==', passwordInput);

      const snapshot = await collectionRef.get();
      const item = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(item);
      data.map(((items)=>setEmailname(items.username)))
      // setEmailname()
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log("emailname: ", emailname)
    console.log('ohahahaha: ', data)

  }, [email]);
  return (
    // <AppContext.Provider value={{ name, setName }}>
    <View style={styles.container}>
      <Text style={[styles.texttitle, {color: '#ff6600', marginVertical: 20}]}>
        Đăng Nhập
      </Text>
      {data.map((item, index)=>(
        <View  key={index}>
        <Text>{item.id} </Text>
        <Text> {emailname} </Text>
        </View>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Email..."
        value={email}
        onChangeText={text => setEmail(text)}
        inputMode="email"
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
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        // style={[styles.buttonLogin, {justifyContent: 'center', width: '80%'}]}
        // onPress={handleLogin}>
        onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.buttonText, {color: 'blue', marginBottom: 5}]}>
          Bạn muốn đăng kí tài khoản?? Đăng kí
        </Text>
      </TouchableOpacity>
      <MyButton
        onPress={handleLogin}
        titlebtn="Đăng nhập"
        style={{justifyContent: 'center', width: '80%'}}
      />
      <Text style={[styles.texttitle, {color: 'green', marginVertical: 20}]}>
        OR
      </Text>
      {/* Login google && Facebook */}

      <TouchableOpacity
        style={[
          styles.buttonLogin,
          {
            backgroundColor: '#ff6600',
            justifyContent: 'space-between',
            width: '70%',
          },
        ]}
        // onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
        onPress={onGoogleButtonPress}>
        <Image
          source={require('../Image/Image/social.png')}
          style={styles.loginicon}
        />
        <Text style={styles.buttonText}>Đăng nhập với Google</Text>
      </TouchableOpacity>
      {/* <MyButton 
        onPress={onGoogleButtonPress}
        image={require('./Image/social.png')}
        titlebtn='Login Google'
        styless={[styles.loginicon, ]}
        style={{
          backgroundColor: '#ff6600',
          justifyContent: 'space-between',
          width: '70%',
        }}
      /> */}
      {/* <TouchableOpacity
        style={[
          styles.buttonLogin,
          {
            backgroundColor: '#4d79ff',
            justifyContent: 'space-between',
            width: '70%',
          },
        ]}
        onPress={handleLogin}>
        <Image
          source={require('./Image/facebook(1).png')}
          style={styles.loginicon}
        />
        <Text style={styles.buttonText}>Login FaceBook</Text>
      </TouchableOpacity> */}
      
      
    </View>
    // </AppContext.Provider>
  );
};

export default LoginScreen;
