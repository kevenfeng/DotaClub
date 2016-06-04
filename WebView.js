'use strict';

import React, { Component } from 'react';
import {
    View,
    requireNativeComponent,
    PropTypes
} from 'react-native';

import ReactNativeViewAttributes from 'ReactNativeViewAttributes';

class ObservableWebView extends React.Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }

  _onChange(event: Event) {
    if (!this.props.onScrollChange) {
      return;
    }
    this.props.onScrollChange(event.nativeEvent.ScrollY);
  }

  render() {
    return <RCTWebView {...this.props} onChange={this._onChange} />;
  }
}

ObservableWebView.propTypes = {
  ...View.propTypes,
  url: PropTypes.string,
  html: PropTypes.string,
  css: PropTypes.string,
  onScrollChange: PropTypes.func,
};
//
// ObservableWebView.viewConfig = {
//   uiViewClassName: 'RCTWebView',
//   validAttributes: ReactNativeViewAttributes.RKView
// };

var RCTWebView = requireNativeComponent('RCTWebView', ObservableWebView, {
  nativeOnly: {onChange: true}
});

module.exports = ObservableWebView;
