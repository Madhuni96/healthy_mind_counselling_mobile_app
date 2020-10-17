import React,{useState} from 'react'
import { View, StyleSheet, Image, Text,SafeAreaView, ScrollView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserIcon, PwIcon, EmailIcon, AgeIcon, NicIcon, PhoneIcon, ImgIcon, CameraIcon, GalleryIcon } from '../../Constants/Imports';
import { colBlack, colYellowMain } from '../../Constants/Colors'
import { WIDTH } from "../../Constants/Sizes";

function SignUpComponents() {

    const [gender,setGender] = useState('Male');
    const [type,setType] = useState('Patient');
    const [imgData,setImgData] = useState('')

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
                <Image source={CameraIcon} style={styles.icon}/>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={()=>launchImageLibrary()}
                >
                <Image source={GalleryIcon} style={styles.icon}/>
              </TouchableOpacity>
              </View>
            <View style={styles.inputsView}>
                <Image
                    source={UserIcon}
                    style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    textContentType='username'
                    placeholder="Enter User Name"/>
            </View>
            <View style={styles.inputsView}>
                <Image
                    source={EmailIcon}
                    style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    placeholder="Enter Email"/>
            </View>
            <View style={styles.inputsView}>
                <Image
                    source={AgeIcon}
                    style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder="Enter Age"/>
            </View>
            <View style={styles.inputsView}>
                <Image
                    source={NicIcon}
                    style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    placeholder="Enter NIC"/>
            </View>
            <View style={styles.inputsView}>
                <Image
                    source={PhoneIcon}
                    style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    keyboardType='phone-pad'
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
                <Image
                    source={PwIcon}
                    style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    textContentType='password'
                    placeholder="Enter Password"/>
            </View>
            <View style={styles.inputsView}>
                <Image
                    source={PwIcon}
                    style={styles.icon}/>
                <TextInput
                    style={styles.input}
                    textContentType='password'
                    placeholder="Enter Confirm Password"/>
            </View>
            <View style={{alignSelf:'center'}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}}>
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
        width: WIDTH(7),
        height: WIDTH(7),
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
