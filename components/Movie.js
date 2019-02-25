import React, { Component } from 'react';
import { TouchableOpacity , Text, Image } from "react-native";
import sharedStyle from '../shared/style';

type Props = {
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string
};
type State = {};

class Movie extends Component<Props, State> {

  _viewMovieDetails() {
    this.props.navigation.navigate('MovieScreen', this.props);
  };

  render() {
    const { Title, Poster } = this.props;

    return (
      <TouchableOpacity  onPress={this._viewMovieDetails.bind(this)} >
        <Text style={sharedStyle.text}>{Title}</Text>
        <Image source={{ uri: Poster }} style={sharedStyle.image} resizeMode={'stretch'} />  
      </TouchableOpacity >
    );
  }
}

export default Movie;