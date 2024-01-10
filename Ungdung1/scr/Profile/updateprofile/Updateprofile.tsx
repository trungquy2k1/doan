import React, {useContext, useEffect, useState} from 'react';
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
  const [diachi, setDiachi] = useState('');
  const [sodt, setSodt] = useState('');
  
  console.log(ten);
  const FetchUser = async() => {
    const db = await firestore().collection('User').where('username', '==', emailname).get();

    const items = db.docs.map(doc=>({
      ...doc.data(),
      key: doc.id
    }))
    setUserProfile(items)
  };

  useEffect(()=>{
    FetchUser()
  },[])

  const UpdateProfile = () =>{

  }
  const handleSave = () => {
    const updatedProfile = {
      username: ten || userProfile[0].username, // Sử dụng giá trị mới hoặc giữ nguyên giá trị cũ
      email: email || userProfile[0].email,
      sodt: sodt || userProfile[0].sodt, 
      diachi: diachi || userProfile[0].diachi, 

    };
  
    firestore()
      .collection('User')
      .doc(userProfile[0].key)
      .update(updatedProfile)
      .then(() => {
        console.log('Cập nhật thành công');
      })
      .catch((error) => {
        console.log('Lỗi khi cập nhật:', error);
      });
  };
  return (
    // <Modal visible={props.visible} onRequestClose={props.onRequestClose}>
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {userProfile.map((item)=>(
          <View style={styles.updateinfo} key={item.key}>
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
            {/* <Text style={{fontSize: 18}}> {item.username} </Text> */}

            <MyInput
              // styleinput= {{width: '80%', height:40}}
              value={ten || item.username}
              onChangeText={(text: React.SetStateAction<string>) =>
                setTen(text)
              }
            />
          </View>
          <View>
            <Text style={{fontSize: 18}}>Email người dùng</Text>
            {/* <Text style={{fontSize: 18}}> {item.email} </Text> */}

            <MyInput
              // styleinput= {{width: '80%', height:40}}
              value={email||item.email}
              onChangeText={(text: React.SetStateAction<string>) =>
                setEmail(text)
              }
            />
          </View>
          <View>
            <Text style={{fontSize: 18}}>Số điện thoại</Text>
            {/* <Text style={{fontSize: 18}}> {item.} </Text> */}

            <MyInput
              // styleinput= {{width: '80%', height:40}}
              // value={sodt}
              value={sodt||item.sodt}
              onChangeText={(text: React.SetStateAction<string>) =>
                setSodt(text)
              }
            />
          </View>
          <View>
            <Text style={{fontSize: 18}}>Địa chỉ</Text>
            {/* <Text style={{fontSize: 18}}> {item.email} </Text> */}

            <MyInput
              // styleinput= {{width: '80%', height:40}}
              // value={diachi}
              value={diachi||item.diachi}
              onChangeText={(text: React.SetStateAction<string>) =>
                setDiachi(text)
              }
            />
          </View>
          <TouchableOpacity style={styles.btnsave} onPress={handleSave}>
            <Text style={{fontSize: 18, color: '#fff'}}>Lưu</Text>
          </TouchableOpacity>
        </View>
        ))}
        
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
