/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {ScrollView, Alert, KeyboardAvoidingView, TouchableOpacity, Button, PixelRatio, Dimensions, TextInput, ImageBackground, Image, Platform, StyleSheet, Text, View} from 'react-native';

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
export default class Try extends Component<Props> {

  render() {
    return (
      <ImageBackground source={require('./assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()}}>

          <ScrollView>
            <View
              style={{
                fontFamily:'Helvetica Neue',
                width:getScreenWidth(),
                backgroundColor: 'rgba(255, 255, 255, 1)',
                paddingTop: 20, paddingBottom:18, paddingLeft:30, paddingRight:30,
                marginTop: 4,
              }}
            >
              <View style={{flexDirection:'row', justifyContent : 'space-between' }} >
                <View style={{flexDirection:'row',}}>
                  <Text
                    style={{
                      fontSize:normalize(10),
                      color: 'rgba(255, 153, 204, 1)',
                      fontWeight: 'bold',
                    }}
                  >大口仔</Text>
                  <Text
                    style={{
                      fontSize:normalize(10),
                    }}
                  > - 17:30 2 Mar 2019</Text>
                </View>
                <View style={{flexDirection:'row', textAlign:'right', }}>


                </View>
              </View>

              <View style={{flexDirection:'row', justifyContent : 'space-between'}} >
                <View style={{flexDirection:'row'}}>
                  <Image
                      style={{width: 45, height: 45, marginTop:10, marginRight:10, }}
                      source={require('./assets/happy.png')}
                  />
                  <View style={{flexDirection:'column',}} >
                    <Text
                      style={{
                        fontSize:normalize(12),
                        marginTop:5,
                        marginBottom:3,
                      }}
                    >RC真係好正 唔仙唔chur</Text>
                    <View style={{flexDirection:'row',}} >
                      <Text
                        style={{
                          fontSize:normalize(9),
                        }}
                      >運動:</Text>
                      <View style={{flexDirection:'row',}} >
                        <Text
                          style={{
                            color: 'rgba(255, 153, 204, 1)',
                            marginLeft: 3,
                          }}
                        >★</Text>
                        <Text
                          style={{
                            color: 'rgba(100, 100, 100, 1)',
                          }}
                        >☆☆☆☆</Text>
                      </View>
                      <Text style={{marginLeft:10, fontSize:normalize(9),}}>文化:</Text>
                      <View style={{flexDirection:'row',}} >
                        <Text
                          style={{
                            color: 'rgba(255, 153, 204, 1)',
                            marginLeft: 3,
                          }}
                        >★★★</Text>
                        <Text
                          style={{
                            color: 'rgba(100, 100, 100, 1)',
                          }}
                        >☆☆</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:'row',}} >
                      <Text
                        style={{
                          fontSize:normalize(9),
                        }}
                      >環境:</Text>
                      <View style={{flexDirection:'row',}} >
                        <Text
                          style={{
                            color: 'rgba(255, 153, 204, 1)',
                            marginLeft: 3,
                          }}
                        >★★</Text>
                        <Text
                          style={{
                            color: 'rgba(100, 100, 100, 1)',
                          }}
                        >☆☆☆</Text>
                      </View>
                      <Text style={{marginLeft:10, fontSize:normalize(9),}}>仙制:</Text>
                      <View style={{flexDirection:'row',}} >
                        <Text
                          style={{
                            color: 'rgba(255, 153, 204, 1)',
                            marginLeft: 3,
                          }}
                        >★★★</Text>
                        <Text
                          style={{
                            color: 'rgba(100, 100, 100, 1)',
                          }}
                        >☆☆</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{textAlign:'right',}}>
                  <View
                    style={{
                      flexDirection:'row',
                      borderRadius: 4,
                      borderWidth: 0.5,
                      borderColor: 'rgba(255, 153, 204, 1)',
                      padding: 4,
                    }}>
                    <Image
                        style={{width: 12, height: 12, marginRight:2, marginTop:2, marginLeft:2}}
                        source={require('./assets/thumbUp.png')}
                    />
                    <Text>33 </Text>
                  </View>
                  <View
                    style={{
                      flexDirection:'row', marginTop:5,
                      borderRadius: 4,
                      borderWidth: 0.5,
                      borderColor: 'rgba(120, 120, 120, 1)',
                      padding: 4,
                    }}>
                    <Image
                      style={{width: 12, height: 12, marginRight:2, marginTop:2, marginLeft:2}}
                      source={require('./assets/thumbDown.png')}
                    />
                    <Text>43 </Text>
                  </View>
                </View>
              </View>
            </View>

          </ScrollView>


          <View
            style={{
                backgroundColor: 'rgba(255, 153, 204, 1)',
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
              <Text style={{textAlign: 'center', marginTop:5, fontSize:11, color: 'white'}}>帳戶</Text>
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
              <Text style={{textAlign: 'center', marginTop:5, fontSize:11, color: 'white'}}>餐廳</Text>
            </View>
            <View style={{width:getScreenWidth()/5}}>
              <Image
                source={require('./assets/hall.png')}
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
                  color: 'rgba(225, 255, 255, 1)',
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
              <Text style={{textAlign: 'center', marginTop:5, fontSize:11, color: 'white'}}>課程</Text>
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
              <Text style={{textAlign: 'center', marginTop:5, fontSize:11, color: 'white'}}>設定</Text>
            </View>
          </View>
      </ImageBackground>
    );
  }
}
