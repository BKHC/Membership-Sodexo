import React from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, PixelRatio, Dimensions, TextInput, ImageBackground,
  Image, Text, View, Platform, FlatList, ScrollView, Modal, ActivityIndicator} from 'react-native';
import { format } from 'date-fns';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import CanLikeStatus from './like_status_canteen';
import HallLikeStatus from './like_status_hall';
import CouLikeStatus from './like_status_course';
import Star from '../star';
import Face from '../face';

class ImageList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
     isModalOpened: false,  //Controls if modal is opened or closed
     currentImageIndex: 0,   //Controls initial photo to show for modal
   };
  }

  _renderData = ({item}) => {
    if (this.props.category == "0")
      cat = "rest_comment";
     else if (this.props.category == "1")
      cat = "hall_comment";
    else
      cat = "course_comment";

    return (
    <View style={{flex: 1, flexDirection: 'column', marginRight:10, marginTop:2, marginLeft:2, marginBottom:10}}>
    <TouchableWithoutFeedback onPress={() => {this.openModal(item.id)}}>
      <FastImage
      style= {{width: 120, height: 120}}
      source={{uri: `https://i.cs.hku.hk/~wyvying/iHKU/${cat}/${item.Comment_ID}/${item.id}.jpg`}}
      />
    </TouchableWithoutFeedback>
    </View>
  )};

  openModal(index) {
 this.setState({isModalOpened: true, currentImageIndex: index });
}


  render(){
    var Comment_ID = this.props.Comment_ID;
    var noOfImg = this.props.noOfImg;
    if (this.props.category == "0")
      cat = "rest_comment";
     else if (this.props.category == "1")
      cat = "hall_comment";
    else
      cat = "course_comment";
    var rows = [];
    var images = [];
    for (var i=0; i < noOfImg; i++){
      images.push(
        {
          url: `https://i.cs.hku.hk/~wyvying/iHKU/${cat}/${Comment_ID}/${i}.jpg`,
          props: {
          },
          id: i
        }
      );
      rows.push(
        {id: i, Comment_ID: Comment_ID}
        );
    }
    return(
      <View>
      <FlatList
        data={rows}
        renderItem={this._renderData}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
          />
          <Modal visible={this.state.isModalOpened} transparent={true} onRequestClose={() => this.setState({ isModalOpened: false })}>
            <ImageViewer imageUrls={images} index={this.state.currentImageIndex}/>
          </Modal>
      </View>
    );

  }
}

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('Topic', 'Default Comment'),
    };
  };

  componentDidMount() {

    const { navigation } = this.props;
    const Comment_ID = navigation.getParam('CommentId', '-1');
    const topic = navigation.getParam('Topic', '');
    const date = navigation.getParam('Date', '');
    const rating_1 = navigation.getParam('Rating_1', '');
    const rating_2 = navigation.getParam('Rating_2', '');
    const rating_3 = navigation.getParam('Rating_3', '');
    const rating_4 = navigation.getParam('Rating_4', '');
    const nickname = navigation.getParam('Nickname', '');
    const comment = navigation.getParam('Comment', '');
    const image_num = navigation.getParam('image_num', '');
    const category = navigation.getParam('category', '');

    navigation.addListener('willBlur', () => {
      AsyncStorage.setItem('Comment', '1').then(() => console.log(""));
    });

    const data = {Comment_ID: parseInt(Comment_ID), topic: topic, date: date, rating_1: rating_1, rating_2: rating_2,
      rating_3: rating_3, rating_4: rating_4, nickname: nickname, comment: comment, image_num: image_num, category: category};

    this.setState({item: data});

    }

    render(){
        if (this.state.item){
          var rating = (parseInt(this.state.item.rating_1) + parseInt(this.state.item.rating_2) + parseInt(this.state.item.rating_3) + parseInt(this.state.item.rating_4)) / 4;
          rating = rating.toFixed(0);
        return (
          <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()-145}}>
              <ScrollView>
                <View style={{backgroundColor:'white', width:getScreenWidth(), padding:30, marginTop: 4}}>
                  <View style={{flexDirection:'row', justifyContent : 'space-between'}} >
                    <View style={{flexDirection:'row'}}>
                    <Face rating_1= {this.state.item.rating_1} rating_2= {this.state.item.rating_2}
                          rating_3= {this.state.item.rating_3} rating_4= {this.state.item.rating_4}/>
                    <View style={{flexDirection:'column',}} >
                      <View style={{flexDirection:'row',}} >
                        <Text
                          style={{
                            fontSize:normalize(10),
                            color: 'rgba(255, 153, 204, 1)',
                            fontWeight: 'bold',
                          }}
                        >{this.state.item.nickname}</Text>
                        <Text
                          style={{
                            fontSize:normalize(10),
                          }}
                        > - {format(this.state.item.date, 'HH:mm D MMM YYYY')}</Text>
                      </View>
                      <Text
                        style={{
                          fontSize:normalize(14),
                          marginTop:2,
                          marginBottom:3,
                        }}
                      >{this.state.item.topic}</Text>
                      <View style={{flexDirection:'row',}} >
                        <Text style={{fontSize: 13,}}>
                          分數:
                        </Text>
                        <Star rating={rating} />
                      </View>
                    </View>
                  </View>
                  {this.state.item.category == "0" ?
                  (<CanLikeStatus commentID={this.state.item.Comment_ID} />) : this.state.item.category == "1" ?
                  (<HallLikeStatus commentID={this.state.item.Comment_ID} />):
                  (<CouLikeStatus commentID={this.state.item.Comment_ID} />)}
                </View>
                <Text style={{marginLeft:50, marginRight:50, color: 'rgba(255, 153, 204, 1)',}}>___________________________________</Text>
                <View style={{flexDirection:'row', marginTop:15, justifyContent: 'space-between', paddingLeft:20, paddingRight:20}} >
                  <Text style={{marginRight:14, color: 'rgba(30, 30, 30, 1)',}}>|</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text
                      style={{
                        fontSize:normalize(12),
                      }}
                    >{this.state.item.category == "0" ? 食物 : this.state.item.category == "1" ? 運動 : 知識}:</Text>
                    <View style={{flexDirection:'row',}} >
                      <Star rating={this.state.item.rating_1} />
                    </View>
                  </View>
                  <Text style={{marginLeft:14, color: 'rgba(30, 30, 30, 1)',}}>|</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{marginLeft:14, fontSize:normalize(12),}}>{this.state.item.category == "0" ? 環境 : this.state.item.category == "1" ? 文化 : 難度}:</Text>
                    <View style={{flexDirection:'row',}} >
                      <Star rating={this.state.item.rating_2} />
                    </View>
                  </View>
                  <Text style={{marginLeft:14, color: 'rgba(30, 30, 30, 1)',}}>|</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingLeft:20, paddingRight:20, marginTop:4}} >
                  <Text style={{marginRight:14, color: 'rgba(30, 30, 30, 1)',}}>|</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text
                      style={{
                        fontSize:normalize(12),
                      }}
                    >{this.state.item.category == "0" ? 價錢 : this.state.item.category == "1" ? 環境 : 耗時}:</Text>
                    <View style={{flexDirection:'row',}} >
                      <Star rating={this.state.item.rating_3} />
                    </View>
                  </View>
                  <Text style={{marginLeft:14, color: 'rgba(30, 30, 30, 1)',}}>|</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{marginLeft:14, fontSize:normalize(12),}}>{this.state.item.category == "0" ? 服務 : this.state.item.category == "1" ? 仙制 : 成績}:</Text>
                    <View style={{flexDirection:'row',}} >
                      <Star rating={this.state.item.rating_4} />
                    </View>
                  </View>
                  <Text style={{marginLeft:14, color: 'rgba(30, 30, 30, 1)',}}>|</Text>
                </View>
              </View>
              <View style={{backgroundColor:'white', width:getScreenWidth(), paddingTop:30, paddingBottom:30, paddingLeft:40, paddingRight:40, marginTop: 4,}}>
                <Text style={{color: 'rgba(255, 153, 204, 1)', marginBottom:8, fontWeight: 'bold', fontSize:16}}>評論:</Text>
                <Text style={{textAlign:'justify', marginBottom:8}}>
                  {this.state.item.comment}
                </Text>
              </View>
              {this.state.item.image_num != "0" ? (
              <View style={{backgroundColor:'white', width:getScreenWidth(), paddingTop:30, paddingBottom:30, paddingLeft:40, paddingRight:40, marginTop: 4}}>
              <Text style={{color: 'rgba(255, 153, 204, 1)', marginBottom:8, fontWeight: 'bold', fontSize:16}}>圖片:</Text>
              <ImageList noOfImg={this.state.item.image_num} Comment_ID={this.state.item.Comment_ID} />
              </View>
            ) : (<View />) }
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
