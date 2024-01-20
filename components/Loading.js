import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { styles, theme } from '../theme';
const {width, height} =  Dimensions.get('window');

export default function Loading() {
  return (
    <View style={{height, width}} className="absolute flex-row justify-center items-center">
        <Progress.CircleSnail thickness={8} size={120} color={theme.background} />
    </View>
  )
}