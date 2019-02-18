import React from "react";
import { View } from "react-native";
import { Button } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { fetchMovies } from '../api';
import { MovieList } from '../components';
import sharedStyle from '../shared/style';

export default class FindScreen extends React.Component {

    state = {
        hideSpinner: true,
        hideButton: false,
        data: null
    }

    getContent() {
        this.setState({ hideSpinner: false,  hideButton: true });
        fetchMovies()
        .then(result => {
            console.log(result);
            this.setState({ hideSpinner: true, data: result });
        })
        .catch(error => {
            console.error(error);
            this.setState({ hideSpinner: true, hideButton: fasle });
        });
    }

    _renderSpinner() {
        if (this.state.hideSpinner) {
            return null;
        } else {
            return (
                <ActivityIndicator hide={this.state.hideSpinner} size="large" color="#0000ff" />
            )
        }
    }

    _renderButton() {
        if (this.state.hideButton) {
            return null;
        } else {
            return (
                <Button
                    onPress={this.getContent.bind(this)}
                    title="Find Stuff"
                    color="#841584"
                    accessibilityLabel="To find some movies click here"
                />
            )
        }
    }

    render() {
        const { data } = this.state;
        return (
        <View  style={[ sharedStyle.container, ]} >
           {this._renderButton()}
           {this._renderSpinner()}
           <MovieList data={data} ></MovieList>
        </View>      
        );
    }
}

