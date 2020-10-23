import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, ActivityIndicator } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { colBlack, colBlue, colYellowMain } from '../../Constants/Colors'
import { WIDTH } from "../../Constants/Sizes";
import { useSelector, useDispatch } from 'react-redux'
import { signin_action } from '../../Redux';

function SignInComponents() {

const [username,setUsername] = useState('')
const [password,setPassword] = useState('')

const navigation = useNavigation();
const dispatch = useDispatch();
const signin_state = useSelector(state => state.user)
const { userLoading, userError, userMessage } = signin_state;

const payload = {
    username:username,
    password:password
}

const signinMethod = () =>{
    
    if(username && password){
        dispatch(signin_action(payload))
        if(userError){
            alert(userError.data)
        }
    }else if(username === ''){
        alert("Username is empty!")
    }else if(password === ''){
        alert("Password is empty!")
    } 
}

    return (
        <View style={styles.container}>
            <View style={styles.inputsView}>
                <Icon name="user" size={30} color="#000000" style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    textContentType='username'
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Enter User Name"/>
            </View>
            <View style={styles.inputsView}>
                <Icon name="lock" size={30} color="#000000" style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    textContentType='password'
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Enter Password"/>
            </View>
            <View style={{alignSelf:'flex-end'}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('ForgotPassword')}}>
                    <Text style={styles.forgotText}>forgot password?</Text>
                </TouchableOpacity>
            </View>
                
            <View style={{alignSelf:'center'}}>
                <TouchableOpacity onPress={()=>{signinMethod()}}>
                        <View style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>SignIn</Text>
                            </View>
                </TouchableOpacity>
            </View>
            {userLoading && (
                <View>
                    <ActivityIndicator size="small" color="#000000"/>
                </View>
            )}
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
