import React from "react";
import { SafeAreaView  } from "react-native";
import { TouchableOpacity, Text, Picker } from 'react-native';
import { fetchMovies } from '../api';
import { MovieList, Spinner } from '../components';
import sharedStyle from '../shared/style';
import Moment from 'moment';

export default class FindScreen extends React.Component {

  static navigationOptions = {
    headerTitle: 'Movies',
  };

  state = {
    hideSpinner: true,
    hideButton: false,
    data: null,
    page: 1,
    refresh: false,
    invalidateCache: false,
    lastUpdated: undefined,
    years: [],
    selectedYear: null
  };

  componentWillMount() {
    var year = new Date().getFullYear();
    for (i = 0; i <= 50; i++) {
      this.state.years.push(year--);
    }
  };

  getContent() {
    this.setState({ hideSpinner: false,  hideButton: true });
    const options = {
      page: this.state.page,
      invalidateCache: this.state.invalidateCache,
      selectedYear: this.state.selectedYear
    };
    fetchMovies(options)
    .then(result => {
      if (this.state.data && this.state.refresh === false)  {
        this.state.data.push(...result)
      } else {
        this.setState({ data: result });
      }
      if (this.state.refresh) {
        this.setState({ lastUpdated: new Date()});  
      }
      this.setState({ hideSpinner: true, refresh: false, invalidateCache: false });
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
    this.setState((state) => ({ page: 1, refresh: true, invalidateCache: true }) , this.getContent);
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
        <Text style={sharedStyle.importantText}>
          Last updated: {this._formatDate(lastUpdated)}
        </Text>
      )
    }
  };

  _formatDate(date) {
    Moment.locale('en');
    return Moment(date).format('DD MMM YYYY HH:mm:ss');
  };

  _renderYearSelector() {
    return (
      <Picker
        style={{height: 50, width: '50%'}}
        selectedValue={this.state.selectedYear }
        onValueChange={this._selectedYearOnChange.bind(this)}>
        <Picker.Item key={-1} label='Not selected' value={null}/>
        {this.state.years.map(this._renderYearItem)}
      </Picker>
    );
  };

  _selectedYearOnChange(selectedYear, index) {
    this.setState((state) => ({ selectedYear: selectedYear, refresh: true }), this.getContent);
  };

  _renderYearItem(year, index) {
    return <Picker.Item key={index} label={`${year}`} value={year}/>
  };

  render() {
    const { data } = this.state;
    return (
      <SafeAreaView style={sharedStyle.container}>
        <Text style={sharedStyle.text}>Search by year</Text>
        {this._renderLastUpdated()}
        {this._renderYearSelector()}
        {this._renderButton()}
        {this._renderSpinner()}
        <MovieList data={data} loadMore={this.loadMore} refresh={this.refresh} navigation={this.props.navigation}></MovieList>
      </SafeAreaView>
    );
  };
}

