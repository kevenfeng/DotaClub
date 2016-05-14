/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  Navigator,
  NavigatorIOS
} from 'react-native';

var TimerMixin = require('react-timer-mixin');

import SplashScreen from './SplashScreen';
import MainScreen from './MainScreen';

var _navigator;

var DotaClub = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      splashed: false,
    };
  },

  componentDidMount: function() {
    this.setTimeout(
        () => {
          this.setState({splashed: true});
        },
        2000,
    );
  },

  RouteMapper: function(route, navigationOperations, onComponentRef) {
    _navigator = navigationOperations;
    // return (
    //   <View style={styles.container}>
    //     <MainScreen navigator={navigationOperations}/>
    //   </View>
    // );
    if (route.name === 'home') {
      return (
          <View style={styles.container}>
            <MainScreen navigator={navigationOperations}/>
          </View>
      );
    }
  },

  render: function() {
    if (this.state.splashed) {
      var initialRoute = {name: 'home'};
      return (
        // <NavigatorIOS
        //   style={styles.container}
        //   initialRoute={{
        //     title: '首页',
        //     component: MainScreen,
        //   }}
        // />
          <Navigator
              style={styles.container}
              initialRoute={initialRoute}
              configureScene={() => Navigator.SceneConfigs.FadeAndroid}
              renderScene={this.RouteMapper}
          />
      );
      // return (
      //   <View style={styles.container}>
      //     <MainScreen />
      //   </View>
      // );
    } else {
      return (
          <SplashScreen />
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('DotaClub', () => DotaClub);
