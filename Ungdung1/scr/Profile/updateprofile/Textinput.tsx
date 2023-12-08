import { StyleSheet, TextInput, View } from "react-native"

// const MyInput = ({styleinput}) =>{
const MyInput = ({value, onChangeText}: any) =>{

    return(
        <View>
            {/* <TextInput style={[styles.input, styleinput]}/> */}
            <TextInput 
                style={styles.input} 
                value= {value}
                onChangeText={onChangeText}
            />

        </View>
    )
}
export default MyInput

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        width: 280,
        height: 45,
        borderRadius: 20,
        marginTop: 10
    }
})