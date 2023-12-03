import { StyleSheet } from "react-native";

// const styles = StyleSheet.create ({
//     category:{
//         // flex: 1,
//         // justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#ff884d',
//         height: 1000
//     },
//     catetitle:{
//         fontSize: 30,
//         fontWeight: '700',
//         color: '#fff'
//         // textAlignL:'center'
//     },
//     containercate:{
//         width: '80%',
//         height: 180,
//         // backgroundColor: '#fff',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 30,
//         paddingTop:0,
//         marginBottom: 10,

//     },
//     catename:{
//         color: 'black',
//         fontSize: 24,
//         textAlign:'center',
//         fontWeight: '600'
//         // backgroundColor: '#fff',

//     },
//     cateinfo:{
//         color: 'black',
//         fontSize: 18,
//         textAlign:'center',
//         fontWeight: '400'

//     },
//     catebottom:{
//         width:'100%',
//         height: 60,
//         backgroundColor: '#fff',
//         borderBottomLeftRadius: 20,
//         borderBottomRightRadius: 20,
//         // paddingBottom: 5
//     },
// })
// import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    category: {
      margin: 10,
      borderRadius: 20,
      backgroundColor: '#f0f0f0',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    catetitle: {
      fontSize: 16,
      fontWeight: 'bold',
      padding: 10,
    },
    catename: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    cateinfo: {
      fontSize: 14,
      marginTop: 5,
    },
    catebottom: {
      padding: 10,
    },
  });
  
  // export default styles;

export default styles;