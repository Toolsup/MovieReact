import React ,{Component , PureComponent} from 'react';
import { StyleSheet, ScrollView , FlatList, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import ApiRequest from '../networking/ApiRequest';
import Icon from 'react-native-vector-icons/Entypo';

class SettingActivity extends React.Component{

    onbackButton = () => {
        this.props.navigation.goBack(null);
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{width:'100%', height:64, backgroundColor: '#1A98DA', flexDirection: 'row',  marginTop: StatusBar.currentHeight}}>
                        <View style={{width:64, height: 64, justifyContent: 'center', marginLeft: 16}}>
                            <Icon size={24}  name='chevron-thin-left' color="#fff" onPress={this.onbackButton}/>
                        </View>

                        <Text style={{fontWeight : 'bold',color: '#fff', alignItems: 'center',justifyContent: 'center', textAlignVertical: "center", fontSize:18, textAlign:'center'}}>{'Movie apps'}</Text>
                </View>

            </View>
        );
    }

}
export default SettingActivity;