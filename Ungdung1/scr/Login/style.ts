import { StyleSheet } from "react-native";

export const styles =  StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          },
          texttitle:{
            fontSize: 40,
            fontWeight: '700',
          },
          input: {
            width: '100%',
            height: 40,
            // borderWidth: 1,quyq
            borderColor: 'gray',
            marginBottom: 12,
            paddingHorizontal: 8,
            borderRadius: 8,
            backgroundColor:'#fff',
            shadowColor: '#000',
            shadowOffset:{
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 5

          },
          buttonLogin: {
            // width: '60%',
            height: 60,
            backgroundColor: 'orange',
            // justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 20,
            flexDirection:'row',
            paddingHorizontal: 8,
            marginBottom: 15
          },
          buttonText: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingRight: 8

            
          },
          loginicon: {
            width: 50,
            height: 50
          }
    }
)