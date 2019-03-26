import React from 'react';
import { View, Text } from 'react-native';

export default class User extends React.Component{
  constructor(props) {
    super(props);
    this.state = {username: "Roy"};
  }

  componentDidMount(){
    const data = {User_ID: this.props.User_ID};
    /***
    fetch(`https://i.cs.hku.hk/~wyvying/test.php?Hall_ID=${encodeURIComponent(data.User_ID)}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
    })
    //.then(response => response.json()); // parses response to JSON
      .then((data) => {
        alert(JSON.stringify(data));
        this.setState({username: data)});

      }) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
      ***/
  }

  render(){
    return(
      <Text>{this.state.username}</Text>
    );
  }
}
