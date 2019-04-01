import React from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Button, PixelRatio, Dimensions, TextInput, ImageBackground,
  Image, Text, View, Platform, FlatList, ScrollView, Modal} from 'react-native';
import { format } from 'date-fns';
import ImageViewer from 'react-native-image-zoom-viewer';
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

  render(){
    var Comment_ID = this.props.Comment_ID;
    var noOfImg = this.props.noOfImg;
    var rows = [];
    var images = [];
    for (var i=0; i < noOfImg; i++){
      images.push(
        {
          props: {
            style: {width: 120, height: 120, marginRight:10, marginTop:2, marginLeft:2, marginBottom:10},
            source: {uri: `https://i.cs.hku.hk/~wyvying/comment/hall/${Comment_ID}/post_img${i}.jpg`},
          }
        }
      );
      rows.push(
        <TouchableWithoutFeedback onPress={() => {this.openModal(i)}}>
          <Image
          style= {{width: 120, height: 120, marginRight:10, marginTop:2, marginLeft:2, marginBottom:10}}
          source={{uri: `https://i.cs.hku.hk/~wyvying/comment/hall/${Comment_ID}/post_img${i}.jpg`}}
          />
        </TouchableWithoutFeedback>
      );
    }
    return(
      <View>
      <View style={{flexDirection:'row'}}>{rows}</View>
      <Modal visible={this.state.isModalOpened} transparent={true} onRequestClose={() => this.setState({ isModalOpened: false })}>
        <ImageViewer imageUrls={images} index={this.state.currentImageIndex}/>
      </Modal>
      </View>
    );

  }

  openModal(index) {
 this.setState({isModalOpened: true, currentImageIndex: index });
}
}

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     isModalOpened: false,  //Controls if modal is opened or closed
     currentImageIndex: 0,   //Controls initial photo to show for modal
   };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('Topic', 'Default Comment'),
    };
  };

  componentDidMount() {

    const { navigation } = this.props;
    const Comment_ID = navigation.getParam('CommentId', '-1');
    const data = {Comment_ID: parseInt(Comment_ID)};

    fetch(`https://i.cs.hku.hk/~wyvying/php/get_comment.php?id=${encodeURIComponent(data.Comment_ID)}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
    })
      .then(response => response.json()) // parses response to JSON
      .then((data) => {
        //alert(JSON.stringify(data));
        this.setState({item: data});

      }) // JSON-string from `response.json()` call
      .catch(error => console.error(error));

    }

    render(){
      const images = [
{
    url: `https://i.cs.hku.hk/~wyvying/iHKU/comment_image/post_img1.jpg`,
    props: {
        // Or you can set source directory.
    }
},
{
    url: `https://i.cs.hku.hk/~wyvying/iHKU/comment_image/post_img2.jpg`,
    props: {
        // Or you can set source directory.
    }
}]
        if (this.state.item){
          var rating = (parseInt(this.state.item.rating_1) + parseInt(this.state.item.rating_2) + parseInt(this.state.item.rating_3) + parseInt(this.state.item.rating_4)) / 4;
          rating = rating.toFixed(0);
        return (
          <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight(),flex: 1}}>
              <ScrollView style={{marginBottom: 145}}>
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
                </View>
                <Text style={{marginLeft:50, marginRight:50, color: 'rgba(255, 153, 204, 1)',}}>___________________________________</Text>
                <View style={{flexDirection:'row', marginTop:15, justifyContent: 'space-between', paddingLeft:20, paddingRight:20}} >
                  <Text style={{marginRight:14, color: 'rgba(30, 30, 30, 1)',}}>|</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text
                      style={{
                        fontSize:normalize(12),
                      }}
                    >運動:</Text>
                    <View style={{flexDirection:'row',}} >
                      <Star rating={this.state.item.rating_1} />
                    </View>
                  </View>
                  <Text style={{marginLeft:14, color: 'rgba(30, 30, 30, 1)',}}>|</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{marginLeft:14, fontSize:normalize(12),}}>文化:</Text>
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
                    >環境:</Text>
                    <View style={{flexDirection:'row',}} >
                      <Star rating={this.state.item.rating_3} />
                    </View>
                  </View>
                  <Text style={{marginLeft:14, color: 'rgba(30, 30, 30, 1)',}}>|</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{marginLeft:14, fontSize:normalize(12),}}>仙制:</Text>
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
              <View style={{backgroundColor:'white', width:getScreenWidth(), paddingTop:30, paddingBottom:30, paddingLeft:40, paddingRight:40, marginTop: 4}}>
              <Text style={{color: 'rgba(255, 153, 204, 1)', marginBottom:8, fontWeight: 'bold', fontSize:16}}>圖片:</Text>
              <View style={{flexDirection:'row'}}>
                <TouchableWithoutFeedback onPress={() => {this.openModal(0)}}>
                  <Image
                    style={{width: 120, height: 120, marginRight:10, marginTop:2, marginLeft:2, marginBottom:10}}
                    source={{uri: `https://i.cs.hku.hk/~wyvying/iHKU/comment_image/post_img1.jpg`}}
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {this.openModal(1)}}>
                  <Image
                    style={{width: 120, height: 120, marginRight:10, marginTop:2, marginLeft:2, marginBottom:10}}
                    source={{uri: `https://i.cs.hku.hk/~wyvying/iHKU/comment_image/post_img2.jpg`}}
                    />
                </TouchableWithoutFeedback>
                </View>

                </View>
                <Modal visible={this.state.isModalOpened} transparent={true} onRequestClose={() => this.setState({ isModalOpened: false })}>
                  <ImageViewer imageUrls={images} index={this.state.currentImageIndex}/>
                </Modal>
              </ScrollView>

          </ImageBackground>

        );
      } else {
      return (
        <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()}}>
        <ScrollView style={{marginBottom: 65}}>
        </ScrollView>
      </ImageBackground>);
    }
    }

    openModal(index) {
   this.setState({isModalOpened: true, currentImageIndex: index })
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
  <View style={{backgroundColor:'white', width:getScreenWidth(), paddingTop:30, paddingBottom:30, paddingLeft:40, paddingRight:40, marginTop: 4}}>
  <Text style={{color: 'rgba(255, 153, 204, 1)', marginBottom:8, fontWeight: 'bold', fontSize:16}}>圖片:</Text>
  <View style={{flexDirection:'row'}}>
    <TouchableWithoutFeedback onPress={() => {this.openModal(0)}}>
      <Image
        style={{width: 120, height: 120, marginRight:10, marginTop:2, marginLeft:2, marginBottom:10}}
        source={require('../../assets/post_img1.jpg')}
        />
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={() => {this.openModal(1)}}>
      <Image
        style={{width: 120, height: 120, marginRight:10, marginTop:2, marginLeft:2, marginBottom:10}}
        source={require('../../assets/post_img2.jpg')}
        />
    </TouchableWithoutFeedback>
    </View>

    </View>
    <Modal visible={this.state.isModalOpened} transparent={true} onRequestClose={() => this.setState({ isModalOpened: false })}>
      <ImageViewer imageUrls={images} index={this.state.currentImageIndex}/>
    </Modal>
    ***/
