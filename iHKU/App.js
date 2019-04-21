import React from 'react';
import { Alert, KeyboardAvoidingView, Platform, Button, PixelRatio, Dimensions, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator, createAppContainer, BottomTabBar } from 'react-navigation';
import SignInScreen from './src/auth/login';
import SignUpScreen from './src/auth/signup';

import NewsFeed from './src/news/feed';
import NewsComment from './src/news/comment';

import HallComment from './src/hall/hallcomment';
import HallList from './src/hall/hallList';
import Comment from './src/hall/comment';
import PostComment from './src/hall/postcomment';

import CanList from './src/canteen/canlist';
import CanCommentList from './src/canteen/cclist';
import CanComment from './src/canteen/ccomment';
import CanPostComment from './src/canteen/cpost';

import FacList from './src/course/faclist';
import CouCommentList from './src/course/cclist';
import CouComment from './src/course/ccomment';
import CouPostComment from './src/course/cpost';

import Profile from './src/account/profile';

const NewsStack = createStackNavigator({

  News: NewsFeed,
  Comment: NewsComment,
  //CanComment: CanComment,
  //HallComment: HallComment,
},
  {
      initialRouteName: 'News',
      headerLayoutPreset: 'center',
      /* The header config from HomeScreen is now here */
      defaultNavigationOptions: {
        title: '動態',
        headerStyle: {
          backgroundColor: 'rgba(255, 153, 204, 1)',
        },
        headerTintColor: 'rgba(255, 255, 255, 1)',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    }
  });

const RestStack = createStackNavigator({

  CanList: CanList,
  CanCommentList: CanCommentList,
  CanComment: CanComment,
  CanPostComment: CanPostComment,
},
  {
      initialRouteName: 'CanList',
      headerLayoutPreset: 'center',
      /* The header config from HomeScreen is now here */
      defaultNavigationOptions: {
        title: '餐廳',
        headerStyle: {
          backgroundColor: 'rgba(255, 153, 204, 1)',
        },
        headerTintColor: 'rgba(255, 255, 255, 1)',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    }
  });

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

const CourseStack = createStackNavigator({

    FacList: FacList,
    CouCommentList: CouCommentList,
    CouComment: CouComment,
    CouPostComment: CouPostComment,
  },
    {
        initialRouteName: 'FacList',
        headerLayoutPreset: 'center',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
          title: '課程',
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
  動態: NewsStack,
  餐廳: RestStack,
  舍堂: HallStack,
  課程: CourseStack,
  帳戶: Profile,

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
        } else if (routeName === '動態') {
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
                source={require('./assets/news_pink.png')}
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
              }}>動態</Text>
          </View>
          );
        }
          else {
            return(
              <View style={{width:getScreenWidth()/5}}>
                <Image
                  source={require('./assets/news.png')}
                  style={{
                    width:22,
                    height:22,
                    marginLeft:(getScreenWidth()/5-22)/2,
                    marginTop:15
                }}
              />
              <Text style={{textAlign: 'center', marginTop:5, fontSize:11, color: 'white'}}>動態</Text>
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
                source={require('./assets/food_pink.png')}
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
                source={require('./assets/course_pink.png')}
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
              }}>課程</Text>
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
                source={require('./assets/account_pink.png')}
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
        }
      },
    }),

    tabBarComponent: props =>
      <TabBarComponent
        {...props}
        style={{
          backgroundColor: 'rgba(255, 153, 204, 1)',
          width: getScreenWidth(),
          height: 60,
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

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export function getScreenWidth(){
  return SCREEN_WIDTH
}
export function getScreenHeight(){
  return SCREEN_HEIGHT
}
