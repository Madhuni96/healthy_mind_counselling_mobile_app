import React, { useState,useEffect } from 'react'
import { SafeAreaView, ScrollView, View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import StatusBarCom from '../Common/StatusBarCom';
import { WIDTH } from '../../Constants/Sizes';
import { colYellowMain, colBlack, colBlue } from "../../Constants/Colors";
import { useSelector, useDispatch } from 'react-redux'
import { get_verification_code_action, forgot_password_action } from '../../Redux';

function ForgotPassword() {

    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [verificationcode,setVerificationCode] = useState('');
    const [newpassword,setNewpassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user_state = useSelector(state => state.user);
    const { userLoading, userError, userMessage, singleUser } = user_state;

    const getVerificationCode = () => {
        if(email){
            dispatch(get_verification_code_action(email))
            if(userError){
                alert(userError.data)
            }
        }else if(email === ''){
            alert("Email field is empty!")
        }
    }

    const payload = {
        username:username,
        verificationCode:verificationcode,
        newPassword:newpassword,
        confirmPassword:confirmpassword
    }

    const forgotPasswordMethod = () =>{
        if(verificationcode && newpassword && confirmpassword){
            dispatch(forgot_password_action(payload))
            if(userMessage){
                navigation.navigate('SignIn')
            }
            if(userError){
                alert(userError.data)
            }
        }else if(verificationcode === ''){
            alert("Verification Code field is empty!")
        }else if(newpassword === ''){
            alert("New Password field is empty!")
        }else if(confirmpassword === ''){
            alert("Confirm Password field is empty!")
        }
    }

    return (
        <LinearGradient
            colors={['rgba(255, 187, 0,0.2)', 'rgba(255, 204, 0,0.7)']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
                <StatusBarCom/>
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.titleText}>Forgot Password</Text>
                        <TextInput
                            style={styles.input}
                            textContentType='username'
                            onChangeText={(text)=>setUsername(text)}
                            placeholder="Enter Username"/>
                        <TextInput
                            style={styles.input}
                            textContentType='emailAddress'
                            onChangeText={(text)=>setEmail(text)}
                            keyboardType='email-address'
                            placeholder="Enter Email"/>
                        <View style={{alignSelf:'center'}}>
                            <TouchableOpacity onPress={()=>{getVerificationCode()}}>
                                    <View style={styles.buttonStyle}>
                                        <Text style={styles.buttonText}>Send Verification Code</Text>
                                        </View>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=>setVerificationCode(text)}
                            placeholder="Enter Verification Code"/>
                        <TextInput
                            style={styles.input}
                            textContentType='password'
                            secureTextEntry={true}
                            onChangeText={(text)=>setNewpassword(text)}
                            placeholder="Enter New Password"/>
                        <TextInput
                            style={styles.input}
                            textContentType='password'
                            secureTextEntry={true}
                            onChangeText={(text)=>setConfirmpassword(text)}
                            placeholder="Enter Confirm Password"/>
                        <View style={{alignSelf:'center'}}>
                            <TouchableOpacity onPress={()=>{forgotPasswordMethod()}}>
                                    <View style={styles.buttonStyle}>
                                        <Text style={styles.buttonText}>Change Password</Text>
                                        </View>
                            </TouchableOpacity>
                        </View>
                        {userLoading &&
                            <ActivityIndicator size="small" color="#000000"/>
                        }
                    </ScrollView>
                </SafeAreaView>
                
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    scrollView:{
        marginHorizontal: 20,
    },
    titleText:{
        alignSelf:'center',
        fontSize:WIDTH(8),
        fontFamily:'Roboto',
        margin:WIDTH(5)
    },
    inputsView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    input: {
        margin:WIDTH(2),
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
    buttonStyle: {
        backgroundColor: colYellowMain,
        borderColor: colYellowMain,
        padding:10,
        width: WIDTH(80),
        height: WIDTH(15),
        borderWidth: WIDTH(1),
        borderRadius: WIDTH(2),
        alignItems:'center',
        margin:WIDTH(4)
    },
    buttonText: {
        fontSize: 20,
        color: colBlack,
    },
    image:{
        height:100,
        width:100,
        alignSelf:'center',
        margin:WIDTH(5)
    },
    forgotText:{
        color: colBlue,
        textDecorationLine:'underline',
        fontSize:WIDTH(5),
        margin:WIDTH(3)
    },
})

export default ForgotPassword
