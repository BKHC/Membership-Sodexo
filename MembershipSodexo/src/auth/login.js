import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';

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

class SignInScreen extends React.Component{
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

  _signin = async (){
    if (this.state.email = '' || this.state.password = ''){
      alert('Email or password cannot be blank!');
    }
    else {
      postData(`[to be confirm]`, {email: this.state.email, password: this.state.password})
        .then((data) => {
          console.log(JSON.stringify(data));
          if (data.state == 'success'){ // login success
            await AsyncStorage.setItem('userToken', this.state.email);
            this.props.navigation.navigate('App');
          } else { // wrong email or password
            alert('Wrong email or password!');
          }
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
      }
    }

  render() {
    return (
      <ImageBackground source={require('./assets/')} style={{width: '100%', height: '100%'}}>
      <View>
        <View>
          <Text>Membership Sodexo</Text>
          <Text>Earn Points and Redeem Awards!</Text>
        </View>
        <View>
          <TextInput placeholder='Username' onChangeText={(email) => this.setState({email})}/>
          <TextInput placeholder='Password' onChangeText={(password) => this.setState({password})}/>
          <TouchableOpacity onPress= {this._signin.bind(this)} title='Login'/>
        </View>
      </View>
      </ImageBackground>
    );
  }
}
