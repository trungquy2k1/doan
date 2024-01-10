import {SetStateAction, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider} from 'react-redux';
import store from '../../redux/store';

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
import Category from '../Category/Category';
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
    <Provider store={store}>
      <AppProvider>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{headerShown: false}}>
            {user ? (
              <>
                <RootStack.Screen
                  name="BottomTabNavigation"
                  component={BottomTabNavigation}
                />
                <RootStack.Screen
                  name="ProductScreen"
                  component={ProductScreen}
                />
                <RootStack.Screen name="ChitietSP" component={ChitietSP} />
                <RootStack.Screen name="Payment" component={Payment} />
                <RootStack.Screen name="ListOrder" component={ListOrder} />
              </>
            ) : (
              <>
                <RootStack.Screen name="Login" component={LoginScreen} />
                <RootStack.Screen name="Register" component={Register} />
              </>
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </Provider>
  );
};
export default Navigation;
