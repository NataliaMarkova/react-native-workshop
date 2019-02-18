import React, { Component } from 'react';
import { Animated, Easing, Text } from "react-native";

type Props = {};
type State = {};

class Spinner extends Component<Props, State> {

  rotate = new Animated.Value(0);

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.rotate, {
        toValue: 360,//\\
        duration: 1500,
        easing: Easing.linear(),
      })
    ).start()
  }

  render() {

    return (
      <Animated.Image
        source={ require('../images/spinner.jpeg') }
          style={{
            height: 100,
            width: 100,
            backgroundColor: 'transparent',
            transform: [{
              rotate: this.rotate.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              })
            }],
          }}
       />
    );
  }
}

export default Spinner;
