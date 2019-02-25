import React, { Component } from 'react';
import Movie from "./Movie";
import { View, FlatList, RefreshControl } from "react-native";
import sharedStyle from '../shared/style';

type Props = {
};
type State = {};

class MovieList extends Component<Props, State> {

  renderMovie = ({ item }, index) => (
    <Movie key={item.imdbID} {...item} navigation={this.props.navigation} />
  );

  _keyExtractor = (item, index) => item.imdbID;

  _onEndReached = () => {
    this.props.loadMore();
  };

  _onRefresh = () => {
    this.props.refresh();
  }

  render()  {
    const { data } = this.props;
    if (!data || !data.length) return null;
    return (
      <View style={sharedStyle.container}>
      <FlatList
        data={data}
        scrollable
        keyExtractor={this._keyExtractor}
        renderItem={this.renderMovie}
        onEndReached={this._onEndReached}
        refreshing={false}
        refreshControl={
          <RefreshControl
            colors={['transparent']}
            tintColor='transparent'
            progressBackgroundColor='transparent'
            refreshing={false}
            onRefresh={this._onRefresh}
          />
          }
      />
    </View>
    );
  };

}

export default MovieList;
