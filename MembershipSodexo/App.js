import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, AsyncStorage, StatusBar} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import LogInScreen from './src/auth/login';
import SignUpScreen from './src/auth/singup'; //not yet created
import HomeScreen from './src/home/home';

const AppStack = createStackNavigator({ Home: HomeScreen});
const AuthStack = createStackNavigator({ SignIn: LogInScreen, SignUp: SignUpScreen });
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
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    fontSize: 30,
    textAlign: 'center',
  },
});
