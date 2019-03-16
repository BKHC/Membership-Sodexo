import React from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, Button, PixelRatio, Dimensions, TextInput, ImageBackground,
  Image, Platform, StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import User from '../user';
import Star from '../star';

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
    this.state = {items: [{id: "132", User_ID: "1", date: "5/3/2019", topic: "BTS is back", rating_1: "2", rating_2: "3",
  rating_3: "4", rating_4: "5"}]};
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
      <TouchableOpacity
        ref={item.id}
        onPress={this.more.bind(this, item.id)}
      >
      <View
        style={{
          fontFamily:'Helvetica Neue',
          width:getScreenWidth(),
          backgroundColor: 'rgba(255, 255, 255, 1)',
          paddingTop: 20, paddingBottom:18, paddingLeft:30, paddingRight:30,
          marginTop: 4,
        }}
      >
        <View style={{flexDirection:'row', justifyContent : 'space-between' }} >
          <View style={{flexDirection:'row',}}>
            <Text
              style={{
                fontSize:normalize(10),
                color: 'rgba(255, 153, 204, 1)',
                fontWeight: 'bold',
              }}
            ><User User_ID={item.User_ID} /></Text>
            <Text
              style={{
                fontSize:normalize(10),
              }}
            > - {item.date}</Text>
          </View>
          <View style={{flexDirection:'row', textAlign:'right', }}>


          </View>
        </View>

        <View style={{flexDirection:'row', justifyContent : 'space-between'}} >
          <View style={{flexDirection:'row'}}>
            <Image
                style={{width: 45, height: 45, marginTop:10, marginRight:10, }}
                source={require('../../assets/happy.png')}
            />
            <View style={{flexDirection:'column',}} >
              <Text
                style={{
                  fontSize:normalize(12),
                  marginTop:5,
                  marginBottom:3,
                }}
              >{item.topic}</Text>
              <View style={{flexDirection:'row',}} >
                <Text
                  style={{
                    fontSize:normalize(9),
                  }}
                >運動:</Text>
                <View style={{flexDirection:'row',}} >
                  <Star rating={item.rating_1} />
                </View>
                <Text style={{marginLeft:10, fontSize:normalize(9),}}>文化:</Text>
                <View style={{flexDirection:'row',}} >
                  <Star rating={item.rating_2} />
                </View>
              </View>
              <View style={{flexDirection:'row',}} >
                <Text
                  style={{
                    fontSize:normalize(9),
                  }}
                >環境:</Text>
                <View style={{flexDirection:'row',}} >
                  <Star rating={item.rating_3} />
                </View>
                <Text style={{marginLeft:10, fontSize:normalize(9),}}>仙制:</Text>
                <View style={{flexDirection:'row',}} >
                  <Star rating={item.rating_4} />
                </View>
              </View>
            </View>
          </View>
          <View style={{textAlign:'right',}}>
            <View
              style={{
                flexDirection:'row',
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 153, 204, 1)',
                padding: 4,
              }}>
              <Image
                  style={{width: 12, height: 12, marginRight:2, marginTop:2, marginLeft:2}}
                  source={require('../../assets/thumbUp.png')}
              />
              <Text>33 </Text>
            </View>
            <View
              style={{
                flexDirection:'row', marginTop:5,
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: 'rgba(120, 120, 120, 1)',
                padding: 4,
              }}>
              <Image
                style={{width: 12, height: 12, marginRight:2, marginTop:2, marginLeft:2}}
                source={require('../../assets/thumbDown.png')}
              />
              <Text>43 </Text>
            </View>
          </View>
        </View>
      </View>
      </TouchableOpacity>
      );

    more(id){
      alert(id);
      //this.props.navigation.navigate('Comment', {CommentId: id,});
    }

  render() {

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
