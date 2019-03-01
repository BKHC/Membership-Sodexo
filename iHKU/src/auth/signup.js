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

  export default class SignUpScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = { lastname: '', firstname: '', phoneNo: '', email: '', password: '', repassword: ''};
    }

    render() {
      return (
        <TouchableOpacity
                  activeOpacity={1.0}
                  onPress={this.blurTextInput.bind(this)}
                  >
        <KeyboardAvoidingView behavior="position" enabled>
        <ImageBackground source={require('../../assets/loginBackground.jpg')} style={{width: '100%', height: '100%'}}>
          <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
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

            <View style={{justifyContent: 'center', alignItems:'center', marginTop:20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                }}
              >
                <TextInput
                  style={{
                    width: normalize(100),
                    backgroundColor: 'rgba(52, 52, 52, 0.8)',
                    borderRadius: normalize(10),
                    padding: normalize(13),
                    marginTop: 10,
                    color:'white',
                  }}
                  placeholder="姓"
                  placeholderTextColor="grey"
                  onChangeText={(lastname) => this.setState({lastname})}
                  ref="lastname"
                />
                <TextInput
                  style={{
                    width: normalize(150),
                    marginLeft: 10,
                    backgroundColor: 'rgba(52, 52, 52, 0.8)',
                    borderRadius: normalize(10),
                    padding: normalize(13),
                    marginTop: 10,
                    color:'white',
                  }}
                  placeholder="名"
                  placeholderTextColor="grey"
                  onChangeText={(firstname) => this.setState({firstname})}
                  ref="firstname"
                />
              </View>
              <TextInput
                style={{
                  width: normalize(260),
                  backgroundColor: 'rgba(52, 52, 52, 0.8)',
                  borderRadius: normalize(10),
                  padding: normalize(13),
                  marginTop: 10,
                  color:'white',
                }}
                placeholder="電話號碼"
                placeholderTextColor="grey"
                onChangeText={(phoneNo) => this.setState({phoneNo})}
                ref="phoneNo"
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
                placeholder="電郵"
                placeholderTextColor="grey"
                onChangeText={(email) => this.setState({email})}
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
                onChangeText={(password) => this.setState({password})}
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
                onChangeText={(repassword) => this.setState({repassword})}
                ref="repassword"
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
              onPress= {this.signup.bind(this)}
            >
              <Text style={{color:'white',textAlign: 'center', fontFamily:'Helvetica Neue',fontSize:normalize(12), marginTop:3}}>註冊</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        </KeyboardAvoidingView>
        </TouchableOpacity>
      );
    }

    blurTextInput (){
      this.refs.lastname.blur();
      this.refs.firstname.blur();
      this.refs.phoneNo.blur();
      this.refs.email.blur();
      this.refs.password.blur();
      this.refs.repassword.blur();
    };

    signup = async () => {
      //this.props.navigation.navigate('App');
      if (this.state.password != this.state.repassword ){
        alert('The passwords are not the same!');
      }
      if (this.state.lastname == '' || this.state.firstname == '' || this.state.phoneNo == '' ||
      this.state.email == '' || this.state.password == ''){
        alert('Please make sure to fill all the blanks.');
      }
      else {
        //postData(`https://i.cs.hku.hk/~wyvying/test.php`, {email: this.state.email, password: this.state.password})
        fetch(`https://i.cs.hku.hk/~wyvying/test.php`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({
              last_name: this.state.lastname,
              first_name: this.state.firstname,
              phone_number: this.state.phoneNo,
              email: this.state.email,
              password: this.state.password
              }), // body data type must match "Content-Type" header
        })
        //.then(response => response.json()); // parses response to JSON
          .then((data) => {
            alert(JSON.stringify(data));
            /***
            if (data.state == 'success'){ // Signup success + direct singin
              await AsyncStorage.setItem('userToken', this.state.email);
              this.props.navigation.navigate('App');
            } else { // wrong email or password
              alert('Email has been used!');
            }
            ***/
          }) // JSON-string from `response.json()` call
          .catch(error => console.error(error));
        };
  }
}
