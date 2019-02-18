import React, { Component } from 'react';
import { View, Text, Image } from "react-native";

type Props = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
};
type State = {};

class Movie extends Component<Props, State> {

    render() {
        const { Title, Poster } = this.props;

        return (
            <View>
                <Text>{Title}</Text>
                <Image source={{ uri: Poster }} style={{width: 200, height: 200}} />    
            </View>
        );
    }
}

export default Movie;