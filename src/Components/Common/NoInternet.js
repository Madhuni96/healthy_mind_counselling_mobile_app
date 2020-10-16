import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { WIDTH } from '../../Constants/Sizes'
import { colYellow, colWhite } from '../../Constants/Colors'
import useConnection from './useConnection'

function NoInternet() {

    const connected = useConnection()

    if(connected){
        return null
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>No Internet</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colYellow
    },
    text:{
        fontSize: WIDTH(2.6),
        color: colWhite,
        textTransform: 'uppercase',
        letterSpacing: WIDTH(1),
        fontWeight: 'bold'
    }
})

export default React.memo(NoInternet)
