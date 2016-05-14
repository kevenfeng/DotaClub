'use strict';

import React, { Component } from 'react';
import {
    AsyncStorage,
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

import Animated from 'Animated';

var WINDOW_WIDTH = Dimensions.get('window').width;

import DataRepository from './DataRepository';

var repository = new DataRepository();

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cover: null,
            bounceValue: new Animated.Value(1),
        };
    }
  fetchData() {
    repository.getCover()
      .then((result) => {
        if (result){
          this.setState({cover: result});
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .done();
    repository.updateCover();
  }

  componentDidMount() {
    this.fetchData();
    this.state.bounceValue.setValue(1);
    Animated.timing(
      this.state.bounceValue,
      {
        toValue: 1.2,
        duration: 5000,
      }
    ).start();
  }
  render() {
    var img, text;
    if (this.state.cover) {
      img = {uri: this.state.cover.img};
      text = this.state.cover.text;
    } else {
      img = require('image!splash');
      text = '';
    }

    return(
      <View style={styles.container}>
        <Animated.Image
          source={img}
          style={{
            flex: 1,
            width: WINDOW_WIDTH,
            height: 1,
            transform: [
              {scale: this.state.bounceValue},
            ]
          }} />
        <Text style={styles.text}>
            {text}
        </Text>
        <Image style={styles.logo} source={require('image!splash_logo')} />
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  cover: {
    flex: 1,
    width: 200,
    height: 1,
  },
  logo: {
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    height: 54,
    backgroundColor: 'transparent',
  },
  text: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    backgroundColor: 'transparent',
  }
});

module.exports = SplashScreen;
