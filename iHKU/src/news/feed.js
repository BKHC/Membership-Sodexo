import React from 'react';
import { Alert, TouchableOpacity, PixelRatio, Dimensions, ImageBackground, Text,
  Platform, View, FlatList, ScrollView, ActivityIndicator, AsyncStorage} from 'react-native';
import FastImage from 'react-native-fast-image';
import { format } from 'date-fns';
import CanLikeStatus from './like_status_canteen';
import HallLikeStatus from './like_status_hall';
import CouLikeStatus from './like_status_course';
import User from '../user';
import Star from '../star';
import Face from '../face';

export default class NewsFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {like_refresh: false};
  }

  _doFetch = () => {
    AsyncStorage.getItem('userID').then((value) => {
      fetch(`https://i.cs.hku.hk/~wyvying/php/news/feed.php?userID=${encodeURIComponent(value)}`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
      })
      .then(response => response.json()) // parses response to JSON
        .then((data) => {
          this.setState({items: data});

        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
  });
  };

  async componentDidMount() {
    this._doFetch();
    this.props.navigation.addListener ('didFocus', () =>{
    // do whatever you want to do when focused
    AsyncStorage.getItem('Comment').then((value) => {
        if (value == '1'){
          this.setState({like_refresh: !this.state.like_refresh});
          AsyncStorage.setItem('Comment', '0');
        }
      });

  });
    }

    _renderData = ({item}) => (
      <TouchableOpacity
        ref={item.id}
        onPress={this.more.bind(this, item.id, item.Topic, item.date, item.rating_1, item.rating_2, item.rating_3,
          item.rating_4, item.nickname, item.comment, item.image_num, item.category)}
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
            >{item.nickname}</Text>
            <Text
              style={{
                fontSize:normalize(10),
              }}
            > - {format(item.date, 'HH:mm D MMM YYYY')}</Text>
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
              >{item.Topic}</Text>
              <View style={{flexDirection:'row',}} >
                <Text
                  style={{
                    fontSize:normalize(9),
                  }}
                >{item.category == "0" ? "食物" : item.category == "1" ? "運動" : "知識"}:</Text>
                <View style={{flexDirection:'row',}} >
                  <Star rating={item.rating_1} />
                </View>
                <Text style={{marginLeft:10, fontSize:normalize(9),}}>{item.category == "0" ? "環境" : item.category == "1" ? "文化" : "難度"}:</Text>
                <View style={{flexDirection:'row',}} >
                  <Star rating={item.rating_2} />
                </View>
              </View>
              <View style={{flexDirection:'row',}} >
                <Text
                  style={{
                    fontSize:normalize(9),
                  }}
                >{item.category == "0" ? "價錢" : item.category == "1" ? "環境" : "耗時"}:</Text>
                <View style={{flexDirection:'row',}} >
                  <Star rating={item.rating_3} />
                </View>
                <Text style={{marginLeft:10, fontSize:normalize(9),}}>{item.category == "0" ? "服務" : item.category == "1" ? "仙制" : "成績"}:</Text>
                <View style={{flexDirection:'row',}} >
                  <Star rating={item.rating_4} />
                </View>
              </View>
            </View>
          </View>
          {item.category == "0" ?
          (<CanLikeStatus commentID={item.id} refresh={this.state.like_refresh} />) : item.category == "1" ?
          (<HallLikeStatus commentID={item.id} refresh={this.state.like_refresh} />):
          (<CouLikeStatus commentID={item.id} refresh={this.state.like_refresh} />)}
        </View>
        <View style={{marginTop:6,}}>
          <Text numberOfLines={3} style={{fontSize: 13}}>
            {item.comment}
          </Text>
        </View>
      </View>
      </TouchableOpacity>
      );

    more(id, topic, date, rating_1, rating_2, rating_3, rating_4, nickname, comment, image_num, category){
      this.props.navigation.navigate('NewsComment',
      {CommentId: id, Topic: topic, Date: date, Rating_1: rating_1, Rating_2: rating_2, Rating_3: rating_3,
      Rating_4: rating_4, Nickname: nickname, Comment: comment, image_num: image_num, category: category});
    }

  render() {

    if (this.state.items){
      return (
        <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()-142}}>

                <FlatList
                  data={this.state.items}
                  renderItem={this._renderData}
                  keyExtractor={(item, index) => index.toString()}
                  ListHeaderComponent = {() => {
                    return (
                      <View
                       style={{
                            fontFamily:'Helvetica Neue',
                            width:getScreenWidth(),
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            paddingTop: 20, paddingBottom:18,
                            marginTop: 4,
                       }}
                  >
                     <FastImage
                          style={{width: getScreenWidth(), height: 100,}}
                          source={require('../../assets/ads_banner.jpg')}
                          resizeMode={FastImage.resizeMode.stretch}
                     />
                    </View>
                    )
                  }
                  }
                    />
        </ImageBackground>
      );
  } else {
  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()-142}}>
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
