import React, { Component } from 'react';
import { SafeAreaView , Text, Image } from "react-native";
import sharedStyle from '../shared/style';

type Props = {
  Title: string,
  Year: string,
  Rated: string,
  Released: string,
  Runtime:string,
  Genre: string,
  Director: string,
  Writer: string,
  Actors: string,
  Plot: string,
  Language: string,
  Country: string,
  Awards: string,
  Poster: string,
  Ratings: object,
  Metascore: string,
  imdbRating: string,
  imdbVotes: string,
  imdbID: string,
  Type:string,
  DVD: string,
  BoxOffice: string,
  Production: string,
  Website: string,
  Response: strings,
};
type State = {};

class MovieDetails extends Component<Props, State> {

  render() {
    const props = this.props;
    return (
      <SafeAreaView style={sharedStyle.container}>
        <Text style={sharedStyle.h3}>{props.Title}</Text>
        <Text style={sharedStyle.text}>Year: {props.Year}</Text>
        <Text style={sharedStyle.text}>Released: {props.Released}</Text>
        <Text style={sharedStyle.text}>Runtime: {props.Runtime}</Text>
        <Text style={sharedStyle.text}>Genre: {props.Genre}</Text>
        <Text style={sharedStyle.text}>Language: {props.Language}</Text>
        <Text style={sharedStyle.text}>Country: {props.Country}</Text>
        <Text style={sharedStyle.text}>IMDB rating: {props.imdbRating}</Text>
        <Image source={{ uri: props.Poster }} style={sharedStyle.image} resizeMode={'contain'} />  
      </SafeAreaView >
    );
  }
}

export default MovieDetails;
