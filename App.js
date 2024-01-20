import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['ViewPropTypes'])



import { StyleSheet } from 'react-native';
import { SafeAreaView, Text, View } from 'react-native';
import AppNavigation from './navigation/appNavigation';

export default function App() {
  return (

  <>

     <AppNavigation/>
  
 
  </>
  );
}

