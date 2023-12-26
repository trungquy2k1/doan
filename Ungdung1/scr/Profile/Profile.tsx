// import { View ,Text } from "react-native"

// const Profile = ()=>{
//     return(
//         <View>
//             <Text>Profile</Text>
//         </View>
//     )
// }
// export default Profile
import React, { useContext, useState } from 'react';
import {
  Button,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { AppContext } from '../../component/AppContext/AppContext';
import styles from './style';

// import {TouchableOpacity} from 'react-native-gesture-handler';

import UpdateProfile from './updateprofile/Updateprofile';
const Profile = () => {
  const {emailname} = useContext(AppContext)
  const navigation = useNavigation()
  const [visiblemodal, setVisiblemodal ] = useState(false)
  const handleLogout = async () => {
    try {
      await auth().signOut();
      // Đăng xuất thành công, thực hiện các tác vụ sau khi đăng xuất
    } catch (error) {
      console.log('Đăng xuất thất bại:', error);
    }
  };
  const handleLogout1 = async () => {
    navigation.navigate('Login')
  };

  return (
    <View style={styles.profile}>
      {/* <Button title="Đăng xuất" onPress={handleLogout} /> */}
      {/* <Image source={require('./Image/avatar.png')} style={styles.imgavata} /> */}
      <ImageBackground
        source={require('../Image/Image/avatar.png')}
        style={styles.imageBackground}>
        {/* Nội dung khác trong component ImageBackground */}
        <TouchableOpacity style={styles.camera}>
          <Image
            source={require('../Image/Image/camera1.png')}
            style={styles.imgavata}
          />
        </TouchableOpacity>
      </ImageBackground>
      <Text style={styles.ten}>{emailname} </Text>
      <View style={styles.chinhsua}>
        <TouchableOpacity style={styles.btnchinhsua} onPress={()=>setVisiblemodal(true)}>
          <Text style={styles.txtchinhsua}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
        <UpdateProfile visible={visiblemodal} onRequestClose={() => setVisiblemodal(false)} />
        {/* <TouchableOpacity style={styles.btnchinhsua}>
          <Text style={styles.txtchinhsua}>Thay ảnh đại diện</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.chucnang}>
        {/* <View style={{justifyContent: 'space-between'}}> */}
        <TouchableOpacity style={styles.btnchucnang}
          onPress={() => navigation.navigate('ListOrder')}
        >
          <Text style={styles.txtchucnang}>Lịch sử mua hàng</Text>
          <Text style={styles.txtchucnang}>{'>'}</Text>
        </TouchableOpacity>
        {/* </View> */}
        
        {/* <View style={{justifyContent: 'space-between', flexDirection: 'row'}}> */}
        <TouchableOpacity style={[styles.btnchucnang, {borderBottomWidth: 0.5}]} onPress={handleLogout1}>
          <Text style={styles.txtchucnang}>Đăng xuất</Text>
          <Text style={styles.txtchucnang}>{'>'}</Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </View>
  );
};

export default Profile;
