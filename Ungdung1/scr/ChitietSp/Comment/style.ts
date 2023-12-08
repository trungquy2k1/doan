import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  addcomment: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // backgroundColor: 'blue',
  },
  button: {
    // backgroundColor: '#ff944d',
    // borderRadius: 40,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // alignItems: 'center',
    // justifyContent: 'center',

    //   height: 80
    // Các thuộc tính khác của button
    height: 45,
    backgroundColor: 'orange',
    justifyContent: 'center',
    width: '30%',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginLeft: 3,
    marginTop: 5,
  },
  buttonText: {
    // color: 'white',
    // fontSize: 20,
    // Các thuộc tính khác của văn bản trong button
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    // paddingRight: 8,
  },
  binhluan: {
    // marginTop: 20,
    // marginHorizontal: 5,
    // flexDirection: 'row',
    // height: 463,
    overflow: 'scroll',
    // marginBottom: 20
  },
  binhluan2: {
    // marginTop: 20,
    marginHorizontal: 5,
    flexDirection: 'row',
    width: '80%',
    marginBottom: 10,
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
    width: 360,
  },
  nameanddate: {},
  name: {},
  content: {
    borderWidth: 0.2,
    marginLeft: 5,
    marginTop: 3,
  },
});
export default styles;
