import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen'
import HomeScreen from "./Screens/Home";
import SignUpScreen from './Screens/SignUp'
import SignInScreen from "./Screens/SignIn";
import NoInternet from "./Components/Common/NoInternet";
import ChangePassword from './Components/Common/ChangePassword';
import ForgotPassword from './Components/Common/ForgotPassword';

const Stack = createStackNavigator();

function NavigationStack(){
    return(
        <Stack.Navigator initialRouteName = "SignIn" screenOptions={{
                headerShown: false,
            }}>
            
            <Stack.Screen
                name = "Home" component = {HomeScreen}/>
            <Stack.Screen
                name = "SignUp" component = {SignUpScreen}/>
            <Stack.Screen
                name = "SignIn" component = {SignInScreen}/>
            <Stack.Screen
                name = "ChangePassword" component = {ChangePassword}/>
            <Stack.Screen
                name = "ForgotPassword" component = {ForgotPassword}/>
        </Stack.Navigator>
    )
}

function App() {

useEffect(()=>{
    SplashScreen.hide();
},[]);

    return (
        <NavigationContainer>  
            <StatusBar translucent={true} backgroundColor='transparent' />  
            <NavigationStack/>
            <NoInternet/>
        </NavigationContainer>
    )
}

export default App
