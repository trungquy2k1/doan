// import { Text, View } from "react-native"

// const Payment = () => {
//     return(
//         <View>
//             <Text>Đây là trang thanh toán</Text>
//         </View>
//     )
// }
// export default Payment

import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TextInput, Alert, TouchableOpacity, ImageBackground} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

import styles from './style';
import MyButton from '../../component/Button/Mybutton';
// import {FlatList} from 'react-native-gesture-handler';
import {AppContext} from '../../component/AppContext/AppContext';
import Header2 from '../../component/Head/Header';

const Payment = ({route}: any) => {
  const {formattedTotalAmount} = route.params;
  const navigation = useNavigation();
  const {emailname} = useContext(AppContext);

  const [isPress, setIsPress] = useState(false);
  const [edit, setEdit] = useState(true);
  const [xacnhan, setXacnhan] = useState(false);
  const [hienthitien, setHienthitien] = useState(false);

  const [name, setName] = useState('');
  const [sdt, setSdt] = useState('');
  const [diachi, setDiachi] = useState('');
  const [sodon, setSodon] = useState(0);

  const [checkboxes, setCheckboxes] = useState([
    {
      id: 1,
      title: 'Thanh toán bằng tiền mặt khi nhận hàng',
      checked: true,
    },
    {
      id: 2,
      title: 'Thanh toán bằng tài khoản ngân hàng',
      checked: false,
    },
  ]);

  const onButtonPress = () => {
    const selectedCheckBoxes = checkboxes.find(cb => cb.checked === true);
    if (name == '' || sdt == '' || diachi == '') {
      Alert.alert('Vui lồng điền đầy đủ thông tin');
    } else {
      setIsPress(true);
      setEdit(false);
      // setXacnhan(true);
      setXacnhan(!xacnhan);
    }
  };

  const toggleCheckbox = (id: number, index: number) => {
    const checkboxData = checkboxes.map((cb, i) => ({
      ...cb,
      checked: i === index, // Chỉ đánh dấu checkbox hiện tại là chọn, các checkbox khác sẽ bị bỏ chọn
    }));
    setCheckboxes(checkboxData);
  };
  const handleXacnhan = () => {
    // setXacnhan(!xacnhan);
    setIsPress(!isPress);
    setSodon(pre => pre + 1);
    setHienthitien(!hienthitien);
    setEdit(true);
    // na
  };

  const addOrder = async () => {
    try {
      await firestore().collection('Order').add({
        tennguoinhan: name,
        sodienthoai: sdt,
        diachi: diachi,
        username: emailname,
        ngaydat: firestore.Timestamp.fromDate(new Date()),
        state: 'Đang giao hàng',
        tongtien: formattedTotalAmount,
      });

      setIsPress(!isPress);
      setHienthitien(!hienthitien);
      setEdit(true);
      setName('');
      setSdt('');
      setDiachi('');
      Alert.alert('thêm thành công');
    } catch (error) {
      console.log('Lỗi: ', error);
    }
  };
  const FetchOrder = async () => {
    const querySnapshot = await firestore()
      .collection('Order')
      .where('username', '==', emailname)
      .get();
    
      setSodon(pre => pre + 1);
    
  };

  useEffect(()=>{
    FetchOrder()
  },[])

  const handleClick = () =>{
    navigation.navigate('ListOrder');
  }
  // const sendEmail = async (email: string, subject: string, body: string) => {
  //   try {
  //     // await auth().signInWithEmailAndPassword('YOUR_EMAIL', 'YOUR_PASSWORD');
  //     const user = auth().currentUser;

  //     if (user) {
  //       await user.sendEmailVerification();

  //       const message = {
  //         from: email,
  //         to: user.email,
  //         subject: subject,
  //         text: body
  //       };

  //       await firestore().collection('emails').add(message);

  //       console.log('Email sent successfully!');
  //     } else {
  //       console.error('User is null.');
  //     }
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //   }
  // };
  console.log('emai: ', emailname);
  // Khi người dùng nhấn nút thanh toán

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {/* <View
      style={{
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={{fontSize: 18, color: '#000'}}>Trở lại</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.back} onPress={handleClick}>
        <ImageBackground
          source={require('../../scr/Image/Icon/list.png')}
          style={{
            width: 30,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
              {/* <Text style={styles.nd}>{nd}</Text> */}
              {/* {sodon != 0 ? (
          <Text>{sodon}</Text>
        ) : (
          <Text>0</Text>
        )}
        </ImageBackground>
      </TouchableOpacity>
      <Text style={{width: 50}}></Text>
    </View> */} 
      <Header2
        navigation={navigation}
        source={require('../../scr/Image/Icon/list.png')}
        trangcon="ListOrder"
        nd={sodon != 0 ? (
          // {sodon}
          <Text>{sodon}</Text>
        ) : (
          // <Text>0</Text>
          // 0
          '0'
        )} ht={false}  
        onPress={handleClick}
      />
      <Text
        style={{
          fontSize: 24,
          color: 'black',
          textAlign: 'center',
          marginBottom: 10,
        }}>
        Thông tin người nhận
      </Text>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder="Họ và tên"
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
          editable={edit}
        />
        <TextInput
          keyboardType="phone-pad"
          placeholder="Số điện thoại"
          style={styles.input}
          value={sdt}
          onChangeText={text => setSdt(text)}
          editable={edit}
        />
        <TextInput
          placeholder="Địa chỉ"
          style={styles.input}
          value={diachi}
          onChangeText={text => setDiachi(text)}
          editable={edit}
        />
      </View>
      <View style={styles.tong}>
        <View style={styles.tongtien}>
          <Text style={styles.txttongtien}>Tổng tiền</Text>
          {!hienthitien ? (
            <Text>{formattedTotalAmount} VND</Text>
          ) : (
            <Text>0 VND</Text>
          )}
        </View>

        <View>
          {checkboxes.map((cb, index) => (
            <View style={{flexDirection: 'row'}} key={index}>
              <CheckBox
                key={cb.id}
                value={cb.checked}
                onValueChange={() => toggleCheckbox(cb.id, index)}
              />
              <Text>{cb.title}</Text>
            </View>
          ))}
        </View>
      </View>
      {isPress && (
        <View style={styles.thongtin}>
          <Text>OKOKOK</Text>
          <View style={styles.ten}>
            <Text
              style={[styles.txtthongtin, {borderRightWidth: 1, width: '38%'}]}>
              Tên người nhận
            </Text>
            <Text style={styles.txtthongtin}>{name}</Text>
          </View>
          <View style={styles.ten}>
            <Text
              style={[styles.txtthongtin, {borderRightWidth: 1, width: '38%'}]}>
              Địa chỉ{' '}
            </Text>
            <Text style={styles.txtthongtin}>{diachi}</Text>
          </View>
          <View style={styles.ten}>
            <Text
              style={[styles.txtthongtin, {borderRightWidth: 1, width: '38%'}]}>
              SĐT người nhận
            </Text>
            <Text style={styles.txtthongtin}>{sdt}</Text>
          </View>

          {/* <View style={styles.ten}>
            <Text style={[styles.txtthongtin, {borderRightWidth: 1,width:'38%'}]}>Email người nhận</Text>
            <Text style={styles.txtthongtin}>{emailname}</Text>
          </View> */}
          <View>
            <Text style={styles.txtthongtin}>
              Tổng tiền: {formattedTotalAmount} VND
            </Text>
          </View>

          <View>
            {checkboxes.map(cb => {
              if (cb.checked) {
                return (
                  <Text
                    key={cb.id}
                    style={[styles.txtthongtin, {marginBottom: 5, height: 80}]}>
                    Thanh toán bằng: {cb.title}
                  </Text>
                );
              }
              return null;
            })}
          </View>
          <MyButton
            titlebtn="thanh toán"
            // onPress={()=>sendEmail(emailname, 'Thanh toán thành công', 'Cảm ơn bạn đã thanh toán!')}
            onPress={addOrder}
            // style={{width: 400, height: 180}}
          />
        </View>
      )}
      {!xacnhan && (
        <MyButton
          titlebtn="Xác nhận"
          onPress={onButtonPress}

          // style={{justifyContent: 'center', width: '80%'}}
        />
      )}
    </View>
  );
};

export default Payment;
