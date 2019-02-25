import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import sharedStyle from '../shared/style';
import ImagePicker from 'react-native-image-picker';

const mediaPlaceholder = require('../images/media-placeholder.jpg');

export default class ThirdScreen extends React.Component {

  state = {
    sourceUri: null,
    mediaType: 'image'
  }

  _chooseFile() {

    const options = {
      title: 'Select the perfect view',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      noData: true,
      customButtons: [
        {name: 'video', title: 'Take Video...'},
        {name: 'video_library', title: 'Choose Video from library...'},
      ]
    };

    const videoOptions = {
      storageOptions: {
        skipBackup: true,
        path: 'movies'
      },
      noData: true,
      mediaType: 'video'
    };

    ImagePicker.showImagePicker(options,
    (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton === 'video') {
        ImagePicker.launchCamera(videoOptions, this._processVideoSelection.bind(this));
      } else if (response.customButton === 'video_library') {
        ImagePicker.launchImageLibrary(videoOptions, this._processVideoSelection.bind(this));
      } else {
        this.setState({ sourceUri: response.uri });
      }
    });
  };

  _processVideoSelection(response) {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      this.setState({ sourceUri: response.uri });
    }  
  }

  _renderMedia() {
    var mediaSource = mediaPlaceholder;
    const sourceUri = this.state.sourceUri;
    if (sourceUri) {
      mediaSource = {uri: sourceUri};
    } 
    return (
      <Image source={ mediaSource } style={sharedStyle.image} resizeMode={'contain'} />
    );
  };

  render() {
    return (
    <TouchableOpacity style={sharedStyle.container} onPress={this._chooseFile.bind(this)}>
      <Text style={sharedStyle.h3}>Upload your image or video here</Text>
      {this._renderMedia()}
    </TouchableOpacity>
    );
  }
}