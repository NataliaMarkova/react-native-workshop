import React, { Component } from 'react';
import Movie from "./Movie";
import { View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
};
type State = {};

class MovieList extends Component<Props, State> {

    renderMovie = (item, index) => (
        <Movie key={index} {...item} />
    );

    render()  {
        const { data } = this.props;
        if (!data || !data.length) return null;
        return (
            <ScrollView contentContainerStyle = {{flexGrow: 1}} >
                {data.map(this.renderMovie)}
            </ScrollView>
        );
    }

}

export default MovieList;
