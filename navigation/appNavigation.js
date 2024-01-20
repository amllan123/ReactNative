import React from "react";
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
const stack = createNativeStackNavigator()


export default  function AppNavigation(){
return(


    <NavigationContainer>
        <stack.Navigator>
            <stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen}/>
            <stack.Screen name="Search" options={{headerShown:false}} component={SearchScreen}/>
            <stack.Screen name="Movie" options={{headerShown:false}} component={MovieScreen}/>
            <stack.Screen name = "Person" options={{headerShown:false}} component={PersonScreen}/>
        </stack.Navigator>

    </NavigationContainer>
)



}