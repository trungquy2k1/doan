import {useContext, useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

import Header2 from '../../component/Head/Header';
import styles from './style';
import {AppContext} from '../../component/AppContext/AppContext';
import {DocumentData} from 'firebase/firestore';

const ListOrder = () => {
  // const [emailname] = useContext(AppContext)
  const {emailname} = useContext(AppContext);
  // const {tt} = route.params;
  const navigation = useNavigation();
  const [order, setOrder] = useState<DocumentData[]>([]);

  const [xacnhan, setXacnhan] = useState(false);
  const [htnd, setHtnd] = useState(false);

  const FetchOrder = async () => {
    const db = await firestore()
      .collection('Order')
      .where('username', '==', emailname)
      .get();
    // const item =
    const items = db.docs.map(doc => ({
      ...doc.data(),
      key: doc.id,
    }));

    setOrder(items);
  };

  useEffect(() => {
    FetchOrder();
  }, []);

  const handleXacnhan = async idorder => {
    await firestore()
      .collection('Order')
      .doc(idorder)
      .update({
        state: 'Đơn hàng đã được giao',
      })
      .then(() => {
        // setXacnhan(true);
        FetchOrder();
      })
      .catch(error => console.log('Lỗi: ', error));
    // setXacnhan(true),
  };

  const renderDataItem = ({item}: any) => (
    // <View>
    <View style={styles.listorder}>
      <View style={{width: '60%'}}>
        <Text style={{fontSize: 14, color: 'grey'}}>
          {moment(item.ngaydat.toDate()).format('DD/MM/YYYY')}
        </Text>
        <Text style={styles.thontin}> Người nhận: {item.tennguoinhan} </Text>
        <Text style={styles.thontin}> SĐT người nhận: {item.sodienthoai} </Text>
        <Text style={styles.thontin}> Địa chỉ: {item.diachi} </Text>
        <Text style={styles.thontin}> Số tiền: {item.tongtien} VND</Text>
        <Text style={styles.thontin}> Trạng thái: {item.state}</Text>
      </View>
      <View style={{width: '40%'}}>
        {item.state == 'Đang giao hàng' ? (
          <View>
            <Text style={{textAlign: 'center', fontSize: 16, marginBottom: 13}}>
              Hãy xác nhận khi bạn nhận được hàng
            </Text>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'orange',
                borderRadius: 20,
              }}
              onPress={()=>handleXacnhan(item.key)}>
              <Text style={{fontSize: 24, fontWeight: 'bold', color: '#fff'}}>
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 16, marginBottom: 13}}>
              Cảm ơn bạn đã xác nhận
            </Text>
            <Image 
              style={{width: 80, height: 70}}
              source={require('../Image/Icon/check.png')}
            />
          </View>
        )}
      </View>
    </View>
  );
  return (
    <View>
      <Header2
        navigation={navigation}
        source={require('../../scr/Image/Icon/list.png')}
        // trangcon="ListOrder"
        nd={undefined}
        ht={undefined}
        onPress={() => navigation.navigate('ListOrder')} 
        trangcon={undefined}      />
      <Text>Đây là danh sách bạn order</Text>
      {/* <View style={styles.listorder}> */}
      {/* <Text>Hhahaa</Text> */}
      {/* {order.map((orders)=>(
                    <View key={orders.key}>
                        <Text style={{fontSize: 14, color: 'grey'}}>
                      {moment(orders.ngaydat.toDate()).format('DD/MM/YYYY')}
                    </Text>
                        <Text> {orders.tennguoinhan} </Text>
                    </View>
                ))} */}
      <FlatList
        data={order}
        renderItem={renderDataItem}
        // keyExtractor={item => item.key.toString()}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* </View> */}
    </View>
  );
};

export default ListOrder;
