import { useEffect, useState } from "react"
import firestore from '@react-native-firebase/firestore';

// import { db } from "./firebase";
import { FlatList, Text, View, TextInput, Button, Alert } from "react-native";
const Testfirebase = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const [data, setData] = useState([]);
    const [data, setData] = useState<{ id: string }[]>([]);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const collectionRef = firestore().collection('User');
          const snapshot = await collectionRef.get();
    
          const documents = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
    
          setData(documents);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      const handleCheck = (item: { username: string; password: string; }) => {
        if (username === item.username && password === item.password) {
          Alert.alert('Tài khoản đúng');
        } else {
          Alert.alert('Tài khoản sai, cần điền đúng thông tin');
        }
      };
      
      
    
      const renderItem = ({ item }:any) => (
        
        <View>
          <View>
            <TextInput 
              value={username}
              onChangeText={text=>setUsername(text)}
              style={{borderWidth:1}}
              placeholder="user"
            />
            <TextInput 
              value={password}
              onChangeText={text=>setPassword(text)}
              style={{borderWidth:1}}
              placeholder="pass"
            />
            <Button 
              title="check user"
              onPress={() =>handleCheck(item)}
            />
          </View>
          <Text>{item.username}</Text>
          <Text>{item.password}</Text>
        </View>
      );
    
      
      return (
        <View>
          <Text>Fetching data from Firestore</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            // keyExtractor={(item) => item.id}
          />
        </View>
      );
    };

    export default Testfirebase;