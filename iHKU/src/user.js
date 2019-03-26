import React from 'react';
import { View, Text } from 'react-native';

export default class User extends React.Component{
  constructor(props) {
    super(props);
    this.state = {username: ""};
  }

  componentDidMount(){
    const data = {UserID: this.props.User_ID};
    fetch(`https://i.cs.hku.hk/~wyvying/php/get_nickname.php?UserID=${encodeURIComponent(parseInt(data.UserID))}`, {
        method: "GET",
    })
    .then(response => response.json()) // parses response to JSON
    .then((data) => {
        this.setState({username: data.username});

      })
      .catch(error => console.error(error));

  }

  render(){
    return(
      <Text>{this.state.username}</Text>
    );
  }
}
