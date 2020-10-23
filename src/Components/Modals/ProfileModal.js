import React, { useState, useEffect } from 'react'
import { View, Animated, StyleSheet, ScrollView, SafeAreaView, Text, Image, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { colYellowMain, colBlack, colYellowPink } from "../../Constants/Colors";
import { WIDTH, STATUSBAR_HEIGHT } from "../../Constants/Sizes";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AgeIcon, ImgIcon } from '../../Constants/Imports';
import { useSelector, useDispatch } from 'react-redux'
import { get_user_action, user_profile_update_action } from '../../Redux';

function ProfileModal({visibility, onClose, userId}) {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user_state = useSelector(state => state.user);
    const { userLoading, userError, userMessage, singleUser } = user_state;
    const [modalOpacity] = useState(new Animated.Value(0));
    const [imgData,setImgData] = useState('');
    const [email,setEmail] = useState('');
    const [nic,setNic] = useState('');
    const [phone,setPhone] = useState('');
    const [state] = useState('Online');

    const payload = {
        email:email,
        nic:nic,
        phone:phone,
        state:state
    }

    const updateMethod = () => {
        if(email && nic && phone){
            dispatch(user_profile_update_action(userId,payload))
            if(userMessage){
                closeAnimation()
            }
            if(userError){
                alert(userError.data)
            }
        }else if(email === ''){
            alert("Email field is empty!")
        }else if(nic === ''){
            alert("NIC field is empty!")
        }else if(phone === ''){
            alert("Phone field is empty!")
        }
    }

    const openAnimation = () => {
        Animated.timing(
            modalOpacity,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start()
    }

    const closeAnimation = () => {
        Animated.timing(
            modalOpacity,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }
        ).start(() => onClose())
    }

    useEffect(() => {
        dispatch(get_user_action(userId));
    }, []);

    useEffect(() => {
            if (visibility) {
                openAnimation();
            }else if (visibility === false) {
                closeAnimation();
            }
        }, [visibility])

    if (!visibility) {
            return null;
        }

    const launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                console.log('response', JSON.stringify(response));
                setImgData(response.data)
            }
        });
    };

    const launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                console.log('response', JSON.stringify(response));
                setImgData(response.data)
            }
        });
    };

    const renderImage = () =>{
        if (imgData) {
            return (
                <Image
                source={{uri: 'data:image/jpeg;base64,' + imgData}}
                style={styles.images}
                />
            );
        } else {
            return (
                <Image source={ImgIcon} style={styles.images} />
            );
        }
    }

    return (
        <Animated.View style={[styles.container, {
            opacity: modalOpacity
        }]}>
             <View style={styles.modalContainer}>
                <View style={styles.modalBackground}>
                    <SafeAreaView>
                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.titleText}>Update Profile</Text>
                            <View style={styles.ImageSections}>
                                <View>
                                    {renderImage()}
                                </View>
                            </View>
                            <View style={styles.btnParentSection}>
                                <TouchableOpacity
                                    onPress={()=>launchCamera()}
                                    >
                                    <Icon name="camera" size={30} color="#000000" style={styles.icon}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>launchImageLibrary()}
                                    >
                                    <Icon name="image" size={30} color="#000000" style={styles.icon}/>
                                </TouchableOpacity>
                            </View>                           
                                <Text style={styles.text}>{singleUser.username}</Text>
                                <Text style={styles.text}>{singleUser.age}</Text>
                                <Text style={styles.text}>{singleUser.gender}</Text>
                                <Text style={styles.text}>{singleUser.type}</Text>
                            <View style={styles.inputsView}>
                                <Icon name="at" size={30} color="#000000" style={styles.icon}/>
                                <TextInput
                                    style={styles.input}
                                    textContentType='emailAddress'
                                    keyboardType='email-address'
                                    defaultValue={singleUser.email}
                                    placeholder="Enter Email"
                                    clearTextOnFocus={true}
                                    onChangeText={(text) => setEmail(text)}/>
                            </View>
                            <View style={styles.inputsView}>
                                <Icon name="id-card" size={30} color="#000000" style={styles.icon}/>
                                <TextInput
                                    style={styles.input}
                                    defaultValue={singleUser.nic}
                                    placeholder="Enter NIC"
                                    onChangeText={(text) => setNic(text)}/>
                            </View>
                            <View style={styles.inputsView}>
                                <Icon name="phone" size={30} color="#000000" style={styles.icon}/>
                                <TextInput
                                    style={styles.input}
                                    keyboardType='phone-pad'
                                    defaultValue={singleUser.phone}
                                    textContentType='telephoneNumber'
                                    placeholder="Enter Phone No."
                                    onChangeText={(text) => setPhone(text)}/>
                            </View>
                            <View style={{alignSelf:'center'}}>
                                <TouchableOpacity onPress={()=>{navigation.navigate('ChangePassword',{userId:userId})}}>
                                            <Text style={styles.pwText}>Change Password</Text>
                                </TouchableOpacity>
                                {userLoading && (
                                    <View>
                                        <ActivityIndicator size="small" color="#000000"/>
                                    </View>
                                )}
                                <TouchableOpacity onPress={()=>{updateMethod()}}>
                                        <View style={styles.buttonStyle}>
                                            <Text style={styles.buttonText}>Update</Text>
                                            </View>
                                </TouchableOpacity>
                                
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        width: '90%',
        marginTop: STATUSBAR_HEIGHT * 2,
        marginBottom: STATUSBAR_HEIGHT,
        backgroundColor: colYellowPink,
        borderRadius: WIDTH(1)
    },
    modalBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    scrollView:{
        marginHorizontal: 20,
    },
    titleText:{
        alignSelf:'center',
        fontSize:WIDTH(8),
        fontFamily:'Roboto'
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center',
    },
    images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius:150/2,
        marginHorizontal: 3,
    },
    btnParentSection: {
        alignItems: 'center',
        justifyContent:'center',
        margin:WIDTH(1),
        flexDirection:'row'
    },
    btnSection: {
        width: 225,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10,
    },
    inputsView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    input: {
        marginTop: '5%',
        alignSelf: 'center',
        width: '70%',
        borderBottomWidth: WIDTH(0.2),
        fontSize: WIDTH(4.5)
    },
    text:{
        marginTop: '5%',
        alignSelf: 'center',
        fontSize: WIDTH(4.5)
    },
    icon: {
        marginTop:WIDTH(3),
        marginRight:WIDTH(3)
    },
    icon1: {
        width: WIDTH(8),
        height: WIDTH(8),
        marginTop:WIDTH(3),
        marginRight:WIDTH(3)
    },
    buttonStyle: {
        backgroundColor: colYellowMain,
        borderColor: colYellowMain,
        padding:10,
        width: WIDTH(40),
        height: WIDTH(15),
        borderWidth: WIDTH(1),
        borderRadius: WIDTH(2),
        alignItems:'center',
        margin:WIDTH(3)
    },
    buttonText: {
        fontSize: 20,
        color: colBlack,
    },
    pwText:{
        alignSelf:'center',
        color: colBlack,
        textDecorationLine:'underline',
        fontSize:WIDTH(4.5),
        margin:WIDTH(3)
    }
})

export default ProfileModal
