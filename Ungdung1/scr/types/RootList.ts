import { RouteProp } from "@react-navigation/native";

export type MainStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Category: undefined;
    BottomTabNavigation: undefined;
    // About: undefined;
    Favories: undefined;
    Profile: undefined;
    Cart: undefined;
    Payment: undefined;
    ListOrder: undefined;
    ProductScreen: { categoryname: string };
    ChitietSP: { product: string };
};
export type ProductRouteProp = RouteProp<MainStackParamList, 'ProductScreen'>;
export type ChitietRouteProp = RouteProp<MainStackParamList, 'ChitietSP'>;
