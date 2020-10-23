import React, { useState, useEffect } from 'react'
import { View, FlatList, SafeAreaView, ScrollView, StyleSheet, Alert, Text, Image, ToastAndroid, BackHandler, ActivityIndicator } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { colYellowPink, colYellowMain, colBlack } from "../Constants/Colors";
import { WIDTH } from "../Constants/Sizes";
import StatusBarCom from '../Components/Common/StatusBarCom';
import LinearGradient from 'react-native-linear-gradient';
import { ImgIcon, ImgQuiz } from '../Constants/Imports';
import useBackButton from '../Components/Common/useBackButton'
import QuizFrame from '../Components/Quiz/QuizFrame';
import { useSelector, useDispatch } from 'react-redux'
import { get_user_action, get_all_careas_action, get_all_questions, get_all_answers } from '../Redux';

function Quiz({ route }) {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { singleUser }  = useSelector(state => state.user);
    const { careas } = useSelector(state => state.carea);
    const { questionsets,questionsetLoading } = useSelector(state => state.questionset);
    const { answersets,answersetLoading } = useSelector(state => state.answerset);

    const { userId } = route.params;
    const [question,setQuestion] = useState([]);
    const [quizFrameVisibility, setQuizFrameVisibility] = useState(false);
    const [nextAndSubmitBtnVisibility, setNextAndSubmitBtnVisibility] = useState(false);

    const backHandler = () =>{
        navigation.navigate('Home')
        return true
    }

    useEffect(() => {
        dispatch(get_user_action(userId));
        dispatch(get_all_questions());
        dispatch(get_all_answers());
    }, []);

    useEffect(() => {
        dispatch(get_all_careas_action());
    }, []);

    useBackButton(backHandler)

    const questionSelection = () =>{
        setQuizFrameVisibility(true)
        const questionArray = [];
        careas.map((area)=>{
            const questions = area.questions;
            let question = questions[Math.floor(Math.random() * questions.length)]
            questionArray.push(question)
        })
        setQuestion(questionArray)
    }
    

    return (
        <LinearGradient
            colors={['rgba(0, 0, 0,0)', 'rgba(255, 204, 0,0.5)']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <StatusBarCom/>
            <View style={{alignSelf:'flex-end'}}>
                <Image source={ImgIcon} style={styles.ImageView}/>
                <Text style={styles.text}>{singleUser.username}</Text>
            </View>
            <View style={styles.imgView}>
                    <Image source={ImgQuiz} style={styles.image}/>
            </View>
            <SafeAreaView style={styles.container}>
                    {quizFrameVisibility === true?
                        <View style={{alignSelf:'center',margin:WIDTH(2)}}>
                            {questionsetLoading && answersetLoading ?
                                <ActivityIndicator size={10}/>
                            :
                            <FlatList
                                data={question}
                                renderItem={({item,index}) => <QuizFrame 
                                                                id={item} 
                                                                questionsets={questionsets}
                                                                answersets={answersets} />}
                                keyExtractor={item => item}
                                ListHeaderComponent={
                                    <>
                                        <Text style={styles.text1}>Questions</Text>
                                    </>}
                                ListFooterComponent={
                                    <View style={{alignSelf:'center'}}>
                                        <TouchableOpacity onPress={()=>{navigation.navigate('Recommendation',{userId:userId})}}>
                                            <View style={styles.buttonStyle}>
                                                <Text style={styles.buttonText}>Submit</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>}
                            />
                            }
                        </View>
                        
                    :<View>
                        {/* <TextInput
                            style={styles.input}
                            placeholder="Enter No. of Questions (5|10|20)"/> */}
                        <View style={{alignSelf:'center'}}>
                            <TouchableOpacity onPress={()=>{questionSelection()}}>
                                <View style={styles.buttonStyle}>
                                    <Text style={styles.buttonText}>Get Started!</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
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
    text1:{
        fontSize:WIDTH(5),
        fontWeight:'bold',
        margin:WIDTH(2)
    },
})

export default Quiz
