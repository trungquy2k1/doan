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
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import {styles} from './style';
import MyButton from '../../component/Button/Mybutton';
import { AppContext } from '../../component/AppContext/AppContext';
// export const EmailContext = createContext();

const LoginScreen = ({navigation}) => {
 
  const {emailname, setEmailname} = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [data, setData] = useState<{id: string}[]>([]);
  const [data, setData] = useState<
    {
      id: string;
    }[]
  >([]);

  const handleLogin = async () => {
    // const user = data.find(
    //   item => item.email === email && item.password === password,
    // );

    // if (user) {
    //   // Đăng nhập thành công
    //   Alert.alert('Thông báo', 'Đăng nhập thành công');
    //   navigation.navigate('Home');
    // } else {
    //   // Đăng nhập thất bại
    //   Alert.alert('Thông báo', 'Email hoặc mật khẩu không đúng');
    // }
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      if (userCredential) {
        // Đăng nhập thành công
        Alert.alert('Thông báo', 'Đăng nhập thành công');
        navigation.navigate('Home');
        setEmailname(email)
      }
    } catch (error) {
      // Đăng nhập thất bại
      Alert.alert('Thông báo', 'Email hoặc mật khẩu không đúng');
    }
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const collectionRef = firestore().collection('User');
      const snapshot = await collectionRef.get();

      const documents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(documents);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    // <AppContext.Provider value={{ name, setName }}>
    <View style={styles.container}>
      <Text style={[styles.texttitle, {color: '#ff6600', marginVertical: 20}]}>
        Đăng Nhập
      </Text>

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
          source={require('./Image/social.png')}
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
