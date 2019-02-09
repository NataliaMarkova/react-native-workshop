import React from "react";
import { View, Text } from "react-native";
import { Button } from 'react-native';
import { ActivityIndicator } from 'react-native';
import fetchMovies from '../api/Fetch';

export default class FindScreen extends React.Component {

    state = {
        hideSpinner: true,
        hideButton: false
    }

    getContent() {
        this.setState({ hideSpinner: false,  hideButton: true });
        fetchMovies().then(result => {
            this.setState({ hideSpinner: true });
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
        return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
           {this._renderButton()}
           {this._renderSpinner()}
        </View>      
        );
    }
}

