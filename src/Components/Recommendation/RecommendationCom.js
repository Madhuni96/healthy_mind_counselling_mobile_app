import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { colYellowPink, colYellowMain, colBlack } from "../../Constants/Colors";
import { WIDTH } from "../../Constants/Sizes";

function RecommendationCom({recommend,id}) {

    let {recommendations} = recommend.find(item=>item._id === id)
    console.log("object: ",recommendations)
        return (
        <View style={styles.container}>
                <Text>{recommendations}</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
     container: {
        width: '100%',
        height: '100%',
        margin: WIDTH(1),
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
})

export default RecommendationCom
