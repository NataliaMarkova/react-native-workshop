import React, { Component } from 'react';
import { getMovieDetails } from '../api';
import MovieDetails from '../components/MovieDetails';

type Props = {};
type State = {};

export default class MovieScreen extends Component<Props, State> {

  state = {
    data: null
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('Title')
    };
  };

  getMovieDetails() {
    const imdbID = this.props.navigation.getParam('imdbID');
    getMovieDetails(imdbID)
    .then(result => {
      this.setState({ data: result });
    })
    .catch(error => {
      console.error('getMovieDetails', error);
      this.setState({ hideSpinner: true, hideButton: fasle });
    });
  };

  componentDidMount() {
    this.getMovieDetails();
  };

  render() {  
    if (this.state.data) {
      const { data } = this.state;
      return (
        <MovieDetails {...data}/>
      )
    } else {
      return null;
    }
  };
}
