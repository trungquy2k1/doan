import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  product: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '63%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff9966',
  },
  price: {
    fontSize: 18,
  },
  quantity: {
    fontSize: 18,
  },
  total: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  thanhtoan: {
    backgroundColor: '#ffff4d',
    width: '50%',
    height: 40,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  delete: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff9966',
    marginRight: 10,
    width: 55,
    height: 69,
    paddingTop: 3,
    borderRadius: 14,
  },
  tongquan: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '70%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  btnhien: {
    width: 200,
    height: 50,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 20
  },
});

export default styles;
