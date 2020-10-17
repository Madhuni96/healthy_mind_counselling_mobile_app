import React from 'react'
import { View, StyleSheet, Image, Text} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colYellowLight, colYellowPink } from "../Constants/Colors";
import { ImgLogo } from '../Constants/Imports';
import { WIDTH } from "../Constants/Sizes";
import SignInComponents from '../Components/SignIn/SignInComponents'
import Header from '../Components/Common/Header'

function SignIn() {
    return (
        <LinearGradient
            colors={['rgba(255, 204, 0,0.2)', 'rgba(255, 204, 0,1)']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
            <View style={styles.contentContainer}>
                <View style={styles.menuHeaderContainer}>
                    <Header/>
                </View>
                <View style={styles.inputsView}>
                    <SignInComponents/>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colYellowPink
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    menuHeaderContainer: {
        flex: 1,
        borderBottomLeftRadius: WIDTH(10),
        borderBottomRightRadius: WIDTH(10),
        overflow: 'hidden',
        shadowColor: 'black',
        shadowRadius: 0.5,
        shadowOpacity: 0.5,
    },
    StatusBar: {
        backgroundColor: colYellowPink,
        height: WIDTH(15),
        flexDirection: 'row'
    },
    ImageLogo:{
        height:WIDTH(15),
        width:WIDTH(15)
    },
    inputsView:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    }
})

export default SignIn
