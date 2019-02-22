import React from "react";
import { SafeAreaView  } from "react-native";
import { TouchableOpacity, Text } from 'react-native';
import { fetchMovies } from '../api';
import { MovieList, Spinner } from '../components';
import sharedStyle from '../shared/style';
import Moment from 'moment';

export default class FindScreen extends React.Component {

  state = {
    hideSpinner: true,
    hideButton: false,
    data: null,
    page: 1,
    refresh: false,
    lastUpdated: undefined
  };

  getContent() {
    this.setState({ hideSpinner: false,  hideButton: true });
    fetchMovies(this.state.page, this.state.refresh)
    .then(result => {
      if (this.state.data && this.state.refresh === false)  {
        this.state.data.push(...result)
      } else {
        this.setState({ data: result });
      }
      if (this.state.refresh) {
        this.setState({ lastUpdated: new Date()});  
      }
      this.setState({ hideSpinner: true, refresh: false });
    })
    .catch(error => {
      console.error(error);
      this.setState({ hideSpinner: true, hideButton: fasle });
    });
  };

  loadMore = () => {
    this.setState((state) => ({ page: state.page + 1}), this.getContent);
  };

  refresh = () => {
    this.setState((state) => ({ page: 1, refresh: true }) , this.getContent);
  };

  _renderSpinner() {
    if (this.state.hideSpinner) {
      return null;
    } else {
      return (
        <Spinner />
      )
    }
  };

  _renderButton() {
    if (this.state.hideButton) {
      return null;
    } else {
      return (
        <TouchableOpacity
          onPress={this.getContent.bind(this)}
          style={sharedStyle.button} >
          <Text style={sharedStyle.buttonLabel}>Find Stuff</Text>
        </TouchableOpacity>
      )
    }
  };

  _renderLastUpdated() {
    const lastUpdated = this.state.lastUpdated;
    if (lastUpdated === undefined) {
      return null;
    } else {
      return (
        <Text style={sharedStyle.lastUpdated}>
          Last updated: {this._formatDate(lastUpdated)}
        </Text>
      )
    }
  };

  _formatDate(date) {
    Moment.locale('en');
    return Moment(date).format('DD MMM YYYY HH:mm:ss');
  }

  render() {
    const { data } = this.state;
    return (
      <SafeAreaView style={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'red', flex: 1, 
          justifyContent: 'center', alignItems: 'center' }}>
        {this._renderButton()}
        {this._renderSpinner()}
        {this._renderLastUpdated()}
        <MovieList data={data} loadMore={this.loadMore} refresh={this.refresh}></MovieList>
      </SafeAreaView>
    );
  };
}

