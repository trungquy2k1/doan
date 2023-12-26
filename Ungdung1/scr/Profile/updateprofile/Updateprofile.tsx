import React, {useContext, useState} from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MyInput from './Textinput';
import firestore from '@react-native-firebase/firestore';
import { DocumentData } from 'firebase/firestore';

import {AppContext} from '../../../component/AppContext/AppContext';
// const UpdateProfile = props => {
const UpdateProfile = ({visible, onRequestClose}: any) => {
  const {emailname} = useContext(AppContext)

  const [userProfile, setUserProfile]=useState<DocumentData[]>([])
  const [ten, setTen] = useState('');
  const [email, setEmail] = useState('');
  
  console.log(ten);
  const FetchUser = async() => {
    const db = await firestore().collection('User').where('username', '==', emailname).get();

    const items = db.docs.map(doc=>({
      ...doc.data(),
      key: doc.id
    }))
    setUserProfile(items)
  };
  return (
    // <Modal visible={props.visible} onRequestClose={props.onRequestClose}>
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.updateinfo}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '88%',
              marginBottom: 50,
            }}>
            <Text style={{fontSize: 24, color: 'black'}}>
              Cập nhật thông tin{' '}
            </Text>
            <Button title="Close" onPress={() => onRequestClose()} />
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 18}}>Tên người dùng</Text>
            <MyInput
              // styleinput= {{width: '80%', height:40}}
              value={ten}
              onChangeText={(text: React.SetStateAction<string>) =>
                setTen(text)
              }
            />
          </View>
          <View>
            <Text style={{fontSize: 18}}>Email người dùng</Text>
            <MyInput
              // styleinput= {{width: '80%', height:40}}
              value={email}
              onChangeText={(text: React.SetStateAction<string>) =>
                setEmail(text)
              }
            />
          </View>
          <TouchableOpacity style={styles.btnsave}>
            <Text style={{fontSize: 18, color: '#fff'}}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default UpdateProfile;

const styles = StyleSheet.create({
  updateinfo: {
    width: '90%',
    height: '96%',
    // borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 100,
      height: 30,
    },
    shadowRadius: 20,
    shadowOpacity: 0.5,
    elevation: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    // marginTop: 60,
    paddingTop: 40,
  },
  btnsave: {
    width: 100,
    height: 38,
    backgroundColor: '#6666ff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});
