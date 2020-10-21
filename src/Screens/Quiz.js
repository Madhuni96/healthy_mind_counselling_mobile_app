import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, ScrollView, StyleSheet, Alert, Text, Image, ToastAndroid, BackHandler } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { colYellowPink, colYellowMain, colBlack } from "../Constants/Colors";
import { WIDTH } from "../Constants/Sizes";
import StatusBarCom from '../Components/Common/StatusBarCom';
import LinearGradient from 'react-native-linear-gradient';
import { ImgIcon, ImgQuiz } from '../Constants/Imports';
import useBackButton from '../Components/Common/useBackButton'
import QuizFrame from '../Components/Quiz/QuizFrame';

function Quiz() {

    const navigation = useNavigation();
    const [quizFrameVisibility, setQuizFrameVisibility] = useState(false)
    const [nextAndSubmitBtnVisibility, setNextAndSubmitBtnVisibility] = useState(false)

    const backHandler = () =>{
        navigation.navigate('Home')
        return true
    }

    useBackButton(backHandler)

    return (
        <LinearGradient
            colors={['rgba(0, 0, 0,0)', 'rgba(255, 204, 0,0.5)']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <StatusBarCom/>
            <View style={{alignSelf:'flex-end'}}>
                <Image source={ImgIcon} style={styles.ImageView}/>
                <Text style={styles.text}>Madhuni</Text>
            </View>
            <View style={styles.imgView}>
                <TouchableOpacity onPress={()=>navigation.navigate('Quiz')}>
                    <Image source={ImgQuiz} style={styles.image}/>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {quizFrameVisibility === true?
                        <QuizFrame/>
                    :<View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter No. of Questions (5|10|20)"/>
                        <View style={{alignSelf:'center'}}>
                            <TouchableOpacity onPress={()=>{setQuizFrameVisibility(true)}}>
                                <View style={styles.buttonStyle}>
                                    <Text style={styles.buttonText}>Get Started!</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colYellowPink
    },
    scrollView:{
        marginHorizontal: 20,
    },
    ImageView:{
        height:50,
        width:50,
        borderRadius:50/2,
        alignSelf:'flex-end',
        margin:WIDTH(3)
    },
    text:{
        alignSelf:'center',
    },
    imgView:{
        width: '100%', 
        height: '20%'
    },
    image:{
        height:'100%',
        width:'100%',
        resizeMode:'center',
        alignSelf:'center'
    },
    input: {
        margin:WIDTH(5),
        alignSelf: 'center',
        width: '70%',
        borderBottomWidth: WIDTH(0.2),
        fontSize: WIDTH(4.5)
    },
    buttonStyle: {
        backgroundColor: colYellowMain,
        borderColor: colYellowMain,
        padding:10,
        width: WIDTH(50),
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
})

export default Quiz
