import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { colYellowPink } from "../Constants/Colors";
import { ImgLogo } from '../Constants/Imports';
import { WIDTH } from "../Constants/Sizes";

function Home() {

    return (
        <View>
            <View style={styles.StatusBar}>
                <Image 
                    source={ImgLogo} 
                    style={styles.ImageLogo}/>
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
    ImageLogo:{
        height:WIDTH(15),
        width:WIDTH(15)
    }
})

export default Home
