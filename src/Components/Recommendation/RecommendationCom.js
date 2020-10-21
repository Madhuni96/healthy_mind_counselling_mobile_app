import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

function RecommendationCom() {
    return (
        <View style={styles.container}>
            <Text>Rec</Text>
        </View>
    )
}

const styles = StyleSheet.create({
     container: {
        width: WIDTH(100),
        height: WIDTH(20),
        marginVertical: WIDTH(1),
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: WIDTH(2)
    },
})

export default RecommendationCom
