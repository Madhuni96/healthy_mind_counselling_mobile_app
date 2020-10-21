import React from 'react'
import { View, StyleSheet, Alert, Text, Image, SafeAreaView, ScrollView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import StatusBarCom from '../Common/StatusBarCom';
import { PwIcon, QuesMarkIcon } from '../../Constants/Imports';
import { WIDTH } from '../../Constants/Sizes';
import { colYellowMain, colBlack, colBlue } from "../../Constants/Colors";
import useBackButton from '../Common/useBackButton'

function ChangePassword() {

    const navigation = useNavigation();

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
                            <Image
                                source={PwIcon}
                                style={styles.icon}/>
                            <TextInput
                                style={styles.input}
                                textContentType='password'
                                placeholder="Enter Current Password"/>
                        </View>
                        <View style={styles.inputsView}>
                            <Image
                                source={PwIcon}
                                style={styles.icon}/>
                            <TextInput
                                style={styles.input}
                                textContentType='password'
                                placeholder="Enter New Password"/>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
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

export default ChangePassword
