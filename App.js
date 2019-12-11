import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyNavigation from './view/MyNavigation';


class App extends React.Component{
  render() {
      return (
          <MyNavigation/>
      );
  }
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
