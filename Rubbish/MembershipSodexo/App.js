import React from 'react';
import { Alert, KeyboardAvoidingView, Platform, Button, PixelRatio, Dimensions, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import SignInScreen from './src/auth/login';
import SignUpScreen from './src/auth/signup';
import HomeScreen from './src/home/home';

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

const HomeStack = createStackNavigator({ Home: HomeScreen, });
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

const TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  //NewsFeed: NewsFeedStack,
  //MyPoints: MyPointsStack,
  //MyCoupon: MyCouponStack,
  //Profile: ProfileStack,
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
