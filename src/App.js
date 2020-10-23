import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import SplashScreen from 'react-native-splash-screen'
import HomeScreen from "./Screens/Home";
import SignUpScreen from './Screens/SignUp'
import SignInScreen from "./Screens/SignIn";
import NoInternet from "./Components/Common/NoInternet";
import QuizScreen from './Screens/Quiz'
import RecommendationScreen from './Screens/Recommendation'
import ChangePasswordScreen from './Components/Common/ChangePassword';
import ForgotPasswordScreen from './Components/Common/ForgotPassword';
import Store from './Redux/Store'
import { Provider } from 'react-redux'

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
                name = "Quiz" component = {QuizScreen}/>
            <Stack.Screen
                name = "Recommendation" component = {RecommendationScreen}/>
            <Stack.Screen
                name = "ChangePassword" component = {ChangePasswordScreen}/>
            <Stack.Screen
                name = "ForgotPassword" component = {ForgotPasswordScreen}/>
        </Stack.Navigator>
    )
}

function App() {

useEffect(()=>{
    SplashScreen.hide();
},[]);

    return (
        <Provider store={Store}>
            <NavigationContainer ref={navigationRef}>  
                <StatusBar translucent={true} backgroundColor='transparent' />  
                <NavigationStack/>
                <NoInternet/>
            </NavigationContainer>
        </Provider>
    )
}

export default App
