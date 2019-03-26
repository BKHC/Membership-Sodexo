import React from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, Button, PixelRatio, Dimensions, TextInput, ImageBackground,
  Image, Text, Platform, View, FlatList, ScrollView} from 'react-native';
import { createFilter } from 'react-native-search-filter';
import User from '../user';
import Star from '../star';
import Face from '../face';

export default class HallComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {items: [{id: "0", User_ID: "1", date: "5/3/2019", topic: "Roy is handsome", rating_1: "2", rating_2: "3",
  rating_3: "4", rating_4: "5"}], searchTerm: ''};
  }

  static navigationOptions = ({ navigation }) => {
    var hallId = navigation.getParam('hallId', '-1')
    return {
      title: navigation.getParam('hallName', '利銘澤堂'),
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('PostComment', {HallId: hallId})}>
        <Text
          style={{
            textAlign: 'center',
            fontSize:18,
            marginRight:22,
            color: 'rgba(255, 255, 255, 1)',
            fontWeight: 'bold',
          }}
        >
          新增評論
        </Text>
        </TouchableOpacity>
      ),
    };
  };

  _doFetch = () => {
    fetch(`https://i.cs.hku.hk/~wyvying/php/json.php`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
    })
    .then(response => response.json()) // parses response to JSON
      .then((data) => {
        //alert(JSON.stringify(data));
        this.setState({items: data});

      }) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
  };

  componentDidMount() {
    this._doFetch();
    const { navigation } = this.props;
    navigation.addListener ('willFocus', () =>{
    // do whatever you want to do when focused
    this._doFetch();
  });
    //const Hall_ID = navigation.getParam('hallId', '0');
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
        onPress={this.more.bind(this, item.id, item.topic)}
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
          <Face rating_1= {item.rating_1} rating_2= {item.rating_2}
                rating_3= {item.rating_3} rating_4= {item.rating_4}/>
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

    more(id, topic){
      this.props.navigation.navigate('Comment', {CommentId: id, Topic: topic});
    }

  render() {

    if (this.state.items){
      const filteredItems = this.state.items.filter(createFilter(this.state.searchTerm, ['topic']))
      return (
        <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()}}>
            <ScrollView style={{marginBottom: 145}}>
            <View style={{width: getScreenWidth(), backgroundColor:'white', height:60, marginTop:4, padding:10 }}>
              <View style={{width: getScreenWidth()-20, backgroundColor:'rgba(230, 230, 230, 1)', height:40, borderRadius: 8, flexDirection:'row',}}>
                <TextInput
                style={{marginLeft:15, fontSize:16, marginTop:2, color:'grey', width:getScreenWidth()-80}}
                placeholder="搜尋"
                onChangeText={(text) => this.setState({searchTerm: text})}
                ></TextInput>
                <Image
                    style={{width: 18, height: 18, marginTop:11, marginLeft:11}}
                    source={require('../../assets/search.png')}
                />
              </View>
            </View>
            <FlatList
                data={filteredItems}
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
