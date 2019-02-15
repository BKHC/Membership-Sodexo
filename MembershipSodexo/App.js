import React from 'react';
import { Alert, KeyboardAvoidingView, Platform, Button, PixelRatio, Dimensions, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import SignInScreen from './src/auth/login';
//import SignUpScreen from './src/auth/signup'; //not yet created
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

const AppStack = createStackNavigator({ Home: HomeScreen});
const AuthStack = createStackNavigator(
  { SignIn: SignInScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
); //SignUp: SignUpScreen

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
