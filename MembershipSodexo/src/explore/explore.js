import React, { Component } from 'react';
import { Dimensions, View, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { height, width } = Dimensions.get('window');

class TeamScroll extends Component {

    state = {
        images: [
            'https://unsplash.it/300/?random',
            'https://unsplash.it/350/?random',
            'https://unsplash.it/400/?random',
            'https://unsplash.it/450/?random',
            'https://unsplash.it/500/?random',
            'https://unsplash.it/550/?random',
            'https://unsplash.it/600/?random'
        ]
    };

    renderItem = ({item, index}) => {
        return (
            <Image style={styles.logoStyle} source={{ uri: item }} />
        );
    }

    render () {
        return (
            <View>
                <View style={{
                    transform: [{
                        rotate: '-14deg'
                    }]
                }}>
                    <Carousel
                      inactiveSlideOpacity={0.6}
                      inactiveSlideScale={0.65}
                      firstItem={1}
                      sliderWidth={width}
                      itemWidth={width / 3}
                      data={this.state.images}
                      renderItem={this.renderItem}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    logoStyle: {
        transform: [{
            rotate: '14deg'
        }],
        width: width / 3,
        height: width / 3
    }
};

export default TeamScroll;
