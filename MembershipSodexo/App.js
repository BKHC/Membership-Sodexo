import React, {Component} from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Button, PixelRatio, Dimensions, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
//import LogInScreen from './src/auth/login';
//import SignUpScreen from './src/auth/signup'; //not yet created
import HomeScreen from './src/home/home';

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

export default class SignInScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  postData(url = ``, data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses response to JSON
    }


  signin () {
    if (this.state.email == '' || this.state.password == ''){
      alert('Email or password cannot be blank!');
    }
    else {
      //postData(`https://i.cs.hku.hk/~wyvying/test.php`, {email: this.state.email, password: this.state.password})
      fetch(`https://i.cs.hku.hk/~wyvying/test.php`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify({email: this.state.email, password: this.state.password}), // body data type must match "Content-Type" header
      })
        .then((data) => {
          alert(JSON.stringify(data));
          /***
          if (data.state == 'success'){ // login success
            AsyncStorage.setItem('userToken', this.state.email);
            this.props.navigation.navigate('App');
          } else { // wrong email or password
            alert('Wrong email or password!');
          }
          ***/
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
      }
    }


  lose (){
    this.ref.eamil.blur();
    this.ref.password.blur();
    alert("Roy!!!");
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="position" enabled>
      <ImageBackground source={require('./assets/loginBackground.jpg')} onPress={this.lose.bind(this)} style={{width: '100%', height: '100%'}}>
        <View style={{flex: 0.2}}/>
        <View style={{flex: 0.3}}>
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
        </View>
        <View style={{flex: 0.08}}/>
        <View style={{flex: 0.3}}>
          <View style={{justifyContent: 'center', alignItems:'center'}}>
            <TextInput
              style={{
                width: normalize(260),
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                borderRadius: normalize(10),
                padding: normalize(13),
                color:'white',
              }}
              placeholder="電郵"
              placeholderTextColor="grey"
              ref="email"
              onChangeText={(email) => this.setState({email})}
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
              ref="password"
              onChangeText={(password) => this.setState({password})}
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
              marginLeft: getScreenWidth()/2 - normalize(260)/2
            }}
            onPress= {this.signin.bind(this)}
          >
            <Text style={{color:'white',textAlign: 'center', fontFamily:'Helvetica Neue',fontSize:normalize(12), marginTop:3}}>登入</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            position:'absolute',
            bottom:getScreenWidth()/2 - normalize(260)/2,
            left:getScreenWidth()/2 - normalize(260)/2,
            fontFamily:'Helvetica Neue',
            color:'white',
            fontSize:normalize(10),
            shadowOffset:{ width: 2, height: 2, },
            shadowColor: 'black',
            shadowOpacity: 0.4,
          }}
        >沒有帳號？立即註冊！</Text>
        <Text
          style={{
            position:'absolute',
            bottom:getScreenWidth()/2 - normalize(260)/2,
            right:getScreenWidth()/2 - normalize(260)/2,
            fontFamily:'Helvetica Neue',
            color:'white',
            fontSize:normalize(10),
            shadowOffset:{ width: 2, height: 2, },
            shadowColor: 'black',
            shadowOpacity: 0.4,
          }}
        >關於我們</Text>
      </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
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
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

/***
const AppStack = createStackNavigator({ Home: LogInScreen});
const AuthStack = createStackNavigator({ SignIn: LogInScreen }); //SignUp: SignUpScreen

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
***/

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
