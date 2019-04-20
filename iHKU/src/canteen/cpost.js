import React from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, Button, PixelRatio, Dimensions, TextInput, ImageBackground,
  Image, Platform, StyleSheet, Text, View, FlatList, ScrollView, AsyncStorage} from 'react-native';
import NavigationActions from 'react-navigation';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import Star from '../star';
import Face from '../face';

export default class CanPostComment extends React.Component {
  constructor(props) {
    super(props);
    var color = new Array(4).fill(0).map(row => new Array(5).fill('rgba(100, 100, 100, 1)'));
    var star = new Array(4).fill(0).map(row => new Array(5).fill('☆'));
    this.state = {userID: "",topic: "", rating: "0", rating_1: "0", rating_2: "0", rating_3: "0", rating_4: "0", comment: "", color: color, star: star};
  }

  static navigationOptions = ({ navigation }) => {
    return {
    title: '新增評論',
      headerRight:(
        <TouchableOpacity onPress={navigation.getParam('post')}>
        <FastImage
            style={{width: 18, height: 18, marginRight:22}}
            source={require('../../assets/send.png')}
        />
        </TouchableOpacity>
      ),
    };
};

  async componentDidMount() {
    this.props.navigation.setParams({ post: this._post });
    AsyncStorage.getItem('userID').then((value) => {
      this.setState({userID: value});
  });
}

  update(id, star){
    var totalrating;
    if (id == 1){
      this.setState({rating_1: star.toString()});
      totalrating = star + parseInt(this.state.rating_2) + parseInt(this.state.rating_3) + parseInt(this.state.rating_4);

    } else if (id == 2){
      this.setState({rating_2: star.toString()});
      totalrating = parseInt(this.state.rating_1) + star + parseInt(this.state.rating_3) + parseInt(this.state.rating_4);
    } else if (id == 3){
      this.setState({rating_3: star.toString()});
      totalrating = parseInt(this.state.rating_1) + parseInt(this.state.rating_2) + star + parseInt(this.state.rating_4);
    } else {
      this.setState({rating_4: star.toString()});
      totalrating = parseInt(this.state.rating_1) + parseInt(this.state.rating_2) + parseInt(this.state.rating_3) + star;
    }

    var rating = (totalrating / 4).toFixed(0);
    this.setState({rating: rating.toString()});
    var color = this.state.color;
    var stars = this.state.star;
    for (var i=0; i < 5; i++){
      if (i < star){
        color[id-1][i] = 'rgba(255, 153, 204, 1)';
        stars[id-1][i] = '★';
      }
      else{
        color[id-1][i] = 'rgba(100, 100, 100, 1)';
        stars[id-1][i] = '☆';
      }
    }
    this.setState({color: color, star: stars});
  }

  render(){
    return(
      <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()-145}}>
          <ScrollView>
          <View style={{backgroundColor:'white', width:getScreenWidth(), padding:30, marginTop: 4,}}>
          <View style={{flexDirection:'row', justifyContent : 'space-between'}} >
            <View style={{flexDirection:'row'}}>
              <Face rating_1= {this.state.rating_1} rating_2= {this.state.rating_2}
                    rating_3= {this.state.rating_3} rating_4= {this.state.rating_4} />
              <View style={{flexDirection:'column', marginBottom:10}} >
                <TextInput
                  style={{
                    fontSize:normalize(14),
                    marginTop:2,
                    marginBottom:3,
                  }}
                  placeholder="輸入標題..."
                  onChangeText={(text) => this.setState({topic: text})}
                ></TextInput>
                <View style={{flexDirection:'row',}} >
                  <Text style={{fontSize: 13, marginRight: 3,}}>
                    分數:
                  </Text>

