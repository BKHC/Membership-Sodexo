import React from 'react';
import { Alert, KeyboardAvoidingView, Platform, Button, PixelRatio, Dimensions, Text, View, Image, ImageBackground, TextInput,
  TouchableOpacity, AsyncStorage} from 'react-native';

  export default class SignUpScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = { nickname: '', email: '', password: '', repassword: '', disabled: true};
    }

    render() {
      return (
        <TouchableOpacity
                  activeOpacity={1.0}
                  onPress={this.blurTextInput.bind(this)}
                  >
        <KeyboardAvoidingView behavior="position" enabled>
        <View style={{ width: '100%', height: '100%'}}>
          <View style={{backgroundColor: 'rgba(255, 153, 204, 1)', flex: 1,justifyContent: 'center',alignItems: 'center'}}>
            <View style={{justifyContent: 'center', alignItems:'center',shadowOffset:{ width: 2, height: 2, },shadowColor: 'black',shadowOpacity: 0.3,}}>
              <Image
                source={require('../../assets/HKULogo.png')}
                style={{
                  width: normalize(80),
                  height: normalize(90.4),
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
            >講盡HKU</Text>
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

            <View style={{justifyContent: 'center', alignItems:'center', marginTop:20}}>
              <TextInput
                style={{
                  width: normalize(260),
                  backgroundColor: 'rgba(52, 52, 52, 0.8)',
                  borderRadius: normalize(10),
                  padding: normalize(13),
                  marginTop: 10,
                  color:'white',
                }}
                placeholder="暱稱"
                placeholderTextColor="grey"
                onChangeText={(nickname) => {
                  this.setState({nickname});
                  var etest = /^[a-z0-9](\.?[a-z0-9]){0,}@connect.hku\.hk$/;
                  if (etest.test(email) && this.state.password.length >=6 && this.state.password == this.state.repassword && nickname!="")
                    this.setState({disabled: false});
                  else
                    this.setState({disabled: true});
                }}
                ref="nickname"
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
                placeholder="電郵 (@hku.hk)"
                placeholderTextColor="grey"
                onChangeText={(email) => {
                  this.setState({email});
                  var etest = /^[a-z0-9](\.?[a-z0-9]){0,}@connect.hku\.hk$/;
                  if (etest.test(email) && this.state.password.length >=6 && this.state.password == this.state.repassword && this.state.nickname!="")
                    this.setState({disabled: false});
                  else
                    this.setState({disabled: true});
                }}
                ref="email"
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
                onChangeText={(password) => {
                  this.setState({password});
                  var etest = /^[a-z0-9](\.?[a-z0-9]){0,}@connect.hku\.hk$/;
                  if (etest.test(this.state.email) != "" && this.state.password.length >=6 && password == this.state.repassword && this.state.nickname!="")
                    this.setState({disabled: false});
                  else
                    this.setState({disabled: true});
                }}
                ref="password"
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
                placeholder="重覆密碼"
                placeholderTextColor="grey"
                secureTextEntry={true}
                onChangeText={(repassword) => {
                  this.setState({repassword});
                  var etest = /^[a-z0-9](\.?[a-z0-9]){0,}@connect.hku\.hk$/;
                  if (etest.test(this.state.email) && this.state.password.length >=6 && this.state.password == repassword && this.state.nickname!="")
                    this.setState({disabled: false});
                  else
                    this.setState({disabled: true});
                }}
                ref="repassword"
              />
            </View>
            <TouchableOpacity
            style={this.state.disabled ? {
              backgroundColor:'#172059',
              height: normalize(42),
              width: normalize(260),
              borderRadius: normalize(40),
              padding: normalize(10),
              marginTop: 15,
            } : {
              backgroundColor:'#293896',
              height: normalize(42),
              width: normalize(260),
              borderRadius: normalize(40),
              padding: normalize(10),
              marginTop: 15,
            }}
              onPress= {this.signup.bind(this)}
            >
              <Text style={{color:'white',textAlign: 'center', fontFamily:'Helvetica Neue',fontSize:normalize(12), marginTop:3}}>註冊</Text>
            </TouchableOpacity>
          </View>
        </View>
        </KeyboardAvoidingView>
        </TouchableOpacity>
      );
    }

    blurTextInput (){
      this.refs.nickname.blur();
      this.refs.email.blur();
      this.refs.password.blur();
      this.refs.repassword.blur();
    };

    signup = async () => {
        let body = new FormData();
        body.append('nickname', this.state.nickname);
        body.append('email', this.state.email);
        body.append('password', this.state.password);

        fetch(`https://i.cs.hku.hk/~wyvying/php/create_user.php`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              Accept: 'application/json',
              'Content-Type': "multipart/form-data",
            },
            body: body, // body data type must match "Content-Type" header
        })
          .then(response => response.json()) // parses response to JSON
          .then((data) => {
            if (data.state == 'success'){
              var email_name = this.state.email.split("@")[0];
              var link = 'https://thetutor.hk/iHKU_send_email.php?email=' + email_name;
              fetch(link);
              Alert.alert(
            'Please check your email for further authentication.',
            '',
            [
              {text: "OK", onPress: () => this.props.navigation.pop()
              },
            ],
            {cancelable: false},
          );
            } else { // wrong email or password
              alert('Email has been registered!');
            }
          }) // JSON-string from `response.json()` call
          .catch(error => console.error(error));
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
