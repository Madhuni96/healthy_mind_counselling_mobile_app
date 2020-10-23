import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RadioForm from 'react-native-simple-radio-button';
import { WIDTH } from "../../Constants/Sizes";
import { colBlack, colYellowMain } from '../../Constants/Colors'

function QuizFrame({id,questionsets,answersets}) {

    let {question,answer} = questionsets.find(item=>item._id === id)
    let {answers} = answersets.find(item=>item.title === answer)

    var radio_answers = [];

    answers.forEach((element,index) => {
        radio_answers.push({label:element,value:index})
    });

    return (
        <View style={styles.container}>
            <View style={{borderWidth:2}}>
                <Text style={styles.text}>{question}</Text>
                <View style={styles.radioView}>
                    <View style={styles.radioBtnView}>
                        <Text style={styles.text}>answers</Text>
                        <RadioForm
                            radio_props={radio_answers}
                            initial={0}
                            onPress={(value)=>{genderFunction(value)}}
                            formHorizontal={false}
                            labelHorizontal={true}
                            buttonSize={25}
                            buttonOuterSize={25}
                            buttonColor={colYellowMain}
                            buttonInnerColor={colYellowMain}
                            selectedButtonColor={colYellowMain}
                            animation={true}
                            style={{margin:WIDTH(2)}}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.2)',
        borderRadius:WIDTH(2)
    },
    radioView:{
        flexDirection:'row',
        alignSelf:'center',
        margin:WIDTH(3)
    },
    radioBtnView:{
        marginLeft:WIDTH(2),
        marginRight:WIDTH(2),
        marginBottom:WIDTH(2)
    },
    text:{
        fontSize:WIDTH(4.5),
        margin:WIDTH(2),
        alignSelf:'center'
    },
})

export default QuizFrame
