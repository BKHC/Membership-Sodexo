import React from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, Button, PixelRatio, Dimensions, TextInput, ImageBackground,
  Image, Platform, StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';

export default class HallList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {items: [{hallname: "BTS"}, {hallname: "ISBB"}]};
  }

  componentDidMount() {
    //const { navigation } = this.props;
    //const Hall_ID = navigation.getParam('Hall_ID', '0');
    //const data = {Hall_ID: Hall_ID};
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
    );

    more(id, name){
      this.props.navigation.navigate('HallComment', {hallId: id, hallName: name});
    }

    render(){
        if (this.state.items){
        return (
          <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()}}>
              <ScrollView>
              <FlatList
                  data={this.state.items}
                  renderItem={this._renderData}
                  keyExtractor={({id}, index) => id}
                />
              </ScrollView>
          </ImageBackground>
        );
      } else {
      return (
        <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()}}>
      </ImageBackground>);
    }
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
