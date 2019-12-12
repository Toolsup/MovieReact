import React, {Component, PureComponent} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AddFriendActivity from '../screen/AddFriendActivity';
import PagerFragment from '../screen/PagerFragment';
import SearchActivity from '../screen/SearchActivity';
import CategoryActivity from '../screen/CategoryActivity';
import DetailActivity from '../screen/DetailActivity';
import SettingActivity from '../screen/SettingActivity';
import { StyleSheet, ScrollView , Text, View, Button, StatusBar, Image, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MainTab = createStackNavigator (
  {
    List: {
        screen: AddFriendActivity,
        navigationOptions:{
            header: null,
        },
        params:{
          key: 'ahi',
        },
    },
  },
)

const SettingsTab = createStackNavigator(
  {
    Setting: {
      screen: SettingActivity,
      navigationOptions:{
        header: null,
      },
      params:{
        key: 'setting',
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
      params:{
        key: 'data',
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
      params:{
        key: 'detail',
      },
    },
  },
);


const CategoryTab = createStackNavigator(
  {
    Category: {
      screen: CategoryActivity,
      navigationOptions:{
          header: null,
      },
      params:{
        key: 'category',
      },
    },
  },
);
  

const SearchTab = createStackNavigator(
  {
    Search: {
      screen: SearchActivity,
      navigationOptions:{
          header: null,
      },
    },
  },
);
  
const MainApp = createBottomTabNavigator(
  {
    Main: MainTab ,
    Category: CategoryTab ,
    Data: DataTab ,
    Settings: SettingsTab ,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Main') {
          return (
            <View style={{width:64, height: 64, justifyContent: 'center', alignItems: 'center'}}>
              <Icon size={24}  name='home' color="#000"/>
            </View>
          );
        } else if (routeName === 'Settings') {
          return (
            <View style={{width:64, height: 64, justifyContent: 'center', alignItems: 'center'}}>
              <Icon size={24}  name='cog' color="#000"/>
            </View>
          );
        } else if (routeName === 'Data') {
          return (
            <View style={{width:64, height: 64, alignItems: 'center', justifyContent: 'center'}}>
              <Icon size={24}  name='leanpub' color="#000"/>
            </View>
          );
        } else if (routeName === 'Category') {
          return (
            <View style={{width:64, height: 64, justifyContent: 'center', alignItems: 'center'}}>
              <Icon size={24}  name='list-alt' color="#000"/>
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