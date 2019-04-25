import React from 'react';
import { Alert, TouchableOpacity, Text, View, AsyncStorage} from 'react-native';
import FastImage from 'react-native-fast-image';

export default class HallLikeStatus extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var commentID = this.props.commentID;

    AsyncStorage.getItem('userID').then((value) => {
      this.setState({userID: value});
      fetch(`https://i.cs.hku.hk/~wyvying/php/hall/get_like_status.php?commentID=${encodeURIComponent(parseInt(commentID))}&userID=${encodeURIComponent(parseInt(value))}`, {
          method: "GET",
      })
        .then(response => response.json())
        .then((data) => {
          this.setState({items: data});
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
    });


    }

  componentWillReceiveProps(props){
    const {refresh} = this.props;
    if (props.refresh !== refresh){
      var commentID = this.props.commentID;
      AsyncStorage.getItem('userID').then((value) => {
      fetch(`https://i.cs.hku.hk/~wyvying/php/hall/get_like_status.php?commentID=${encodeURIComponent(parseInt(commentID))}&userID=${encodeURIComponent(parseInt(value))}`, {
          method: "GET",
      })
        .then(response => response.json())
        .then((data) => {
          this.setState({items: data});
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
    });
  }
  }

  render(){
    if (this.state.items){
    color_like = 'rgba(120, 120, 120, 1)';
    color_dislike = 'rgba(120, 120, 120, 1)';
    if (this.state.items.like_status == "1")
      color_like = 'rgba(255, 153, 204, 1)';
    else if (this.state.items.like_status == "0") {
      color_dislike = 'rgba(255, 153, 204, 1)';
    }
    return(
      <View style={{textAlign:'right',}}>
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
      </View>
    );
  } else {
    return(
      <View>
      </View>
    );
  }
  }
}
