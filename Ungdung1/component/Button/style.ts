import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  button: {
    // backgroundColor: '#ff944d',
    // borderRadius: 40,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // alignItems: 'center',
    // justifyContent: 'center',

    //   height: 80
    // Các thuộc tính khác của button
    height: 60,
    backgroundColor: 'orange',
    justifyContent: 'center',
    width: '80%',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 15,
  },
  buttonText: {
    // color: 'white',
    // fontSize: 20,
    // Các thuộc tính khác của văn bản trong button
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingRight: 8,
  },
});

export default styles;
