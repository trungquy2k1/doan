import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#ecc6d9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //   scrollView: {
  //     flex: 1,
  //     backgroundColor: '#ecc6d9',
  //     marginTop: 10,
  //   },
  //   text2: {
  //     fontSize: 18,
  //     color: '#808000',
  //     marginHorizontal: 10,
  //     textAlign: 'justify',
  //   },
  //   text: {
  //     fontSize: 20,
  //     color: 'black',
  //   },
  //   nametree: {
  //     fontSize: 20,
  //     flexWrap: 'wrap',
  //     color: '#B22222',
  //     fontWeight: 'bold',
  //   },
  textgiamgia: {
    fontSize: 28,
    color: '#ffffff',
    // color: '#ff0000',
    fontWeight: 'bold',
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    width: '80%',
    textAlign: 'center',
    backgroundColor: '#ff6666',
    // backgroundColor: '#ffffff',
    marginTop: 10,
    fontStyle: 'italic',
    position: 'absolute',
    left: 60,
    top: 6,
    transform: [{rotate: '40deg'}],
  },
  img: {
    width: '100%',
    height: 190,
    backgroundColor: '#b3d9ff',
    // justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 30,
    flexDirection: 'row',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    paddingLeft: 3,
  },
  info: {
    backgroundColor: '#fff',
    marginLeft: 10,
    width: '60%',
    height: '90%',
    paddingLeft: 10,
  },
  tensp: {
    alignItems: 'center',
    fontSize: 21,
    fontWeight: 'bold',
    color: 'black',
  },
  giamgia: {},
  giagoc: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 5,
  },
  giaban: {
    color: 'red',
    fontSize: 20,
    fontWeight: '600',
  },
  imgbackground: {
    width: 170,
    height: 170,
    //  justifyContent: 'flex-start',
    //  alignItems: 'flex-end'
    // borderRadius: 20,
    // borderWidth: 1,
    paddingLeft: 7,
  },
  soluong: {
    marginTop: 8,
    width: '70%',
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textSL: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '800',

    width: '30%',
    height: 50,
    paddingTop: 8,
  },
  textSL1: {
    // textAlign: 'center',
    color: '#000',
    fontWeight: '800',
    // width: 40,
    // height: 40,
    // paddingTop: 8,
  },
  btnSL: {
    // flex:1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    // height: 40,
    backgroundColor: 'white',
  },
  //   addToCartButton: {
  //     height: 50,
  //     width: 200,
  //     backgroundColor: 'white',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     borderRadius: 10,
  //     marginVertical: 10,
  //   },
  motavaBluan: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    marginVertical: 8,
  },
  btnmota: {
    // borderWidth: 1,
    // backgroundColor: '#fe724c',
    backgroundColor: '#fff',
    width: '50%',
    height: 48,
    justifyContent: 'center',
    borderRadius: 20,
    // alignItems: 'center'
  },
  txtmota: {
    fontSize: 17,
    textAlign: 'center',
    // color: '#fff',
    color: 'black',
    fontWeight: 'bold',
  },
  selectedButton: {
    backgroundColor: '#fe724c',
  },
  selectedButtonText: {
    color: '#fff',
  },
  mota: {
    width: '100%',
    height: 510,
    // backgroundColor: '#fff'
  },
  motatext: {
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 7,
    backgroundColor: '#fff',
  },
  sptuongtu: {
    padding: 5,
    backgroundColor: '#fff',
    // width: '100%'
  },
  imgtuongtu: {
    width: 120,
    height: 120,
    borderRadius: 30,
    // marginHorizontal: 5
  },
  tentuongtu: {
    width: 110,
    color: 'black',
  },
  viewMoreText: {
    color: 'blue',
    fontSize: 18,
    // paddingLeft: 10,
    // borderWidth: 1,
    textAlign: 'center',
    // width: 100
    // height: 100
  },
  dathang: {
    flexDirection: 'row',
    // width: 60,
    height: 60,
    // marginTop: 10
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20,
  },
  imgcart: {
    width: 30,
    height: 30,
  },
  cart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 22,
    width: '53%',
    height: 55,
    marginTop: 10,
    paddingHorizontal: 5,
    backgroundColor: '#ffa64d',
    marginRight: 6,
  },
  tim: {
    width: 50,
    height: 50,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#ffa64d',
    marginTop: 8,
  },
  imgtim: {
    width: 30,
    height: 30,
  },
  binhluan: {
    // marginTop: 20,
    // marginHorizontal: 5,
    // flexDirection: 'row',
    height: 463,
    overflow: 'scroll',
    // marginBottom: 20
  },
  binhluan2: {
    // marginTop: 20,
    marginHorizontal: 5,
    flexDirection: 'row',
    width: '80%',
    marginBottom: 10
    // minHeight: 500
  },
  imgavata: {
    width: 30,
    height: 30,
  },
  noidung: {
    // marginTop: 20, 
    marginHorizontal: 5, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 360
  },
  nameanddate: {},
  name: {
    fontSize: 17,
    fontWeight: '400',
    color: '#000'
  },
  content: {
  borderWidth: 0.2,
  marginLeft: 5,
  marginTop: 3,
  fontSize: 18,
  color: '#000'
  },
});

export default styles;
