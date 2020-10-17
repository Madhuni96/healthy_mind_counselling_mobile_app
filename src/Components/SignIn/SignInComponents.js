import React from 'react'
import { View, StyleSheet, Image, Text, Button} from 'react-native'
import { TextInput, TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { UserIcon, PwIcon } from '../../Constants/Imports';
import { colBlack, colBlue, colYellowMain } from '../../Constants/Colors'
import { WIDTH } from "../../Constants/Sizes";

function SignInComponents() {

const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.inputsView}>
                <Image
                    source={UserIcon}
                    style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    textContentType='username'
                    placeholder="Enter User Name"/>
            </View>
            <View style={styles.inputsView}>
                <Image
                    source={PwIcon}
                    style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    textContentType='password'
                    placeholder="Enter Password"/>
            </View>
            <View style={{alignSelf:'flex-end'}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}}>
                    <Text style={styles.forgotText}>forgot password?</Text>
                </TouchableOpacity>
            </View>
                
            <View style={{alignSelf:'center'}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}}>
                        <View style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>SignIn</Text>
                            </View>
                </TouchableOpacity>
            </View>
            <View style={{alignSelf:'center'}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}}>
                    <Text style={styles.newAccText}>Create a new account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    inputsView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    input: {
        marginTop: '5%',
        alignSelf: 'center',
        width: '70%',
        borderBottomWidth: WIDTH(0.2),
        fontSize: WIDTH(4.5)
    },
    icon: {
        width: WIDTH(7),
        height: WIDTH(7),
        marginTop:WIDTH(3),
        marginRight:WIDTH(3)
    },
    textButtonStyle:{
        padding:2,
    },
    buttonStyle: {
        backgroundColor: colYellowMain,
        borderColor: colYellowMain,
        padding:10,
        width: WIDTH(40),
        height: WIDTH(15),
        borderWidth: WIDTH(1),
        borderRadius: WIDTH(2),
        alignItems:'center',
    },
    forgotText:{
        color: colBlue,
        marginRight: WIDTH(10),
        textDecorationLine:'underline',
        fontSize:WIDTH(4.5),
        margin:WIDTH(3)
    },
    buttonText: {
        fontSize: 20,
        color: colBlack,
    },
    newAccText:{
        color: colBlack,
        textDecorationLine:'underline',
        fontSize:WIDTH(4.5),
        margin:WIDTH(3)
    },
})

export default SignInComponents
