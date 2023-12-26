import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: 380,
    height: 50,
    borderRadius: 18,
    marginBottom: 5,
    backgroundColor: '#fff',
    paddingLeft: 10
  },
//   btnxacnhan:{
//     borderWidth: 1,
//     fontSize: 20,
//     justifyContent: 'center',
//     alignItems:'center',
//     // height: 50
back: {
  height: 45,
  backgroundColor: '#fff',
  width: '90%',
  justifyContent: 'center',
  // alignItems: 'center',
},
//   }
tong:{
    borderWidth: 2,
    flexDirection:'row',
    height: 100, 
    justifyContent: 'center',
    alignItems:'center',
    marginVertical: 10, 
    width: '99%'

},
txttongtien:{
    textAlign: 'center',
    fontSize: 18,
    marginRight: 10

    // borderRightWidth: 1,
    // height: '100%'
},
tongtien:{
    // textAlign: 'center',
    // fontSize: 18,,
    borderRightWidth: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
},
thongtin:{
  justifyContent:'center',
  alignItems: 'center'
},
txtthongtin:{
  fontSize: 20,
  color: 'black',
  height: 55,
textAlign:'center',
// marginRight: 5,

},
ten:{
  flexDirection: 'row',
  borderWidth: 1,
  justifyContent: 'space-between',
  alignItems:'center',
  width: 390,
  height: 55
}
});

export default styles;
