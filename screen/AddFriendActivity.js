import React, {Component, PureComponent} from 'react';
import {Dimensions, BackHandler} from 'react-native';
import { StyleSheet, Text, View, Button, Alert, StatusBar, RefreshControl, Image, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { ToolbarAndroid } from 'react-native-gesture-handler';
import ApiRequest from '../networking/ApiRequest';
import {DOMAIN_API} from '../networking/ApiRequest'
import Icon from 'react-native-vector-icons/Entypo';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import {handleAndroidBackButton , removeAndroidBackButtonHandler} from '../utils/Utils';





class Item extends React.PureComponent{
    render() {
        return (
            <TouchableOpacity style={styles.container}
                onPress = {this.props.pressItem}>
                <View style={styles.items}>
                    <Image style = {styles.image_movie}
                        source = {{uri: this.props.mUrl}}
                        thumbnail = {require('../images/poster_placeholder.jpg')}
                    />
                    <Text style = {styles.textstyle} numberOfLines={1}>
                        {this.props.mTitle}
                    </Text>
                
                    
                </View>
                
            </TouchableOpacity>
        );
    }
}


class AddFriendActivity extends React.Component{

    _isMount = false;

    constructor(props) {
        super(props);
        
        this.state = {
            columns: 3,
            isLoading: false,
            isRefresh: true,
            data: [],
            startPage: 1,    
        };
    }


    onPressItem = (mTitle, mId, mType) => () => {
        const {navigate} = this.props.navigation;
        navigate('DetailAhi', {title: mTitle, id: mId, type: mType})
    }
     

   
    

    getData = async(page) =>{

        if(!this.state.isLoading){
            try{
                if(this._isMount){
                    this.setState({
                        isLoading: true,
                    })
                }

                const request = new ApiRequest({
                    //truyen props vao day
                }); 

                const dataDiscover = await request.getDiscoverApi(page, 'tv');
                if(this._isMount){
                    this.setState({
                        data: this.state.data.concat(dataDiscover.results),
                        isLoading: false,
                    });
                }
            }catch(e){
                console.log('page data ahihi error');
            }
        }

    
    }



    onLoadMoreHandler = () => {
        if(this._isMount){
            this.setState({
                startPage: this.state.startPage + 1,
            }, () => {
            this.getData(this.state.startPage);
            });
        }
   }

   renderFooter = () => {
        if(!this.state.isLoading && this.state.startPage === 1) return null;
        return (
            <View>
                <ActivityIndicator 
                    size={'large'}
                    animating= {true}
                    color={'#000'}
                />
            </View> 
        );
    };

    componentWillUnmount(){
        this._isMount = false;
        console.log('willmount un');
        removeAndroidBackButtonHandler();
    }

    componentWillMount(){
        handleAndroidBackButton(this.showDialogExitApp); 
    }

    componentDidMount(){
        this._isMount = true; 
        this.getData(1);       
       
    }


    showDialogExitApp = () => {
        console.log('willmount back')
        Alert.alert(
            '',
            'Do you want exit app?',
            [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', 
                onPress: () =>  BackHandler.exitApp(),
            
            },
            ],
            {cancelable: false},
        );
        return true;
    }

    refreshHandler = () => {
        if(this._isMount){
            this.setState({
                startPage: 1,
                data: [],
                isLoading: false,
                isRefresh : true,
            }, () => {
                this.getData(this.state.startPage);
            })
        }
    }

    

    render() {
        
        return (
            
                <View style= {{flex: 1}}>            
                    <View style={{width:'100%', height:64, backgroundColor: '#1A98DA', flexDirection: 'row',  marginTop: StatusBar.currentHeight}}>
                        <View style={{width:64, height: 64, justifyContent: 'center', marginLeft: 16}}>
                            <Icon size={24}  name='chevron-thin-left' color="#fff" onPress= {this.showDialogExitApp}/>
                        </View>

                        <Text style={{fontWeight : 'bold',color: '#fff', alignItems: 'center',justifyContent: 'center', textAlignVertical: "center", fontSize:18, textAlign:'center'}}>{'Movie apps'}</Text>
                    
                    
                        <View style={{flex: 1, flexDirection: 'row', marginRight: 18, justifyContent: 'flex-end', alignItems: 'center', marginLeft: 16}}>
                            <IconAwesome size={24}  name='search' color="#fff"/>
                        </View>

                    </View>

                    <FlatList 
                        numColumns={this.state.columns}
                        data = {this.state.data}
                        renderItem = {({ item }) => (
                            <Item
                                pressItem = {this.onPressItem(item.original_name, item.id, "tv")}
                                mTitle = {item.original_name}
                                mUrl = {"https://image.tmdb.org/t/p/w342".concat(item.poster_path)}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    
                        ListFooterComponent = {this.renderFooter}
                        onEndReached = {this.onLoadMoreHandler}
                        onEndReachedThreshold={0.6}
                        refreshControl ={ 
                            <RefreshControl 
                                refreshing = {this.state.startPage == 1 && !this.state.isRefresh}
                                onRefresh = {this.refreshHandler} 
                            />
                        }
                    
                    />     
                    

                </View>   

        
        );
    }
}



const styles = StyleSheet.create({

    fatlistStyle: {
        flex: 1,
        backgroundColor: '#fff',
    },

    loadingStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image_movie: {
        flex: 1,
        width: '90%',
        height:  ((9/7) * (Dimensions.get('window').width / 3)),
        alignItems: 'center',
        justifyContent: 'center',
    },

    items: {
        flex: 1,
        margin: 8,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
    },
    textstyle: {
        color: '#007ACC',
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        justifyContent: 'flex-start',
    },
  });
export default AddFriendActivity