import React from 'react';
import { Alert, Button, PixelRatio, Dimensions, TextInput, Image, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

export default class Face extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const rating_1 = this.props.rating_1;
    const rating_2 = this.props.rating_2;
    const rating_3 = this.props.rating_3;
    const rating_4 = this.props.rating_4;
    var rating = (parseInt(rating_1) + parseInt(rating_2) + parseInt(rating_3) + parseInt(rating_4)) / 4;
    rating = rating.toFixed(0);
    if (rating <= 2){
      return(
        <FastImage
            style={{width: 50, height: 50, marginRight:20, marginTop:4}}
            source={require('../assets/angry.png')}
        />
    );
  }
    else if (rating == 3){
      return(
        <FastImage
            style={{width: 50, height: 50, marginRight:20, marginTop:4}}
            source={require('../assets/neutral.png')}
        />
      );
    }
    else {
      return(
        <FastImage
            style={{width: 50, height: 50, marginRight:20, marginTop:4}}
            source={require('../assets/happy.png')}
        />
      );
    }

  }
}
