import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    productContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#ffffff',
        marginBottom: 10,
        borderRadius: 18,
        marginHorizontal: 12,
        // width: '80%'
        width: 180,
         height: 260
        // width: '100%'
      },
      productImage: {
        width: 130,
        height: 120,
        marginRight: 10,
        borderRadius: 25
      },
      giamgia:{
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between'
      },
      gia:{
        color:'#000',
        fontSize: 16
      },
      productInfo: {
        flex: 1,
      },
      productName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
        color:'black'
      },
      hiengia:{
        display: 'flex',
        flexDirection: 'row'
      },
      productPrice: {
        fontSize: 16,
        color: '#ff661a',
      },
      timkiem:{
        // display: 'flex',
        // flexDirection:'row',
        flexDirection:'row',
        // borderWidth: 1,
        // justifyContent:'space-between',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 5
      },
      inputtimkiem:{
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor:'#fff'
        // paddingTop: 5,
        // marginTop: 10
        
      },
      productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      },
      // productColumn: {
      //   flex: 1,
      //   paddingHorizontal: 5,
      //   marginBottom: 10,
      // },
      productColumn: {
        width: '50%',
        paddingHorizontal: 5,
        marginBottom: 10,
      },
    }
)

export default styles