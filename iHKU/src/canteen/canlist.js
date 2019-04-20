import React from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, PixelRatio, Dimensions, TextInput, ImageBackground, Image,
  Platform, Text, View, FlatList, ScrollView, ActivityIndicator, AsyncStorage} from 'react-native';
import { createFilter } from 'react-native-search-filter';
import Star from '../star';
export default class CanList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      text: '',
    };
  }

  componentDidMount() {

    fetch(`https://i.cs.hku.hk/~wyvying/php/canteen/get_rest.php`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
    })
      .then(response => response.json()) // parses response to JSON
      .then((data) => {
        //alert(JSON.stringify(data));
        this.setState({items: data});

      }) // JSON-string from `response.json()` call
      .catch(error => console.error(error));

    }

    _renderData = ({item}) => (
      <TouchableOpacity
        ref={item.id}
        onPress={this.more.bind(this, item.id, item.restname)}
      >
      <ImageBackground
          style={{width: getScreenWidth()-20, height: 170, padding:10, marginLeft:10, borderRadius: 8, marginBottom:10}}
          imageStyle={{ borderRadius: 8 }}
          source={{uri: `https://i.cs.hku.hk/~wyvying/iHKU/rest_image/${item.id}.jpg`}}

      >
        <View style={{marginTop:80, marginLeft:10}}>
          <Text style={{color:'white', fontSize:22, fontWeight:'bold', marginBottom:5, shadowColor: 'black', shadowOpacity: 1,}}>{item.restname}</Text>
          <View style={{flexDirection:'row'}}>
            <Text
              style={{
                fontSize:normalize(12),
                color: 'white',
                fontWeight:'bold',
                shadowColor: 'black',
                shadowOpacity: 1,
                shadowOffset:{ width: 5, height: 5, },
              }}
            >食物:</Text>
            <View style={{flexDirection:'row',}} >
              <Star rating={item.rating_1} />
            </View>
            <Text
              style={{
                fontSize:normalize(12),
                color: 'white',
                fontWeight:'bold',
                marginLeft:20,
                shadowColor: 'black',
                shadowOpacity: 1,
              }}
            >環境:</Text>
            <View style={{flexDirection:'row',}} >
              <Star rating={item.rating_2} />
            </View>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text
              style={{
                fontSize:normalize(12),
                color: 'white',
                fontWeight:'bold',
                shadowColor: 'black',
                shadowOpacity: 1,
              }}
            >價錢:</Text>
            <View style={{flexDirection:'row',}} >
              <Star rating={item.rating_3} />
            </View>
            <Text
              style={{
                fontSize:normalize(12),
                color: 'white',
                fontWeight:'bold',
                marginLeft:20,
                shadowColor: 'black',
                shadowOpacity: 1,
              }}
            >服務:</Text>
            <View style={{flexDirection:'row',}} >
              <Star rating={item.rating_4} />
            </View>
          </View>
        </View>
      </ImageBackground>
      </TouchableOpacity>
    );

    more(id, name){
      this.props.navigation.navigate('CanCommentList', {restId: id, restName: name});
    }

    keyword() {

      let body = new FormData();
      text = this.state.text;
      body.append("keyword", text);
      AsyncStorage.getItem('userID').then((value) => {
        body.append("UserID", value);
        fetch('https://i.cs.hku.hk/~wyvying/php/update_search_hist.php',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': "multipart/form-data",
          },
          body: body,
          }).then((response) => response.json())
          .then((data) => {
            this.setState({searchTerm: text});
          }).catch(err => {
            console.log(err)
          })
    });

    }

    render(){
        if (this.state.items){
          const filteredItems = this.state.items.filter(createFilter(this.state.searchTerm, 'restname'));
          return (
            <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()}}>
                <ScrollView style={{marginBottom:142, marginTop:4}}>
                <View style={{width: getScreenWidth(), backgroundColor:'white', height:60, marginTop:4, padding:10 }}>
                  <View style={{width: getScreenWidth()-20, backgroundColor:'rgba(230, 230, 230, 1)', height:40, borderRadius: 8, flexDirection:'row',}}>
                    <TextInput
                    style={{marginLeft:15, fontSize:16, marginTop:2, color:'grey', width:getScreenWidth()-80}}
                    placeholder="搜尋"
                    onChangeText={(text) => this.setState({text: text})}
                    ></TextInput>
                    <TouchableOpacity
                      onPress={this.keyword.bind(this)}
                    >
                    <Image
                        style={{width: 18, height: 18, marginTop:11, marginLeft:11}}
                        source={require('../../assets/search.png')}
                    />
                    </TouchableOpacity>
                  </View>
                </View>
                  <View style={{width: getScreenWidth(), backgroundColor:'white'}}>
                    <View style={{width: getScreenWidth(), height:10}} />
                    <FlatList
                    data={filteredItems}
                    renderItem={this._renderData}
                    keyExtractor={({id}, index) => id}
                  />
                  </View>
                </ScrollView>
            </ImageBackground>
        );
      } else {
      return (
        <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()}}>
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
          <ActivityIndicator size="large" color="rgba(255, 153, 204, 1)" />
        </View>
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
