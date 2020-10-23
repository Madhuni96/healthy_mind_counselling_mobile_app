import React,{useState} from 'react'
import { View, StyleSheet, Image, Text,SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AgeIcon, ImgIcon } from '../../Constants/Imports';
import { colBlack, colYellowMain } from '../../Constants/Colors'
import { WIDTH } from "../../Constants/Sizes";
import { save_user_action } from '../../Redux';
import { useSelector, useDispatch } from 'react-redux'

function SignUpComponents() {

    const dispatch = useDispatch();
    const user_state = useSelector(state => state.user)
    const { userLoading, userError, userMessage } = user_state;

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [age,setAge] = useState('')
    const [nic,setNic] = useState('')
    const [phone,setPhone] = useState('')
    const [gender,setGender] = useState('Male');
    const [type,setType] = useState('Patient');
    const [imgData,setImgData] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpassword,setConfirmpassword] = useState('')

    var radio_gender = [
        {label:'Male',value:0},
        {label:'Female',value:1}]
    var radio_type = [
        {label:'Patient',value:0},
        {label:'Counsellor',value:1}]

    const genderFunction = (value) =>{
        if(value === 0){
            setGender('Male')
        }else{
            setGender('Female')
        }
    }
    const typeFunction = (value) =>{
        if(value === 0){
            setType('Patient')
        }else{
            setGender('Counsellor')
        }
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

  const renderImage = () => {
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

  const payload = {
    age: age,
    email: email,
    gender: gender,
    nic: nic,
    password: password,
    phone: phone,
    state: "Offline",
    type: type,
    username: username
  }

  const signupMethod = () => {
    if(username && email && age && nic && phone && password && confirmpassword){
        dispatch(save_user_action(payload))
        if(userError){
            alert(userError.data)
        }
    }else if(username === ''){
        alert("Username field is empty!")
    }else if(email === ''){
        alert("Email field is empty!")
    }else if(age === ''){
        alert("Age field is empty!")
    }else if(nic === ''){
        alert("NIC field is empty!")
    }else if(phone === ''){
        alert("Phone field is empty!")
    }else if(password === ''){
        alert("Password field is empty!")
    }else if(confirmpassword === ''){
        alert("Password field is empty!")
    }else if(confirmpassword === password){
        alert("Password and Confirm Password is not matched!")
    }
  }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <Text style={styles.titleText}>Sign Up</Text>
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
            <View style={styles.inputsView}>
                <Icon name="user" size={30} color="#000000" style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    textContentType='username'
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Enter User Name"/>
            </View>
            <View style={styles.inputsView}>
                <Icon name="at" size={30} color="#000000" style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    textContentType='emailAddress'
                    onChangeText={(text) => setEmail(text)}
                    keyboardType='email-address'
                    placeholder="Enter Email"/>
            </View>
            <View style={styles.inputsView}>
                <Image
                    source={AgeIcon}
                    style={styles.icon1}/>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={(text) => setAge(text)}
                    placeholder="Enter Age"/>
            </View>
            <View style={styles.inputsView}>
                <Icon name="id-card" size={30} color="#000000" style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setNic(text)}
                    placeholder="Enter NIC"/>
            </View>
            <View style={styles.inputsView}>
                <Icon name="phone" size={30} color="#000000" style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    keyboardType='phone-pad'
                    onChangeText={(text) => setPhone(text)}
                    textContentType='telephoneNumber'
                    placeholder="Enter Phone No."/>
            </View>
            <View style={styles.radioView}>
                <View style={styles.radioBtnView}>
                    <Text style={styles.radioViewText}>Gender</Text>
                    <RadioForm
                        radio_props={radio_gender}
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
                <View style={styles.radioBtnView}>
                    <Text style={styles.radioViewText}>Type</Text>
                    <RadioForm
                        radio_props={radio_type}
                        initial={0}
                        onPress={(value)=>{typeFunction(value)}}
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
            <View style={styles.inputsView}>
                <Icon name="lock" size={30} color="#000000" style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    textContentType='password'
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Enter Password"/>
            </View>
            <View style={styles.inputsView}>
                <Icon name="lock" size={30} color="#000000" style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    textContentType='password'
                    onChangeText={(text) => setConfirmpassword(text)}
                    placeholder="Enter Confirm Password"/>
            </View>
            {userLoading && (
                <View>
                    <ActivityIndicator size="small" color="#000000"/>
                </View>
            )}
            <View style={{alignSelf:'center'}}>
                <TouchableOpacity onPress={()=>{signupMethod()}}>
                        <View style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                            </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    scrollView:{
        marginHorizontal: 20,
    },
    titleText:{
        alignSelf:'center',
        fontSize:WIDTH(8),
        fontFamily:'Roboto'
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
    radioView:{
        flexDirection:'row',
        alignSelf:'center',
        margin:WIDTH(3)
    },
    radioBtnView:{
        marginLeft:WIDTH(5),
        marginRight:WIDTH(5),
        marginBottom:WIDTH(-8)
    },
    radioViewText:{
        fontSize:WIDTH(4.5)
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
})

export default SignUpComponents
