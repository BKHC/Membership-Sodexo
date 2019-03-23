import React from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, Button, PixelRatio, Dimensions, TextInput, ImageBackground,
  Image, Platform, StyleSheet, Text, View, FlatList, ScrollView, FormData} from 'react-native';

export default class PostComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {topic: "", rating_1: "", rating_2: "", rating_3: "", rating_4: "", comment: ""};
  }

  render(){
    return(
      <View>
      </View>
    );
  }

  post(){
    //let photo = { uri: source.uri} //for photo
    let formdata = new FormData();
    formdata.append("topic", this.state.topic);
    formdata.append("rating_1",this.state.rating_1);
    formdata.append("rating_2",this.state.rating_2);
    formdata.append("rating_3",this.state.rating_3);
    formdata.append("rating_4",this.state.rating_4);
    formdata.append("comment",this.state.comment);
    /***
    fetch('http://192.168.1.101:3000/products',{
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  body: formdata
  }).then(response => {
    console.log("comment uploaded")
  }).catch(err => {
    console.log(err)
  })
});
***/
  }
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
