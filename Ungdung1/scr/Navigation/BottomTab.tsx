import {Image, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';

import HomeScr from '../Home/HomeScr';
import Category from '../Category/Category';
import Favories from '../Favories/Favories';
import Profile from '../Profile/Profile';
import Cart from '../Cart/Cart';
const RootStack = createBottomTabNavigator();
//   const RootStack = createBottomTabNavigator<MainStackParamList>();

const BottomTabNavigation = () => {
//   const [selectedTab, setSelectedTab] = useState('Home');

//   const handleTabPress = (tabName) => {
//     setSelectedTab(tabName);
//   };
  return (
    // <NavigationContainer>

    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false, tabBarLabelStyle: {
        fontSize: 14,
        marginTop: 3,
        // backgroundColor: 'blue'
        // height: 40
      },tabBarActiveTintColor: 'red', 
      }}>
      <RootStack.Screen
        name="Home"
        component={HomeScr}
        options={{
          tabBarLabel: 'Nhà',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" size={23} color={color} />
            // <Image
            //   source={require('./Category/home.png')}
            //   style={{width: 32, height: 32, borderWidth: 1, borderColor: 'black', backgroundColor: '#b3b3ff'}}
            // />
          ),

        //   tabBarIcon: ({ focused }) => (
        //     <TouchableOpacity
        //       onPress={() => handleTabPress('Home')}
        //       style={{
        //         backgroundColor: focused ? 'blue' : 'transparent',
        //         padding: 8,
        //         borderRadius: 16,
        //       }}
        //     >
        //       <Image
        //         source={focused ? require('./Category/home_selected.png') : require('./Category/home.png')}
        //         style={{ width: 32, height: 32 }}
        //       />
        //     </TouchableOpacity>
        //   ),
          // tabBarStyle:{backgroundColor: 'blue'}
        }}
      />
      <RootStack.Screen name="Category" component={Category} options={
        {
          tabBarLabel: 'Loại',
          tabBarIcon: () => (
            <Image 
              source={require('../Image/Category/logo.png')}
              style={{width: 32, height: 32}}
            />
          ),
        //   tabBarIcon: ({ focused }) => (
        //     <TouchableOpacity
        //       onPress={() => handleTabPress('Category')}
        //       style={{
        //         backgroundColor: focused ? 'blue' : 'transparent',
        //         padding: 8,
        //         borderRadius: 16,
        //       }}
        //     >
        //       <Image
        //         source={focused ? require('./Category/logo_selected.png') : require('./Category/logo.png')}
        //         style={{ width: 32, height: 32 }}
        //       />
        //     </TouchableOpacity>
        //   ),
          // tabBarStyle:{backgroundColor: 'red'}
          // tabBarStyle: {backgroundColor: 'red'}
        }
      } />
      <RootStack.Screen name="Favories" component={Favories} options={{
        tabBarLabel: 'Yêu thích',
        tabBarIcon: () => (
          <Image 
            source={require('../Image/Category/favorie.png')}
              style={{width: 32, height: 32}}
          />
        )
        // tabBarIcon: ({ focused }) => (
        //   <TouchableOpacity
        //     onPress={() => handleTabPress('Favories')}
        //     style={{
        //       backgroundColor: focused ? 'blue' : 'transparent',
        //       padding: 8,
        //       borderRadius: 16,
        //     }}
        //   >
        //     <Image
        //       source={focused ? require('./Category/favourite_selected.png') : require('./Category/favourite.png')}
        //       style={{ width: 32, height: 32 }}
        //     />
        //   </TouchableOpacity>
        // ),
      }} />
      <RootStack.Screen name="Cart" component={Cart} options={{
        tabBarLabel: 'Giỏ hàng',
        tabBarIcon: () => (
          <Image 
            source={require('../Image/Category/cart.png')}
              style={{width: 32, height: 32}}
          />
        )
        // tabBarIcon: ({ focused }) => (
        //   <TouchableOpacity
        //     onPress={() => handleTabPress('Favories')}
        //     style={{
        //       backgroundColor: focused ? 'blue' : 'transparent',
        //       padding: 8,
        //       borderRadius: 16,
        //     }}
        //   >
        //     <Image
        //       source={focused ? require('./Category/favourite_selected.png') : require('./Category/favourite.png')}
        //       style={{ width: 32, height: 32 }}
        //     />
        //   </TouchableOpacity>
        // ),
      }} />
      <RootStack.Screen name="Profile" component={Profile} options={{
        tabBarLabel: 'Hồ sơ',
        tabBarIcon: () => (
          <Image 
            source={require('../Image/Category/profile.png')}
              style={{width: 32, height: 32}}
          />
        )
        // tabBarIcon: ({ focused }) => (
        //   <TouchableOpacity
        //     onPress={() => handleTabPress('Profile')}
        //     style={{
        //       backgroundColor: focused ? 'blue' : 'transparent',
        //       padding: 8,
        //       borderRadius: 16,
        //     }}
        //   >
        //     <Image
        //       source={focused ? require('./Category/profile_selected.png') : require('./Category/profile.png')}
        //       style={{ width: 32, height: 32 }}
        //     />
        //   </TouchableOpacity>
        // ),
      }} />
    </RootStack.Navigator>

    // </NavigationContainer>
  );
};
export default BottomTabNavigation;




