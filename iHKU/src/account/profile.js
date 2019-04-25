import React from 'react';
import { Alert, TouchableOpacity, PixelRatio, Dimensions, ImageBackground, Image,
  Text, Platform, View, ScrollView, RefreshControl, AsyncStorage} from 'react-native';
import FastImage from 'react-native-fast-image';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ""};
  }

  componentDidMount() {
    AsyncStorage.getItem('userID').then((value) => {
      fetch(`https://i.cs.hku.hk/~wyvying/php/get_nickname.php?UserID=${encodeURIComponent(parseInt(value))}`, {
          method: "GET",
      })
      .then(response => response.json()) // parses response to JSON
      .then((data) => {
          this.setState({username: data.username, userID: value});

        })
        .catch(error => console.error(error));
  });
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()}}>
          <View
            style={{
              height: 90,
              backgroundColor: 'rgba(255, 153, 204, 1)',
              width: getScreenWidth(),
              shadowOffset:{ width: 1, height: 1, },
              shadowColor: 'grey',
              shadowOpacity: 0.3,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize:18,
                marginTop:53,
                color: 'rgba(255, 255, 255, 1)',
                fontWeight: 'bold',
              }}
            >

            </Text>
          </View>
          <View
            style={{
              fontFamily:'Helvetica Neue',
              width:getScreenWidth(),
              backgroundColor: 'rgba(255, 153, 204, 1)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FastImage
                style={{width: 100, height: 100,}}
                source={{uri: `https://i.cs.hku.hk/~wyvying/iHKU/user_avatar/21.png`}}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <Text style={{color:'white', marginTop:20, marginBottom:4, fontSize:20}}>
              {this.state.username}
            </Text>
            <Text style={{color:'white', fontSize:12, marginBottom:20}}>
            </Text>
          </View>
          <ScrollView>
            <View style={{backgroundColor: 'rgba(255, 255, 255, 1)',marginTop: 4,}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyCommentList')}>
              <View
                style={{
                  fontFamily:'Helvetica Neue',
                  width:getScreenWidth(),
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  paddingTop: 20, paddingBottom:18,
                  paddingLeft:20,
                }}
              >
                <Text>我的發帖</Text>
              </View>
              </TouchableOpacity>
              <View
                style={{
                  height:1,
                  width:getScreenWidth()-40,
                  marginLeft:20,
                  backgroundColor: 'rgba(200, 200, 200, 1)',
                }}
              />
              <View
                style={{
                  fontFamily:'Helvetica Neue',
                  width:getScreenWidth(),
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  paddingTop: 20, paddingBottom:18,
                  paddingLeft:20,
                }}
              >
                <Text>追蹤的帖</Text>
              </View>
              <View
                style={{
                  height:1,
                  width:getScreenWidth()-40,
                  marginLeft:20,
                  backgroundColor: 'rgba(200, 200, 200, 1)',
                }}
              />
              <View
                style={{
                  fontFamily:'Helvetica Neue',
                  width:getScreenWidth(),
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  paddingTop: 20, paddingBottom:18,
                  paddingLeft:20,
                }}
              >
                <Text>搜尋紀錄</Text>
              </View>
            </View>
            <View style={{backgroundColor: 'rgba(255, 255, 255, 1)',marginTop: 4,}}>
              <View
                style={{
                  fontFamily:'Helvetica Neue',
                  width:getScreenWidth(),
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  paddingTop: 20, paddingBottom:18,
                  paddingLeft:20,
                }}
              >
                <Text>程式版本</Text>
              </View>
              <View
                style={{
                  height:1,
                  width:getScreenWidth()-40,
                  marginLeft:20,
                  backgroundColor: 'rgba(200, 200, 200, 1)',
                }}
              />
              <View
                style={{
                  fontFamily:'Helvetica Neue',
                  width:getScreenWidth(),
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  paddingTop: 20, paddingBottom:18,
                  paddingLeft:20,
                }}
              >
                <Text>製作團隊</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => this._signOut()}>
            <View style={{backgroundColor: 'rgba(255, 255, 255, 1)',marginTop: 4,}}>
              <View
                style={{
                  fontFamily:'Helvetica Neue',
                  width:getScreenWidth(),
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  paddingTop: 20, paddingBottom:18,
                  paddingLeft:20,
                }}
              >
                <Text>登出</Text>
              </View>
            </View>
            </TouchableOpacity>

          </ScrollView>
      </ImageBackground>
    );
  }

  _signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

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
