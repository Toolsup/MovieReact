import React, {Component, PureComponent} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AddFriendActivity from '../screen/AddFriendActivity';
import PagerFragment from '../screen/PagerFragment';
import DetailActivity from '../screen/DetailActivity';
import { StyleSheet, ScrollView , Text, View, Button, StatusBar, Image, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MainTab = createStackNavigator (
  {
    List: {
        screen: AddFriendActivity,
        navigationOptions:{
            header: null,
        },
    },
  },
)

const SettingsTab = createStackNavigator(
  {
    List: {
      screen: AddFriendActivity,
      navigationOptions:{
          header: null,
      },
    },
  },
);

const DataTab = createStackNavigator(
  {
    Movie: {
      screen: PagerFragment,
      navigationOptions:{
        header: null,
      },
    },
  },
);

// const One = StackNavigator(
//   {
//     main: { screen: Main } // only has one route
//   },
//   {
//     navigationOptions: {
//       headerMode: 'screen' // enabling header mode for main screen
//     }
//   }
// );
// const AppNavigator = DrawerNavigator({
//   one: { screen: One },
//   two: { screen: Two }
// });


const DetailTask = createStackNavigator(
  {
    Detail: {
      screen: DetailActivity,
      navigationOptions:{
        header: null,
      },
    },
  },
);

const AhiTab = createStackNavigator(
  {
    List: {
      screen: AddFriendActivity,
      navigationOptions:{
          header: null,
      },
    },
  },
);
  
// const navigationData = createAppContainer(MainNavigator);
const MainApp = createBottomTabNavigator(
  {
    MainTab: MainTab ,
    SettingsTab: SettingsTab ,
    DiscoverTab: DataTab ,
    SearchTab: AhiTab ,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'MainTab') {
          return (
            <View style={{width:64, height: 64, justifyContent: 'center', alignItems: 'center'}}>
              <Icon size={24}  name='home' color="#000"/>
            </View>
          );
        } else if (routeName === 'SettingsTab') {
          return (
            <View style={{width:64, height: 64, justifyContent: 'center', alignItems: 'center'}}>
              <Icon size={24}  name='cog' color="#000"/>
            </View>
          );
        } else if (routeName === 'DiscoverTab') {
          return (
            <View style={{width:64, height: 64, alignItems: 'center', justifyContent: 'center'}}>
              <Icon size={24}  name='leanpub' color="#000"/>
            </View>
          );
        } else {
          return (
            <View style={{width:64, height: 64, justifyContent: 'center', alignItems: 'center'}}>
              <Icon size={24}  name='search' color="#000"/>
            </View>
          );
        }
      },
      
    }),
    tabBarOptions: {
      labelStyle: {
        fontSize: 16,
        margin: 0,
        padding: 0,
      },
      style:{height: 64},
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
  }
);


const AppNavigator = createStackNavigator({
    Main: {
      screen: MainApp,
      navigationOptions:{
        header: null,
      },
    },
    DetailAhi: {
      screen: DetailTask,
      navigationOptions:{
        header: null,
      },
    },
});

const navigationData = createAppContainer(AppNavigator);

export default navigationData;