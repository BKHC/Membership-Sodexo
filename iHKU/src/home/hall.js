import React from 'react';
import { View, Text } from 'react-native';

export default class Hall extends React.Component{
  constructor(props) {
    super(props);
    this.state = {hallname: "Default-Hall"};
  }

  componentDidMount(){
    const data = {Hall_ID: this.props.Hall_ID};
    /***
    fetch(`https://i.cs.hku.hk/~wyvying/test.php?Hall_ID=${encodeURIComponent(data.User_ID)}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
    })
      .then((data) => {
        alert(JSON.stringify(data));
        this.setState({hallname: data)});

      }) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
      ***/
  }

  render(){
    return(
      <Text>{this.state.hallname}</Text>
    );
  }
}
