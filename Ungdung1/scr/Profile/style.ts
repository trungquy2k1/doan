import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgavata: {
    width: 30,
    height: 30,
  },
  camera: {
    width: 40,
    height: 40,
    // borderWidth: 1,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    left: 85,
    top: 85,
    // transform: [{rotate: '40deg'}],
  },
  imageBackground: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  ten: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chinhsua: {
    flexDirection: 'row',
    // padding: 10
    marginBottom: 20
  },
  btnchinhsua: {
    backgroundColor: 'orange',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  txtchinhsua: {
    fontSize: 18,
    color: '#fff',
  },
  chucnang:{
    height: 60,
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10
    // borderCurve: 1
    // borderTopWidth: 1,

  },
  btnchucnang:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
    paddingTop: 10,
    // backgroundColor: 'blue',
    // marginBottom: 10,
    borderTopWidth: 0.5

  },
  txtchucnang:{
    fontSize: 24
  },
});
export default styles;
