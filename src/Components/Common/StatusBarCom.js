import React from 'react'
import { StatusBar, View, StyleSheet, Image, Text } from 'react-native'
import { colYellowPink } from "../../Constants/Colors";
import { ImgLogo } from '../../Constants/Imports';
import { WIDTH } from "../../Constants/Sizes";

function StatusBarCom() {
    return (
        <View>
            <StatusBar translucent={false} backgroundColor='transparent' />
            <View style={styles.StatusBar}>
                <Image 
                    source={ImgLogo} 
                    style={styles.ImageLogo}/>
                <Text style={styles.HeaderText}>Healthy Mind</Text>
            </View>
            </View>
    )
}

const styles = StyleSheet.create({
    StatusBar: {
        backgroundColor: colYellowPink,
        height: WIDTH(15),
        flexDirection: 'row'
    },
    HeaderText:{
        alignSelf:'center',
        margin:WIDTH(3),
        fontWeight:'bold',
        fontFamily:'serif',
        fontSize:WIDTH(5)
    },
    ImageLogo:{
        height:WIDTH(15),
        width:WIDTH(15)
    }
})

export default StatusBarCom
