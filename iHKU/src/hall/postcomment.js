import React from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, Button, PixelRatio, Dimensions, TextInput, ImageBackground,
  Image, Platform, StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import NavigationActions from 'react-navigation';
import Star from '../star';
import Face from '../face';

export default class PostComment extends React.Component {
  constructor(props) {
    super(props);
    var color = new Array(4).fill(0).map(row => new Array(5).fill('rgba(100, 100, 100, 1)'));
    var star = new Array(4).fill(0).map(row => new Array(5).fill('☆'));
    this.state = {topic: "", rating: "0", rating_1: "0", rating_2: "0", rating_3: "0", rating_4: "0", comment: "", color: color, star: star};
  }

  static navigationOptions = ({ navigation }) => {
    return {
    title: '新增評論',
      headerRight:(
        <TouchableOpacity onPress={navigation.getParam('post')}>
        <Image
            style={{width: 18, height: 18, marginRight:22}}
            source={require('../../assets/send.png')}
        />
        </TouchableOpacity>
      ),
    };
};

  componentDidMount() {
    this.props.navigation.setParams({ post: this._post });
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
      <ImageBackground source={require('../../assets/background.jpg')} style={{width: getScreenWidth(), height: getScreenHeight()}}>
          <ScrollView style={{marginBottom:145}}>
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
              >運動:</Text>
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
              <Text style={{marginLeft:14, fontSize:normalize(12), marginRight: 3,}}>文化:</Text>
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
              >環境:</Text>
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
              <Text style={{marginLeft:14, fontSize:normalize(12), marginRight: 3,}}>仙制:</Text>
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
          </ScrollView>
      </ImageBackground>
    );
  }

  _post = () => {
    //let photo = { uri: source.uri} //for photo
    let formdata = new FormData();
    const hallId = this.props.navigation.getParam('HallId','-1');
    const hallName = this.props.navigation.getParam('hallName','');
    formdata.append("topic", this.state.topic);
    formdata.append("rating_1",this.state.rating_1);
    formdata.append("rating_2",this.state.rating_2);
    formdata.append("rating_3",this.state.rating_3);
    formdata.append("rating_4",this.state.rating_4);
    formdata.append("comment",this.state.comment);
    formdata.append("hallId", hallId);
    alert(hallId);
    this.props.navigation.goBack();
    //this.props.navigation.replace('HallComment', {hallId: hallId, hallName: hallName});
    /***
    this.props.navigation.reset([NavigationActions.navigate({
      routeName: 'HallStack',
      params: {hallId: hallId, hallName: hallName},
    })], 0);
    fetch('http://192.168.1.101:3000/products',{
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  body: formdata
  }).then(response => {
    console.log("comment uploaded")
    Alert.alert(
  'Comment Posted!',
  '',
  [
    {text: 'OK', onPress: () => this.props.navigation.reset([NavigationActions.navigate({ routeName: 'HallComment', { hallId: hallId, hallName: hallName}})], 0)},
  ],
  {cancelable: false},
);
  }).catch(err => {
    console.log(err)
  })
});
***/
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

  /***
  <View style={{backgroundColor:'white', width:getScreenWidth(), paddingTop:30, paddingBottom:30, paddingLeft:40, paddingRight:40, marginTop: 4}}>
  <Text style={{color: 'rgba(255, 153, 204, 1)', marginBottom:8, fontWeight: 'bold', fontSize:16}}>圖片:</Text>
  <View style={{flexDirection:'row'}}>
    <TouchableOpacity>
      <Image
          style={{width: 120, height: 120, marginRight:10, marginTop:2, marginLeft:2, marginBottom:10}}
          source={require('../../assets/add_image.png')}
      />
    </TouchableOpacity>
    <TouchableOpacity>
      <Image
          style={{width: 120, height: 120, marginRight:10, marginTop:2, marginLeft:2, marginBottom:10}}
          source={require('../../assets/add_image.png')}
      />
    </TouchableOpacity>
  </View>
    </View>
    ***/
