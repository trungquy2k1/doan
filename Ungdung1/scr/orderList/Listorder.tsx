import { Text, View } from "react-native"
import {useNavigation} from '@react-navigation/native';

import Header2 from "../../component/Head/Header"
const ListOrder = () =>{
    const navigation = useNavigation()
    return (
        <View>
            <Header2
        navigation={navigation}
        source={require('../../scr/Image/Icon/list.png')}
        trangcon='ListOrder'
      />
            <Text>Đây là danh sách bạn order</Text>
        </View>
    )
}

export default ListOrder