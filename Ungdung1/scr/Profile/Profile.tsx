// import { View ,Text } from "react-native"

// const Profile = ()=>{
//     return(
//         <View>
//             <Text>Profile</Text>
//         </View>
//     )
// }
// export default Profile
import React from 'react';
import { Button, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      // Đăng xuất thành công, thực hiện các tác vụ sau khi đăng xuất
    } catch (error) {
      console.log('Đăng xuất thất bại:', error);
    }
  };

  return (
    <View>
      <Button title="Đăng xuất" onPress={handleLogout} />
      <TextInput 
        placeholder='aa..'
        style={{borderWidth: 1}}
        inputMode='tel'
      />
    </View>
  );
};

export default Profile;