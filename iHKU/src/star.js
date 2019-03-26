import React from 'react';
import {Text, View} from 'react-native';

export default class Star extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    if (this.props.rating == "1")
      return (
        <Text>
        <Text
          style={{
            color: 'rgba(255, 153, 204, 1)',
            marginLeft: 3,
          }}
        >★</Text>
        <Text
          style={{
            color: 'rgba(100, 100, 100, 1)',
          }}
        >☆☆☆☆</Text>
        </Text>
      );
    else if (this.props.rating == "2")
      return (
        <Text>
        <Text
          style={{
            color: 'rgba(255, 153, 204, 1)',
            marginLeft: 3,
          }}
        >★★</Text>
        <Text
          style={{
            color: 'rgba(100, 100, 100, 1)',
          }}
        >☆☆☆</Text>
        </Text>
      );
    else if (this.props.rating == "3")
      return (
        <Text>
        <Text
          style={{
            color: 'rgba(255, 153, 204, 1)',
            marginLeft: 3,
          }}
        >★★★</Text>
        <Text
          style={{
            color: 'rgba(100, 100, 100, 1)',
          }}
        >☆☆</Text>
        </Text>
      );
    else if (this.props.rating == "4")
      return (
        <Text>
        <Text
          style={{
            color: 'rgba(255, 153, 204, 1)',
            marginLeft: 3,
          }}
        >★★★★</Text>
        <Text
          style={{
            color: 'rgba(100, 100, 100, 1)',
          }}
        >☆</Text>
        </Text>
      );
    else if (this.props.rating == "0")
      return(
        <Text
          style={{
            color: 'rgba(100, 100, 100, 1)',
          }}
        >☆☆☆☆☆</Text>
      );
    else
      return (
        <Text
          style={{
            color: 'rgba(255, 153, 204, 1)',
            marginLeft: 3,
          }}
        >★★★★★</Text>

      );
  }
}
