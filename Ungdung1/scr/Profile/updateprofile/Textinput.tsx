import { StyleSheet, TextInput, View } from "react-native"

// const MyInput = ({styleinput}) =>{
const MyInput = ({value, onChangeText, placeholder, style}: any) =>{

    return(
        <View>
            {/* <TextInput style={[styles.input, styleinput]}/> */}
            <TextInput 
                style={styles.input} 
                value= {value}
                onChangeText={onChangeText}
                placeholder={placeholder}
            />

        </View>
    )
}
export default MyInput

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        width: 330,
        // width: '100%',
        height: 45,
        borderRadius: 20,
        marginTop: 10,
        fontSize: 18,
        marginBottom: 10,
        paddingLeft: 10
    }
})