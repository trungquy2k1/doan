// import { Text, View } from "react-native"

// const Payment = () => {
//     return(
//         <View>
//             <Text>Đây là trang thanh toán</Text>
//         </View>
//     )
// }
// export default Payment

import React, {useContext, useState} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


import styles from './style';
import MyButton from '../../component/Button/Mybutton';
// import {FlatList} from 'react-native-gesture-handler';
import { AppContext } from '../../component/AppContext/AppContext';
const Payment = ({route}: any) => {
  const {formattedTotalAmount} = route.params;
  const [isPress, setIsPress] = useState(false);
  const [edit, setEdit] = useState(true);

  const [name, setName] = useState('');
  const [sdt, setSdt] = useState('');
  const [diachi, setDiachi] = useState('');
const {emailname} = useContext(AppContext)
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
    if (name == '' && sdt == '' && diachi == '') {
      Alert.alert('Vui lồng điền đầy đủ thông tin');
    } else {
      setIsPress(true);
      setEdit(false);
    }
  };

  const toggleCheckbox = (id: number, index: number) => {
    const checkboxData = checkboxes.map((cb, i) => ({
      ...cb,
      checked: i === index, // Chỉ đánh dấu checkbox hiện tại là chọn, các checkbox khác sẽ bị bỏ chọn
    }));
    setCheckboxes(checkboxData);
  };


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
  console.log('emai: ', emailname)
  // Khi người dùng nhấn nút thanh toán
  
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
          <Text>{formattedTotalAmount} VND</Text>
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
            <Text style={[styles.txtthongtin, {borderRightWidth: 1,width:'38%'}]}>Tên người nhận</Text>
            <Text style={styles.txtthongtin}>{name}</Text>

          </View>
          <View style={styles.ten}>
            <Text style={[styles.txtthongtin, {borderRightWidth: 1,width:'38%'}]}>Địa chỉ </Text>
            <Text style={styles.txtthongtin}>{diachi}</Text>

          </View>
          <View style={styles.ten}>
            <Text style={[styles.txtthongtin, {borderRightWidth: 1,width:'38%'}]}>SĐT người nhận</Text>
            <Text style={styles.txtthongtin}>{sdt}</Text>
          </View>

          {/* <View style={styles.ten}>
            <Text style={[styles.txtthongtin, {borderRightWidth: 1,width:'38%'}]}>Email người nhận</Text>
            <Text style={styles.txtthongtin}>{emailname}</Text>
          </View> */}
          <View>
            <Text style={styles.txtthongtin}>Tổng tiền: {formattedTotalAmount} VND</Text>
          </View>

          <View>
            {checkboxes.map(cb => {
              if (cb.checked) {
                return <Text key={cb.id} style={[styles.txtthongtin,{marginBottom: 20, height: 80,}]}>Thanh toán bằng: {cb.title}</Text>;
              }
              return null;
            })}
          </View>
          {/* <MyButton 
            titlebtn='thanh toán'
            onPress={()=>sendEmail(emailname, 'Thanh toán thành công', 'Cảm ơn bạn đã thanh toán!')}
          /> */}
        </View>
      )}

      <MyButton
        titlebtn="Xác nhận"
        onPress={onButtonPress}

        // style={{justifyContent: 'center', width: '80%'}}
      />
    </View>
  );
};

export default Payment;
