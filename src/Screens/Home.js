import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Alert, Text, Image, ToastAndroid, BackHandler } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { colYellowPink } from "../Constants/Colors";
import { WIDTH } from "../Constants/Sizes";
import StatusBarCom from '../Components/Common/StatusBarCom';
import LinearGradient from 'react-native-linear-gradient';
import { ImgChat, ImgIcon, ImgQuiz } from '../Constants/Imports';
import ProfileModal from '../Components/Modals/ProfileModal';
import { useSelector, useDispatch } from 'react-redux'
import { get_user_action } from '../Redux';

function Home({ route }) {

    const { userId } = route.params;

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user_state = useSelector(state => state.user);
    const { userLoading, userError, userMessage, singleUser } = user_state;

    const [exitApp, setExitApp] = useState(false);
    const [profileModalVisibility, setProfileModalVisibility] = useState(null);

    const onOpenProfileModal = () => {
        setProfileModalVisibility(true);
    }

    const onCloseProfileModal = () => {
        setProfileModalVisibility(false);
    }

    const backHandler = () => {
        if (profileModalVisibility) {
            onCloseProfileModal();
        }
        else {
            if (exitApp) {
                BackHandler.exitApp();
            }
            else {
               setExitApp(true)
                ToastAndroid.show(
                    'Press again to exit',
                    ToastAndroid.BOTTOM,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                )
            }
                        
        }
        return true;
    }

    

    useEffect(() => {
        dispatch(get_user_action(userId));
    }, []);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backHandler);
        return () => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                backHandler
            );
        };
    }, [profileModalVisibility, exitApp]);

    return (
        <LinearGradient
            colors={['rgba(255, 187, 0,0)', 'rgba(255, 204, 0,1)']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <View style={styles.contentContainer}>
                <StatusBarCom/>
                <View style={{alignSelf:'flex-end'}}>
                    <TouchableOpacity onPress={()=>onOpenProfileModal()}>
                        <Image source={ImgIcon} style={styles.ImageView}/>
                        <Text style={styles.text}>{singleUser.username}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentView}>
                    <View style={styles.imgView}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Quiz',{userId:userId})}>
                            <Image source={ImgQuiz} style={styles.image}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imgView}><Image source={ImgChat} style={styles.image}/></View>
                </View>
            </View>
            <ProfileModal
                visibility={profileModalVisibility}
                onClose={onCloseProfileModal}
                userId={userId}/>
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
    contentView:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    imgView:{
        width: '100%', 
        height: '50%'
    },
    image:{
        height:'80%',
        width:'80%',
        resizeMode:'center',
        alignSelf:'center'
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
    }
})

export default Home