//--------------------------------------------------------
//----------------------------------------------------------


// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import HomeScr from '../Home/HomeScr';
// import Category from '../Category/Category';
// import Favories from '../Favories/Favories';

// const Tab = createBottomTabNavigator();

// const BottomTabNavigation = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = 'home';
//           } else if (route.name === 'Category') {
//             iconName = 'category';
//           } else if (route.name === 'Favorites') {
//             iconName = 'heart';
//           }

//           return (
//             <MaterialCommunityIcons name={iconName} color={color} size={size} />
//           );
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScr} options={{
//           tabBarLabel: 'Updates',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="bell" color={color} size={size} />
//           ),
//         }}/>
//       <Tab.Screen name="Category" component={Category} />
//       <Tab.Screen name="Favorites" component={Favories} />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabNavigation;

//-----------------------------------------------------------------
//----------------------------------------------------------------

// import React, { useState } from 'react';
// import { Image, TouchableOpacity } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import HomeScr from '../Home/HomeScr';
// import Category from '../Category/Category';
// import Favories from '../Favories/Favories';
// import Profile from '../Profile/Profile';

// const Tab = createBottomTabNavigator();

// const BottomTabNavigation = () => {
//   const [selectedTab, setSelectedTab] = useState('Home');

//   const handleTabPress = (tabName) => {
//     setSelectedTab(tabName);
//   };

//   const renderTabIcon = (focused, image, selectedImage) => (
//     <TouchableOpacity
//       onPress={() => handleTabPress(image)}
//       style={{
//         backgroundColor: focused ? 'blue' : 'transparent',
//         padding: 8,
//         borderRadius: 16,
//       }}
//     >
//       <Image
//         source={focused ? selectedImage : image}
//         style={{ width: 32, height: 32 }}
//       />
//     </TouchableOpacity>
//   );

//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerShown: false,
//         tabBarLabelStyle: {
//           fontSize: 14,
//           marginTop: 3,
//         },
//         tabBarActiveTintColor: 'red',
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScr}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ focused }) =>
//             renderTabIcon(
//               focused,
//               require('./Category/home.png'),
//               require('./Category/home_selected.png')
//             ),
//         }}
//       />
//       <Tab.Screen
//         name="Category"
//         component={Category}
//         options={{
//           tabBarLabel: 'Category',
//           tabBarIcon: ({ focused }) =>
//             renderTabIcon(
//               focused,
//               require('./Category/logo.png'),
//               require('./Category/logo_selected.png')
//             ),
//         }}
//       />
//       <Tab.Screen
//         name="Favories"
//         component={Favories}
//         options={{
//           tabBarLabel: 'Favories',
//           tabBarIcon: ({ focused }) =>
//             renderTabIcon(
//               focused,
//               require('./Category/favourite.png'),
//               require('./Category/favourite_selected.png')
//             ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({ focused }) =>
//             renderTabIcon(
//               focused,
//               require('./Category/profile.png'),
//               require('./Category/profile_selected.png')
//             ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabNavigation;