import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  homecontainer: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    height: 300,
  // backgroundColor: 'red'  
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    // fontFamily: 'Lucida Console',
    color: '#004d99',
    fontStyle: 'italic',
    marginLeft: 7
    
  },
  sptuongtu: {
    // padding: 5,
    // backgroundColor: '#fff',
    // width: '100%'
    width: 320,
    height: 200,
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
  imgtuongtu: {
    width: 120,
    height: 120,
    borderRadius: 30,
    // marginHorizontal: 5
  },
  // tentuongtu: {
  //   width: 110,
  //   color: 'black',
  // },
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
  spyeuthich:{
    justifyContent: 'center',
    alignItems:'center',
    // heigh: 
    fontSize: 24,
    color: '#cc9900'
  },
});
