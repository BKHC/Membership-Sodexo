import React from 'react';
import { Alert, TouchableOpacity, Text, View, AsyncStorage} from 'react-native';
import FastImage from 'react-native-fast-image';

export default class LikeStatus extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var commentID = this.props.commentID;

    AsyncStorage.getItem('userID').then((value) => {
      this.setState({userID: value});
      fetch(`https://i.cs.hku.hk/~wyvying/php/fac/get_like_status.php?commentID=${encodeURIComponent(parseInt(commentID))}&userID=${encodeURIComponent(parseInt(value))}`, {
          method: "GET",
      })
        .then(response => response.json())
        .then((data) => {
          this.setState({items: data});
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
    });


    }

    _like = () => {
      newitem = this.state.items;
      commentID = this.props.commentID;
      userID = this.state.userID;
      if (newitem.like_status == "1"){
        newitem.like_status = "-1";
        newitem.likes = parseInt(newitem.likes) - 1;
        fetch(`https://i.cs.hku.hk/~wyvying/php/fac/delete_like_status.php?commentID=${encodeURIComponent(parseInt(commentID))}&userID=${encodeURIComponent(parseInt(userID))}`, {
            method: "GET",
        });
      } else if (newitem.like_status == "0"){
        newitem.like_status = "1";
        newitem.likes = parseInt(newitem.likes) + 1;
        newitem.dislikes = parseInt(newitem.dislikes) - 1;
        fetch(`https://i.cs.hku.hk/~wyvying/php/fac/change_like_status.php?like_status=${encodeURIComponent(1)}&commentID=${encodeURIComponent(parseInt(commentID))}&userID=${encodeURIComponent(parseInt(userID))}`, {
            method: "GET",
        });
      } else {
        newitem.like_status = "1";
        newitem.likes = parseInt(newitem.likes) + 1;
        fetch(`https://i.cs.hku.hk/~wyvying/php/fac/add_like_status.php?like_status=${encodeURIComponent(1)}&commentID=${encodeURIComponent(parseInt(commentID))}&userID=${encodeURIComponent(parseInt(userID))}`, {
            method: "GET",
        });
      }
      this.setState({items: newitem});
    };

    _dislike = () => {
      newitem = this.state.items;
      commentID = this.props.commentID;
      userID = this.state.userID;
      if (newitem.like_status == "1"){
        newitem.like_status = "0";
        newitem.dislikes = parseInt(newitem.dislikes) + 1;
        newitem.likes = parseInt(newitem.likes) - 1;
        fetch(`https://i.cs.hku.hk/~wyvying/php/fac/change_like_status.php?like_status=${encodeURIComponent(0)}&commentID=${encodeURIComponent(parseInt(commentID))}&userID=${encodeURIComponent(parseInt(userID))}`, {
            method: "GET",
        });
      } else if (newitem.like_status == "0"){
        newitem.like_status = "-1";
        newitem.dislikes = parseInt(newitem.dislikes) - 1;
        fetch(`https://i.cs.hku.hk/~wyvying/php/fac/delete_like_status.php?commentID=${encodeURIComponent(parseInt(commentID))}&userID=${encodeURIComponent(parseInt(userID))}`, {
            method: "GET",
        });
      } else {
        newitem.like_status = "0";
        newitem.dislikes = parseInt(newitem.dislikes) + 1;
        fetch(`https://i.cs.hku.hk/~wyvying/php/fac/add_like_status.php?like_status=${encodeURIComponent(0)}&commentID=${encodeURIComponent(parseInt(commentID))}&userID=${encodeURIComponent(parseInt(userID))}`, {
            method: "GET",
        });
      }
      this.setState({items: newitem});
    };

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
  } else {
    return(
      <View>
      </View>
    );
  }
  }
}
