'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Drawer from 'react-native-drawer';
import StoriesList from './StoriesList';
import ThemesList from './ThemesList';

var DRAWER_REF = 'drawer';

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: null,
    };
  }
  onSelectTheme(theme) {
    this.refs[DRAWER_REF].close();
    this.setState({theme: theme});
  }
  onRefresh() {
    this.onSelectTheme(this.state.theme);
  }
  render() {
    var drawer = <ThemesList onSelectItem={this.onSelectTheme} />;
    return (
        <Drawer
          ref={DRAWER_REF}
          openDrawerOffset={100}
          panCloseMask={1}
          content={drawer} >
          <StoriesList theme={this.state.theme} navigator={this.props.navigator}/>
        </Drawer>
      );
  }
};

module.exports = MainScreen;
