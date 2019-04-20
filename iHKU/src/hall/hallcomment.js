import React from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, PixelRatio, Dimensions, TextInput, ImageBackground,
  Image, Text, Platform, View, FlatList, ScrollView, ActivityIndicator, RefreshControl, AsyncStorage} from 'react-native';
import FastImage from 'react-native-fast-image';
import { createFilter } from 'react-native-search-filter';
import { format } from 'date-fns';
import User from '../user';
import Star from '../star';
import Face from '../face';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchTerm: '', text: '', refreshing: false, refresh: true};
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

  _onRefresh = () => {
    this.setState({refreshing: true});
    this._doFetch();
  }

  _doFetch = () => {
    const Hall_ID = this.props.navigation.getParam('hallId', '-1');
    const data = {Hall_ID: parseInt(Hall_ID)};
    fetch(`https://i.cs.hku.hk/~wyvying/php/hall/hall_forum.php?hall_id=${encodeURIComponent(data.Hall_ID)}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
    })
    .then(response => response.json()) // parses response to JSON
      .then((data) => {
        this.setState({items: data, refreshing: false, refresh: false});

      }) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
  };

  async componentDidMount() {
    this.props.navigation.addListener ('didFocus', () =>{
    // do whatever you want to do when focused
    if (this.state.refresh){
    this.setState({items: null});
    this._onRefresh();
  }
  });
    }

    _renderData = ({item}) => (
      <TouchableOpacity
        ref={item.id}
        onPress={this.more.bind(this, item.id, item.topic, item.date, item.rating_1, item.rating_2, item.rating_3,
          item.rating_4, item.nickname, item.comment, item.image_num)}
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
          <LikeStatus commentID={item.id} />
        </View>
        <View style={{marginTop:6,}}>
          <Text numberOfLines={3} style={{fontSize: 13}}>
            {item.comment}
          </Text>
        </View>
      </View>
      </TouchableOpacity>
      );

    more(id, topic, date, rating_1, rating_2, rating_3, rating_4, nickname, comment, image_num){
      this.props.navigation.navigate('Comment',
      {CommentId: id, Topic: topic, Date: date, Rating_1: rating_1, Rating_2: rating_2, Rating_3: rating_3,
      Rating_4: rating_4, Nickname: nickname, Comment: comment, image_num: image_num});
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

  render() {

    if (this.state.items){
      const filteredItems = this.state.items.filter(createFilter(this.state.searchTerm, ['topic']))
      return (
        <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()-145}}>


              <View style={{width: getScreenWidth(), backgroundColor:'white', height:60, marginTop:4, padding:10 }}>
                <View style={{width: getScreenWidth()-20, backgroundColor:'rgba(230, 230, 230, 1)', height:40, borderRadius: 8, flexDirection:'row',}}>
                  <TextInput
                    style={{marginLeft:15, fontSize:16, marginTop:2, color:'grey', width:getScreenWidth()-80}}
                    placeholder="搜尋"
                    onChangeText={(text) => {
                      this.setState({text: text});
                      if (text == "")
                        this.setState({searchTerm: ""});
                    }}
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

                <FlatList
                  data={filteredItems}
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
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                      tintColor="rgba(255, 153, 204, 1)"
                    />}
                    />
        </ImageBackground>
      );
  } else {
  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()-145}}>
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
    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
      <ActivityIndicator size="large" color="rgba(255, 153, 204, 1)" />
    </View>
  </ImageBackground>);
}
  }
}

class LikeStatus extends React.Component{
  constructor(props) {
    super(props);
    this.state = {items: {like_status: "1", likes: "10", dislikes: "5"}};
  }

  componentDidMount() {
    var commentID = this.props.commentID;
    /***
    AsyncStorage.getItem('userID').then((value) => {
      fetch(`https://i.cs.hku.hk/~wyvying/php/get_like_status.php?commentID=${encodeURIComponent(parseInt(commentID))}&userID=${encodeURIComponent(parseInt(value))}`, {
          method: "GET",
      })
        .then(response => response.json())
        .then((data) => {
          this.setState({items: data});
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
    });
    ***/

    }

    _like = () => {
      newitem = this.state.items;
      if (newitem.like_status == "1"){
        newitem.like_status = "-1";
        newitem.likes = parseInt(newitem.likes) - 1;
      } else if (newitem.like_status == "0"){
        newitem.like_status = "1";
        newitem.likes = parseInt(newitem.likes) + 1;
        newitem.dislikes = parseInt(newitem.dislikes) - 1;
      } else {
        newitem.like_status = "1";
        newitem.likes = parseInt(newitem.likes) + 1;
      }
      this.setState({items: newitem});
    };

    _dislike = () => {
      newitem = this.state.items;
      if (newitem.like_status == "1"){
        newitem.like_status = "0";
        newitem.dislikes = parseInt(newitem.dislikes) + 1;
        newitem.likes = parseInt(newitem.likes) - 1;
      } else if (newitem.like_status == "0"){
        newitem.like_status = "-1";
        newitem.dislikes = parseInt(newitem.dislikes) - 1;
      } else {
        newitem.like_status = "0";
        newitem.dislikes = parseInt(newitem.dislikes) + 1;
      }
      this.setState({items: newitem});
    };

  render(){
    color_like = 'rgba(120, 120, 120, 1)';
    color_dislike = 'rgba(120, 120, 120, 1)';
    if (this.state.items.like_status == "1")
      color_like = 'rgba(255, 153, 204, 1)';
    else if (this.state.items.like_status == "0") {
      color_dislike = 'rgba(255, 153, 204, 1)';
    }
    return(
      <View style={{textAlign:'right',}}>
        <TouchableOpacity onPress={() => this._like()}>
        <View
          style={{
            flexDirection:'row',
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: color_like,
            padding: 4,
          }}>
            <FastImage
                style={{width: 12, height: 12, marginRight:2, marginTop:2, marginLeft:2}}
                source={require('../../assets/thumbUp.png')}
            />
            <Text>{this.state.items.likes} </Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._dislike()}>
        <View
          style={{
            flexDirection:'row', marginTop:5,
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: color_dislike,
            padding: 4,
          }}>
          <FastImage
            style={{width: 12, height: 12, marginRight:2, marginTop:2, marginLeft:2}}
            source={require('../../assets/thumbDown.png')}
          />
          <Text>{this.state.items.dislikes} </Text>
        </View>
        </TouchableOpacity>
      </View>
    );
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
