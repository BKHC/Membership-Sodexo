import React from 'react';
import { Alert, KeyboardAvoidingView, Platform, Button, PixelRatio, Dimensions, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator, createAppContainer, BottomTabBar } from 'react-navigation';
import SignInScreen from './src/auth/login';
import SignUpScreen from './src/auth/signup';
import HallComment from './src/hall/hallcomment';
import HallList from './src/hall/hallList';
import Comment from './src/hall/comment';
import PostComment from './src/hall/postcomment';
import Try from './try';

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

// Check if user logged in, aka. loading screen
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const TryStack = createStackNavigator({ Home: Try, },);
const HallStack = createStackNavigator({
  //Home: HomeScreen,
  HallList: HallList,
  HallComment: HallComment,
  Comment: Comment,
  PostComment: PostComment,
},
  {
      initialRouteName: 'HallList',
      headerLayoutPreset: 'center',
      /* The header config from HomeScreen is now here */
      defaultNavigationOptions: {
        title: '舍堂',
        headerStyle: {
          backgroundColor: 'rgba(255, 153, 204, 1)',
        },
        headerTintColor: 'rgba(255, 255, 255, 1)',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    }
  });
const AuthStack = createStackNavigator(
  { SignIn: SignInScreen,
    SignUp: SignUpScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const TabBarComponent = (props) => (<BottomTabBar {...props} />);

const TabNavigator = createBottomTabNavigator({
  帳戶: HallStack,
  餐廳: TryStack,
  舍堂: HallStack,
  課程: HallStack,
  設定: HallStack,

},
{
    initialRouteName: '舍堂',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        if (routeName === '舍堂') {
          if (focused){
          return(
            <View
              style={{
                width:getScreenWidth()/5,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderRadius: 8,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 153, 204, 1)',
              }}
            >
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
                color: 'rgba(255, 153, 204, 1)',
              }}>舍堂</Text>
          </View>
          );
        }
          else {
            return(
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
              <Text style={{textAlign: 'center', marginTop:5, fontSize:11, color: 'white'}}>舍堂</Text>
            </View>
            );
          }
        } else if (routeName === '帳戶') {
          if (focused){
          return(
            <View
              style={{
                width:getScreenWidth()/5,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderRadius: 8,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 153, 204, 1)',
              }}
            >
              <Image
                source={require('./assets/account.png')}
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
                color: 'rgba(255, 153, 204, 1)',
              }}>帳戶</Text>
          </View>
          );
        }
          else {
            return(
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
            );
          }
        } else if (routeName === '餐廳') {
          if (focused){
          return(
            <View
              style={{
                width:getScreenWidth()/5,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderRadius: 8,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 153, 204, 1)',
              }}
            >
              <Image
                source={require('./assets/food.png')}
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
                color: 'rgba(255, 153, 204, 1)',
              }}>餐廳</Text>
          </View>
          );
        }
          else {
            return(
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
            );
          }
        } else if (routeName === '課程') {
          if (focused){
          return(
            <View
              style={{
                width:getScreenWidth()/5,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderRadius: 8,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 153, 204, 1)',
              }}
            >
              <Image
                source={require('./assets/course.png')}
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
                color: 'rgba(255, 153, 204, 1)',
              }}>舍堂</Text>
          </View>
          );
        }
          else {
            return(
              <View style={{width:getScreenWidth()/5}}>
                <Image
                  source={require('./assets/course.png')}
                  style={{
                    width:22,
                    height:22,
                    marginLeft:(getScreenWidth()/5-22)/2,
                    marginTop:15
                }}
              />
              <Text style={{textAlign: 'center', marginTop:5, fontSize:11, color: 'white'}}>課程</Text>
            </View>
            );
          }
        } else {
          if (focused){
          return(
            <View
              style={{
                width:getScreenWidth()/5,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderRadius: 8,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 153, 204, 1)',
              }}
            >
              <Image
                source={require('./assets/settings.png')}
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
                color: 'rgba(255, 153, 204, 1)',
              }}>設定</Text>
          </View>
          );
        }
          else {
            return(
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
            );
          }
        }
      },
    }),

    tabBarComponent: props =>
      <TabBarComponent
        {...props}
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
      />,

    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'rgba(255, 153, 204, 1)',
      inactiveTintColor: 'white',
    },
  });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: TabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
