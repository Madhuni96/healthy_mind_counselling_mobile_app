import React, { useState, useEffect} from 'react'
import { View, StyleSheet, Alert, Text, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import StatusBarCom from '../Common/StatusBarCom';
import { QuesMarkIcon } from '../../Constants/Imports';
import { WIDTH } from '../../Constants/Sizes';
import { colYellowMain, colBlack, colBlue } from "../../Constants/Colors";
import useBackButton from '../Common/useBackButton'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux'
import { change_password_action } from '../../Redux';

function ChangePassword({route}) {

    const { userId } = route.params;

    const [password,setPassword] = useState('')
    const [newpassword,setNewpassword] = useState('')

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user_state = useSelector(state => state.user);
    const { userLoading, userError, userMessage, singleUser } = user_state;

    const payload = {
        password:password,
        newPassword:newpassword
    }

    const changePasswordMethod = () => {
        if(password && newpassword){
            dispatch(change_password_action(userId,payload))
            if(userMessage){
                navigation.navigate('Home')
            }
            if(userError){
                alert(userError.data)
            }
        }else if(password === ''){
            alert("Current Password field is empty!")
        }else if(newpassword === ''){
            alert("New Password field is empty!")
        }else if(newpassword === password){
            alert("Current Password and New Password is not matched!")
    }
    }

    const backHandler = () =>{
        navigation.navigate('Home')
        return false
    }

    useBackButton(backHandler)

    return (
        <LinearGradient
            colors={['rgba(255, 187, 0,0.2)', 'rgba(255, 204, 0,0.7)']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
                <StatusBarCom/>
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.titleText}>Change Password</Text>
                        <View style={styles.inputsView}>
                            <Icon name="lock" size={30} color="#000000" style={styles.icon}/>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                textContentType='password'
                                onChangeText={(text) => setPassword(text)}
                                placeholder="Enter Current Password"/>
                        </View>
                        <View style={styles.inputsView}>
                            <Icon name="lock" size={30} color="#000000" style={styles.icon}/>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                textContentType='password'
                                onChangeText={(text) => setNewpassword(text)}
                                placeholder="Enter New Password"/>
                        </View>
                        {userLoading && (
                            <View>
                                <ActivityIndicator size="small" color="#000000"/>
                            </View>
                        )}
                        <View style={{alignSelf:'center'}}>
                            <TouchableOpacity onPress={()=>{changePasswordMethod()}}>
                                    <View style={styles.buttonStyle}>
                                        <Text style={styles.buttonText}>Change Password</Text>
                                        </View>
                            </TouchableOpacity>
                        </View>
                        <Image source={QuesMarkIcon} style={styles.image}/>
                        <View style={{alignSelf:'center'}}>
                            <TouchableOpacity onPress={()=>{navigation.navigate('ForgotPassword')}}>
                                <Text style={styles.forgotText}>forgot password?</Text>
                            </TouchableOpacity>
                        </View>
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
        margin:WIDTH(5),
        alignSelf: 'center',
        width: '70%',
        borderBottomWidth: WIDTH(0.2),
        fontSize: WIDTH(4.5)
    },
    icon: {
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

export default ChangePassword
