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
import { get_user_action, get_all_recommendations, get_all_careas_action, get_all_questions, get_all_answers } from '../Redux';
import RecommendationCom from '../Components/Recommendation/RecommendationCom';

function Recommendation({route}) {

    const { userId } = route.params;

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { singleUser }  = useSelector(state => state.user);
    const { recommendationLoading, recommendations } = useSelector(state => state.recommendation)

    useEffect(() => {
        dispatch(get_user_action(userId));
        dispatch(get_all_recommendations())
    }, []);

    const recom = [];
    const recomm = ['5f83f4352dd38f7652fc8e08','5f83f4852dd38f7652fc8e0a','5f83f4fd2dd38f7652fc8e0b'];

    recommendations.forEach((element,index) => {
        recom.push(element)
    });

console.log("R:",recommendations)

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
                    <View>
                {recommendationLoading ?
                    <ActivityIndicator size={10}/>
                :
                <FlatList
                    data={recomm}
                    renderItem={({item,index}) => <RecommendationCom 
                                                    id={item} 
                                                    recommend={recom} />}
                    keyExtractor={item => item}
                />
                }
            </View>
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
})

export default Recommendation
