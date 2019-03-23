import React from 'react';
import { Alert, KeyboardAvoidingView, Platform, Button, PixelRatio, Dimensions, Text, View, Image, ImageBackground, TextInput,
  TouchableOpacity, AsyncStorage} from 'react-native';

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

  render() {
    return (
      <TouchableOpacity
                activeOpacity={1.0}
                onPress={this.blurTextInput.bind(this)}
                >
      <KeyboardAvoidingView behavior="position" enabled>
      <ImageBackground source={require('../../assets/loginBackground.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={{backgroundColor: 'rgba(255, 153, 204, 1)',flex: 1,justifyContent: 'center',alignItems: 'center'}}>
        <View style={{justifyContent: 'center', alignItems:'center',shadowOffset:{ width: 2, height: 2, },shadowColor: 'black',shadowOpacity: 0.3,}}>
          <Image
            source={require('../../assets/sodexoLogo.png')}
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
        >iHKU</Text>
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
        >有咩意見 任君評論</Text>
        <View style={{justifyContent: 'center', alignItems:'center'}}>
            <TextInput
              style={{
                marginTop: 40,
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
          onPress= {() => this.props.navigation.navigate('SignUp')}
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
      </TouchableOpacity>
    );
  }

  blurTextInput (){
    this.refs.email.blur();
    this.refs.password.blur();
  };

  signin = async () => {
    this.props.navigation.navigate('App');
    if (this.state.email == '' || this.state.password == ''){
      alert('Email or password cannot be blank!');
    }
    else {
      //postData(`https://i.cs.hku.hk/~wyvying/test.php`, {email: this.state.email, password: this.state.password})
      /***
      fetch(`https://i.cs.hku.hk/~wyvying/test.php`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify({email: this.state.email, password: this.state.password}), // body data type must match "Content-Type" header
      })
      //.then(response => response.json()); // parses response to JSON
        .then((data) => {
          //alert(JSON.stringify(data));
          if (data.state == 'success'){ // login success
            await AsyncStorage.setItem('userToken', this.state.email);
            this.props.navigation.navigate('App');
          } else { // wrong email or password
            alert('Wrong email or password!');
          }

        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
        ***/
      }
    };
}
