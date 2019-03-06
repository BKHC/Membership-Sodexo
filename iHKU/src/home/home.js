import React from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, Button, PixelRatio, Dimensions, TextInput, ImageBackground,
  Image, Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import User from './user';

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

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {items: [{id: "1", User_ID: "1", date: "5/3/2019", topic: "BTS is back", rating_1: 2, rating_2: 3,
  rating_3: 4, rating_4: 5}]};
  }


  componentDidMount() {
    const data = {Hall_ID: 0}
    /***
    fetch(`https://i.cs.hku.hk/~wyvying/test.php?Hall_ID=${encodeURIComponent(data.Hall_ID)}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
    })
    //.then(response => response.json()); // parses response to JSON
      .then((data) => {
        alert(JSON.stringify(data));
        //this.item = JSON.parse(data);
        this.setState({items: JSON.parse(data)});

      }) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
      ***/
    }

    _renderData = ({item}) => (
      <View ref = {parseInt(item.id)}>
          <Text
            style={{
              fontSize:normalize(10),
            }}
          ><User User_ID={parseInt(item.User_ID)} /> - {item.date}</Text>
          <Text
            style={{
              fontSize:normalize(24),
            }}
          >{item.topic}</Text>
          <Text
            style={{
              fontSize:normalize(12),
            }}
          >運動: {item.rating_1}    文化: {item.rating_2}</Text>
          <Text
            style={{
              fontSize:normalize(12),
            }}
          >環境: {item.rating_3}    仙制: {item.rating_4}</Text>
        </View>
      );

  render() {

    if (this.state.items){
    return (
      <ImageBackground source={require('../../assets/loginBackground.jpg')} style={{width: '100%', height: '100%'}}>
          <Text
            style={{
              height: 150
            }}
          >It is the top bar that I will do later
          </Text>
          <View
            style={{
              marginLeft:40,
              fontFamily:'Helvetica Neue',
              width:getScreenWidth()-80,
            }}
          >
          <FlatList
              data={this.state.items}
              renderItem={this._renderData}
              keyExtractor={({id}, index) => id}
            />
          </View>
      </ImageBackground>
    );
  } else {
  return (
    <ImageBackground source={require('../../assets/loginBackground.jpg')} style={{width: '100%', height: '100%'}}>
      <Text
        style={{
          height: 150
        }}
      >It is the top bar that I will do later
      </Text>
  </ImageBackground>);
}
  }
}

/***
class HallScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {items: NULL};
  }

  componentDidMount() {
    /***
    fetch(`https://i.cs.hku.hk/~wyvying/test.php`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
    })
    //.then(response => response.json()); // parses response to JSON
      .then((data) => {
        alert(JSON.stringify(data));
        //this.item = JSON.parse(data);
        this.setState({items: JSON.parse(data)});

      }) // JSON-string from `response.json()` call
      .catch(error => console.error(error));

    }

    renderData(){
      return this.props.items.map((item) =>
      <View key = {parseInt(item.id)}>
          <Text
            style={{
              fontSize:normalize(24),
            }}
          ><Hall Hall_ID={parseInt(item.id)} /></Text>
          <Text
            style={{
              fontSize:normalize(12),
            }}
          >運動: {item.rating_1}    文化: {item.rating_2}</Text>
          <Text
            style={{
              fontSize:normalize(12),
            }}
          >環境: {item.rating_3}    仙制: {item.rating_4}</Text>
        </View>
      );
    }

  render(){
    return(
      <View>
        {this.renderData()}
      </View>
    );
  }
}
***/
