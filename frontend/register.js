/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Alert, KeyboardAvoidingView, TouchableOpacity, Button, PixelRatio, Dimensions, TextInput, ImageBackground, Image, Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

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

type Props = {};
export default class App extends Component<Props> {

  render() {
    return (
      <KeyboardAvoidingView behavior="position" enabled>
      <ImageBackground source={require('./assets/loginBackground.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
          <View style={{justifyContent: 'center', alignItems:'center',shadowOffset:{ width: 2, height: 2, },shadowColor: 'black',shadowOpacity: 0.3,}}>
            <Image
              source={require('./assets/sodexoLogo.png')}
              style={{
                width: normalize(170),
                height: normalize(55),
              }}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              fontSize:normalize(46),
              color:'white',
              fontFamily:'Helvetica Neue',
              shadowOffset:{ width: 2, height: 2, },
              shadowColor: 'black',
              shadowOpacity: 0.4,
            }}
          >食盡HKU</Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize:normalize(20),
              color:'white',
              fontFamily:'Helvetica Neue',
              shadowOffset:{ width: 2, height: 2, },
              shadowColor: 'black',
              shadowOpacity: 0.6,
              marginTop: -5,
            }}
          >多款菜式 任君選擇</Text>

          <View style={{justifyContent: 'center', alignItems:'center', marginTop:20}}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
              }}
            >
              <TextInput
                style={{
                  width: normalize(100),
                  backgroundColor: 'rgba(52, 52, 52, 0.8)',
                  borderRadius: normalize(10),
                  padding: normalize(13),
                  marginTop: 10,
                  color:'white',
                }}
                placeholder="姓"
                placeholderTextColor="grey"
              />
              <TextInput
                style={{
                  width: normalize(150),
                  marginLeft: 10,
                  backgroundColor: 'rgba(52, 52, 52, 0.8)',
                  borderRadius: normalize(10),
                  padding: normalize(13),
                  marginTop: 10,
                  color:'white',
                }}
                placeholder="名"
                placeholderTextColor="grey"
              />
            </View>
            <TextInput
              style={{
                width: normalize(260),
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                borderRadius: normalize(10),
                padding: normalize(13),
                marginTop: 10,
                color:'white',
              }}
              placeholder="電話號碼"
              placeholderTextColor="grey"
            />
            <TextInput
              style={{
                width: normalize(260),
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                borderRadius: normalize(10),
                padding: normalize(13),
                marginTop: 10,
                color:'white',
              }}
              placeholder="電郵"
              placeholderTextColor="grey"
            />
            <TextInput
              style={{
                width: normalize(260),
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                borderRadius: normalize(10),
                padding: normalize(13),
                marginTop: 10,
                color:'white',
              }}
              placeholder="密碼"
              placeholderTextColor="grey"
              secureTextEntry={true}
            />
            <TextInput
              style={{
                width: normalize(260),
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                borderRadius: normalize(10),
                padding: normalize(13),
                marginTop: 10,
                color:'white',
              }}
              placeholder="重覆密碼"
              placeholderTextColor="grey"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor:'#293896',
              height: normalize(42),
              width: normalize(260),
              borderRadius: normalize(40),
              padding: normalize(10),
              marginTop: 15,
            }}
          >
            <Text style={{color:'white',textAlign: 'center', fontFamily:'Helvetica Neue',fontSize:normalize(12), marginTop:3}}>註冊</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
