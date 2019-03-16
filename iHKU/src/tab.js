import React from 'react';
import {Alert, KeyboardAvoidingView, TouchableOpacity, Button, PixelRatio, Dimensions, TextInput, ImageBackground, Image, Platform, StyleSheet, Text, View} from 'react-native';

// to normalize font size
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export function getScreenWidth(){
  return SCREEN_WIDTH
}
export function getScreenHeight(){
  return SCREEN_HEIGHT
}

export default class Tab extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <View
      style={{
        backgroundColor: 'rgba(248, 248, 248, 1)',
        width: getScreenWidth(),
        height: 65,
        position: 'absolute',
        bottom: 0,
        flex: 1,
        flexDirection: 'row',
        shadowOffset:{ width: 5, height: 5, },
        shadowColor: 'black',
        shadowOpacity: 0.3,
    }}
  >

      <View style={{width:getScreenWidth()/5}}>
        <Image
          source={require('./assets/account.png')}
          style={{
            width:22,
            height:22,
            marginLeft:(getScreenWidth()/5-22)/2,
            marginTop:15
        }}
      />
      <Text style={{textAlign: 'center', marginTop:5, fontSize:11}}>帳戶</Text>
    </View>
    <View style={{width:getScreenWidth()/5}}>
      <Image
        source={require('./assets/food.png')}
        style={{
            width:22,
            height:22,
            marginLeft:(getScreenWidth()/5-22)/2,
            marginTop:15
        }}
      />
      <Text style={{textAlign: 'center', marginTop:5, fontSize:11}}>餐廳</Text>
    </View>
    <View style={{width:getScreenWidth()/5}}>
      <Image
        source={require('./assets/hall_pink.png')}
        style={{
            width:22,
            height:22,
            marginLeft:(getScreenWidth()/5-22)/2,
            marginTop:15
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          marginTop: 5,
          fontSize: 11,
          color: 'rgba(229, 145, 211, 1)',
        }}>舍堂</Text>
    </View>
    <View style={{width:getScreenWidth()/5}}>
      <Image
        source={require('./assets/course.png')}
        style={{
            width:22,
            height:22,
            marginLeft:(getScreenWidth()/5-22)/2,
            marginTop:15,
        }}
      />
      <Text style={{textAlign: 'center', marginTop:5, fontSize:11}}>課程</Text>
    </View>
    <View style={{width:getScreenWidth()/5}}>
      <Image
        source={require('./assets/settings.png')}
        style={{
            width:22,
            height:22,
            marginLeft:(getScreenWidth()/5-22)/2,
            marginTop:15
        }}
      />
      <Text style={{textAlign: 'center', marginTop:5, fontSize:11}}>設定</Text>
    </View>
  </View>
);
}
}
