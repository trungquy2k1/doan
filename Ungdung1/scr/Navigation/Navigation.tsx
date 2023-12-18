import {SetStateAction, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {MainStackParamList} from '../types/RootList';
import HomeScr from '../Home/HomeScr';
import LoginScreen from '../Login/Login';
import Register from '../Register/Register';
import ProductScreen from '../Product/Product';
// import ChitietSP from '../ChitietSp/Chitietsp';
import ChitietSP from '../ChitietSp/Chitietsp';
import BottomTabNavigation from './BottomTab';
import Payment from '../Pay/Payment';
import AppProvider from '../../component/AppContext/AppContext';
import ListOrder from '../orderList/Listorder';
const Navigation = () => {
  // const Stack = createNativeStackNavigator();
  const RootStack = createStackNavigator<MainStackParamList>();
  // const RootStack = createBottomTabNavigator<MainStackParamList>();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (initializing) {
    return null;
  }
  return (
    <AppProvider>
    <NavigationContainer >
      {/* <Stack.Navigator initialRouteName="Home"> */}
      {/* <RootStack.Navigator initialRouteName="Category"> */}

      {/* {
        user ? ( */}
          <RootStack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
            <RootStack.Screen name="BottomTabNavigation" component={BottomTabNavigation}  />
            {/* <RootStack.Screen name='BottomTabBar' component={BottomTabBarr} /> */}
            {/* <RootStack.Screen name="Category" component={Category} /> */}
            {/* <RootStack.Screen name="Home" component={BottomTabNavigation} /> */}
            <RootStack.Screen name="ProductScreen" component={ProductScreen} />
            <RootStack.Screen name="ChitietSP" component={ChitietSP} />
            <RootStack.Screen name="Payment" component={Payment} />
            <RootStack.Screen name='ListOrder' component={ListOrder} />

            {/* <RootStack.Screen name='Favories' component={Favories} /> */}
            {/* <RootStack.Screen name='BottomTabBar' component={BottomTabNavigation} /> */}
          {/* </RootStack.Navigator> */}
        {/* ) : ( */}
          {/* <RootStack.Navigator> */}
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Register" component={Register} />

          </RootStack.Navigator>
        {/* ) */}
       {/* {/* <RootStack.Screen name="ChitietSP" component={ChitietSP} /> */}
      {/* } */}
    </NavigationContainer>
    </AppProvider>
  );
};
export default Navigation;
