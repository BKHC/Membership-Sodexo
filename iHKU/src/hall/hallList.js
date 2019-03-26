import React from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, Button, PixelRatio, Dimensions, TextInput, ImageBackground,
  Image, Platform, StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import { createFilter } from 'react-native-search-filter';
import Star from '../star';
export default class HallList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [{id: "0", hallname: "大學堂", image:"https://aal.hku.hk/admissions/international/sites/default/files/residential%20halls%20sidebar_0.jpg",
      rating_1: "2", rating_2: "3", rating_3: "4", rating_4: "5"},
     {id: "1", hallname: "何東夫人堂", image: "https://2.bp.blogspot.com/-r6KY0H1p8H0/VlLIxawtdrI/AAAAAAAACs4/Qx2mvR7ue_c/s1600/151123-03.JPG",
     rating_1: "5", rating_2: "2", rating_3: "3", rating_4: "2"},
     {id: "2", hallname: "利銘澤堂", image: "https://www.estates.hku.hk/application/files/9914/4739/0804/089-91_Sassoon%20Road%20Student%20Residence.jpg",
     rating_1: "4", rating_2: "4", rating_3: "5", rating_4: "4"},
     {id: "3", hallname: "施德堂", image: "https://upload.wikimedia.org/wikipedia/commons/8/89/HKU_Pokfulam_Road_Jockey_Club_Student_Village_%E6%96%BD%E5%BE%B7%E5%A0%82_Starr_Hall_AIG_Building_Mar-2012.jpg",
     rating_1: "1", rating_2: "1", rating_3: "1", rating_4: "1"},
     {id: "4", hallname: "李國賢堂", image: "https://www.estates.hku.hk/application/files/9114/4231/2366/072_Simon_K_Y_Lee_Hall.jpg",
     rating_1: "3", rating_2: "5", rating_3: "2", rating_4: "3"},

 ],
      searchTerm: ''
    };
  }

  componentDidMount() {
    /***
    fetch(`https://i.cs.hku.hk/~wyvying/test.php`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
    })
    //.then(response => response.json()); // parses response to JSON
      .then((data) => {
        //alert(JSON.stringify(data));
        this.setState({items: data});

      }) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
      ***/
    }


    _renderData = ({item}) => (
      <TouchableOpacity
        ref={item.id}
        onPress={this.more.bind(this, item.id, item.hallname)}
      >
      <ImageBackground
          style={{width: getScreenWidth()-20, height: 170, padding:10, marginLeft:10, borderRadius: 8, marginBottom:10}}
          imageStyle={{ borderRadius: 8 }}
          source={{uri: item.image}}
          //source={{uri: `https://i.cs.hku.hk/~wyvying/hall_img/${item.id}.jpg`}}

      >
        <View style={{marginTop:80, marginLeft:10}}>
          <Text style={{color:'white', fontSize:22, fontWeight:'bold', marginBottom:5, shadowColor: 'black', shadowOpacity: 1,}}>{item.hallname}</Text>
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
            >運動:</Text>
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
            >文化:</Text>
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
            >環境:</Text>
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
            >仙制:</Text>
            <View style={{flexDirection:'row',}} >
              <Star rating={item.rating_4} />
            </View>
          </View>
        </View>
      </ImageBackground>
      </TouchableOpacity>
    );

    more(id, name){
      this.props.navigation.navigate('HallComment', {hallId: id, hallName: name});
    }

    render(){
        if (this.state.items){
          const filteredItems = this.state.items.filter(createFilter(this.state.searchTerm, 'hallname'));
          return (
            <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()}}>
                <ScrollView style={{marginBottom:145, marginTop:4}}>
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
