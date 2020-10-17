import React from 'react'
import { StatusBar, View, StyleSheet, Image, Text } from 'react-native'
import { colYellowPink } from "../Constants/Colors";
import { ImgLogo } from '../Constants/Imports';
import { WIDTH } from "../Constants/Sizes";
import StatusBarCom from '../Components/Common/StatusBarCom'
import SignUpComponents from '../Components/SignUp/SignUpComponents';
import LinearGradient from 'react-native-linear-gradient';

function SignUp() {
    return (
        <LinearGradient 
            colors={['rgba(255, 187, 0,0)', 'rgba(255, 204, 0,1)']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <View style={styles.contentContainer}>
                <StatusBarCom/>
                <SignUpComponents/>
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
})

export default SignUp