                  <Star rating={this.state.rating} />

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
                  marginRight: 3,
                }}
              >食物:</Text>
              <View style={{flexDirection:'row',}} >

                <TouchableOpacity onPress={() => this.update(1,1)}><Text style={{color: this.state.color[0][0],}}>{this.state.star[0][0]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(1,2)}><Text style={{color: this.state.color[0][1],}}>{this.state.star[0][1]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(1,3)}><Text style={{color: this.state.color[0][2],}}>{this.state.star[0][2]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(1,4)}><Text style={{color: this.state.color[0][3],}}>{this.state.star[0][3]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(1,5)}><Text style={{color: this.state.color[0][4],}}>{this.state.star[0][4]}</Text></TouchableOpacity>

              </View>
            </View>
            <Text style={{marginLeft:14, color: 'rgba(30, 30, 30, 1)',}}>|</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={{marginLeft:14, fontSize:normalize(12), marginRight: 3,}}>環境:</Text>
              <View style={{flexDirection:'row',}} >
                <TouchableOpacity onPress={() => this.update(2,1)}><Text style={{color: this.state.color[1][0],}}>{this.state.star[1][0]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(2,2)}><Text style={{color: this.state.color[1][1],}}>{this.state.star[1][1]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(2,3)}><Text style={{color: this.state.color[1][2],}}>{this.state.star[1][2]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(2,4)}><Text style={{color: this.state.color[1][3],}}>{this.state.star[1][3]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(2,5)}><Text style={{color: this.state.color[1][4],}}>{this.state.star[1][4]}</Text></TouchableOpacity>
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
                  marginRight: 3,
                }}
              >價錢:</Text>
              <View style={{flexDirection:'row', }} >
                <TouchableOpacity onPress={() => this.update(3,1)}><Text style={{color: this.state.color[2][0],}}>{this.state.star[2][0]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(3,2)}><Text style={{color: this.state.color[2][1],}}>{this.state.star[2][1]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(3,3)}><Text style={{color: this.state.color[2][2],}}>{this.state.star[2][2]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(3,4)}><Text style={{color: this.state.color[2][3],}}>{this.state.star[2][3]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(3,5)}><Text style={{color: this.state.color[2][4],}}>{this.state.star[2][4]}</Text></TouchableOpacity>
              </View>
            </View>
            <Text style={{marginLeft:14, color: 'rgba(30, 30, 30, 1)',}}>|</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={{marginLeft:14, fontSize:normalize(12), marginRight: 3,}}>服務:</Text>
              <View style={{flexDirection:'row',}} >
                <TouchableOpacity onPress={() => this.update(4,1)}><Text style={{color: this.state.color[3][0],}}>{this.state.star[3][0]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(4,2)}><Text style={{color: this.state.color[3][1],}}>{this.state.star[3][1]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(4,3)}><Text style={{color: this.state.color[3][2],}}>{this.state.star[3][2]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(4,4)}><Text style={{color: this.state.color[3][3],}}>{this.state.star[3][3]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.update(4,5)}><Text style={{color: this.state.color[3][4],}}>{this.state.star[3][4]}</Text></TouchableOpacity>
              </View>
            </View>
            <Text style={{marginLeft:14, color: 'rgba(30, 30, 30, 1)',}}>|</Text>
          </View>
        </View>
        <View style={{backgroundColor:'white', width:getScreenWidth(), paddingTop:30, paddingBottom:30, paddingLeft:40, paddingRight:40, marginTop: 4,}}>
          <Text style={{color: 'rgba(255, 153, 204, 1)', marginBottom:8, fontWeight: 'bold', fontSize:16}}>評論:</Text>
          <TextInput
            placeholder="輸入評論..."
            multiline={true}
            numberOfLines={4}
            style={{
              borderRadius: 4,
              borderWidth: 0.5,
              borderColor: '#d6d7da',
              height: 250,
              padding:10,
              paddingTop:10,
              paddingBottom:10,
              textAlignVertical: 'top'
            }}
            onChangeText={(text) => this.setState({comment: text})}
          />
        </View>
        <View style={{backgroundColor:'white', width:getScreenWidth(), paddingTop:30, paddingBottom:30, paddingLeft:40, paddingRight:40, marginTop: 4}}>
        <Text style={{color: 'rgba(255, 153, 204, 1)', marginBottom:8, fontWeight: 'bold', fontSize:16}}>圖片:</Text>
        {this.state.images ? (
            <View>
            <FlatList
            data={this.state.images}
            renderItem={this._renderData}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
              />
              <TouchableOpacity onPress={() => {this.pick()}}>
                <Image
                    style={{width: 120, height: 120, marginRight:10, marginTop:2, marginLeft:2, marginBottom:10}}
                    source={require('../../assets/add_image.png')}
                />
              </TouchableOpacity>
              </View>
        ) : (
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => {this.pick()}}>
            <Image
                style={{width: 120, height: 120, marginRight:10, marginTop:2, marginLeft:2, marginBottom:10}}
                source={require('../../assets/add_image.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.pick()}}>
            <Image
                style={{width: 120, height: 120, marginRight:10, marginTop:2, marginLeft:2, marginBottom:10}}
                source={require('../../assets/add_image.png')}
            />
          </TouchableOpacity>
          </View>
        )}
          </View>
          </ScrollView>
      </ImageBackground>
    );
  }

  _renderData = ({item}) => (
    <View style={{flex: 1, flexDirection: 'column', marginRight:10, marginTop:2, marginLeft:2, marginBottom:10}}>
    <FastImage
      style={{width: 120, height: 120}}
      source={{uri: item.path}}
      />
    </View>
  );

  pick(){
    ImagePicker.openPicker({
  multiple: true
}).then(images => {
  console.log(images);
  this.setState({images: images});
});
  }

  _post = () => {
    //let photo = { uri: source.uri} //for photo
    const restId = this.props.navigation.getParam('RestId','-1');
    let body = new FormData();
    body.append('topic', this.state.topic);
    body.append('rating_1', this.state.rating_1);
    body.append('rating_2', this.state.rating_2);
    body.append('rating_3', this.state.rating_3);
    body.append('rating_4', this.state.rating_4);
    body.append('comment', this.state.comment);
    body.append('topic', this.state.topic);
    body.append('restID', restId);
    body.append('userId', this.state.userID);

    if (this.state.images){
      this.state.images.forEach((item, i) => {
    body.append("img[]", {
      uri: item.path,
      type: "image/jpeg",
      name: `${i}.jpg`,
    });
  });
    body.append('image_num', this.state.images.length);
    }
    else{
    body.append('image_num', 0);
  }


    fetch('https://i.cs.hku.hk/~wyvying/php/canteen/post_comment.php',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': "multipart/form-data",
      },
      body: body,
      }).then((response) => response.json())
      .then((data) => {
        console.log("comment uploaded");
        Alert.alert(
      'Comment Posted!',
      '',
      [
        {text: data.comment, onPress: () => this.props.navigation.pop()
        },
      ],
      {cancelable: false},
    );
      }).catch(err => {
        console.log(err)
      })
};
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
