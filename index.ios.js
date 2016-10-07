/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    NavigatorIOS,
    TouchableOpacity,
    Platform
} from 'react-native';

//var TimerMixin = require('react-timer-mixin');

import SplashScreen from './SplashScreen';
import MainScreen from './MainScreen';
import StoryScreen from './StoryScreen';
import Icon from 'react-native-vector-icons/Ionicons';

var _navigator;

class DotaClub extends Component {

    constructor(props) {
        super(props);

        this.state = {
            splashed: false,
            hideNavBar: false,
        };
        this._willFocus = this._willFocus.bind(this);
        this.RightButton = this.RightButton.bind(this);
    }

  componentDidMount() {
    setTimeout(
        () => {
          this.setState({splashed: true});
        },
        2000
    );
  }

  RouteMapper(route, navigationOperations, onComponentRef) {
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
    } else if (route.name === 'story') {
        return (
            <View style={styles.container}>
                <StoryScreen
                    style={{flex: 1}}
                    navigator={navigationOperations}
                    story={route.story} />
            </View>
        );
    }
  }


    // Nav使用
    navBar() {
        if(!this.state.hideNavBar) {
            return <Navigator.NavigationBar
                routeMapper={{
                      LeftButton: this.LeftButton,
                      RightButton: this.RightButton,
                      Title: this.Title
                  }}
                style={styles.navBar}
            />;
        } else {
            return <Text style={{height:0,position:'absolute',top:0}} />;
        }
    }

    LeftButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity
                onPress={() => navigator.pop()}
                style={styles.navBarLeftButton}>
                <Icon
                    name='ios-arrow-dropleft'
                    size={30}
                    color='#666'
                    style={styles.icon}
                />
            </TouchableOpacity>
        );
    }
    RightButton(route, navigator, index, navState) {
        if(route.isStar) {
            return (
                <TouchableOpacity
                    onPress={()=>this._changeDetailStar(route,navigator,this.state.starDatas)}
                    style={styles.navBarRightButton}>
                    <Icon
                        name='ios-star'
                        size={30}
                        color='#333'
                        style={styles.icon}
                    />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={()=>this._changeDetailStar(route,navigator,this.state.starDatas)}
                    style={styles.navBarRightButton}>
                    <Icon
                        name='ios-star-outline'
                        size={30}
                        color='#333'
                        style={styles.icon}
                    />
                </TouchableOpacity>
            );
        }
    }
    _changeDetailStar(route,navigator) {

    }
    Title(route, navigator, index, navState) {
        return null;
    }
    // 监听的回调
    _willFocus(route) {
        if(route.sence == 'detail') {
            // 这里写逻辑来加载收藏的路由
            this.setState({
                hideNavBar:false,
            });
        } else {
            this.setState({
                hideNavBar:true,
            });
        }
    }
  render() {
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
              navigationBar={this.navBar()}
              onWillFocus={this._willFocus}
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
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    navBar: {
        backgroundColor:'#fff',
        borderColor:'#dddddd',
        borderWidth:1,
        height: (Platform.OS === 'ios')? 64: 48
    },
    navBarTitleText: {
        fontWeight: '500',
    },
    navBarLeftButton: {
        paddingLeft: 5,
    },
    navBarRightButton: {
        marginRight:5,
    },
    icon: {
        width:30,
        height:30,
        marginTop:(Platform.OS === 'ios')? 6: 9,
        textAlign:'center'
    }
});

AppRegistry.registerComponent('DotaClub', () => DotaClub);
