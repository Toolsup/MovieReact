import React, {Component, PureComponent} from 'react';
import {Dimensions} from 'react-native';
import { StyleSheet, Text, View, Button, StatusBar, RefreshControl, Image, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import ApiRequest from '../networking/ApiRequest';
import Icon from 'react-native-vector-icons/Entypo'; 
import {IndicatorViewPager, PagerTitleIndicator} from 'rn-viewpager';


class ItemShows extends React.PureComponent{
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

class ItemMovie extends React.PureComponent{
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

class PagerFragment extends React.Component{


   

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['Movies', 'TV Shows']} />;
    }


    render() {
        
        return (
      
            <View style= {{flex: 1, flexDirection : 'column'}}>
                <StatusBar hidden={false} />
        
                <View style={{width:'100%', height:64, backgroundColor: '#1A98DA', flexDirection: 'row',  marginTop: StatusBar.currentHeight}}>
                
                    <View style={{width:64, height: 64, justifyContent: 'center', marginLeft: 16}}>
                        <Icon size={24}  name='chevron-thin-left' color="#fff"/>
                    </View>

                    <Text style={{fontWeight : 'bold',color: '#fff', alignItems: 'center',justifyContent: 'center', textAlignVertical: "center", textAlign: "center", fontSize:18, textAlign:'center'}}>{'Movie apps'}</Text>
                </View>
                <View style={{flex:1}}>

               
                    <IndicatorViewPager
                            style={{flexDirection: 'column-reverse', flex:1, backgroundColor:'white'}}
                            indicator={this._renderTitleIndicator()}> 

                            <View>
                                <MovieFragment navigate = {this.props.navigation} style={{height : '100%'}}/>
                            </View>

                            <View>
                                <TVShowFragment navigate = {this.props.navigation} style={{height : '100%'}}/>
                            </View>
                          

                    </IndicatorViewPager>

                </View>

            </View>
        )
    };
}

class MovieFragment extends React.Component{

    _amount = false;


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
        const {navigate} = this.props.navigate;
        navigate('Detail', {title: mTitle, id: mId, type: mType})
    }
     

   componentWillUnmount(){
       this._amount = false;
   }
    

    getData = async(page, type) =>{

       
            try{
               
                const request = new ApiRequest({
                    //truyen props vao day
                }); 

                const dataDiscover = await request.getDiscoverApi(page, type);
                if(this._amount){
                    this.setState({
                        isLoading: true,
                    })
    
                    
                    this.setState({
                        data: this.state.data.concat(dataDiscover.results),
                        isLoading: false,
                    });
                    
                }

            }catch(e){
                console.log('page data ahihi error');
            }
          
    }



    onLoadMoreHandler = () => {
        if(this._amount){
            this.setState({
                startPage: this.state.startPage + 1,
            }, () => {
                this.getData(this.state.startPage, 'movie');
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


    componentDidMount(){
        console.log('willmount didmount');
        this._amount = true;
        this.getData(1, 'movie');
    }

    refreshHandler = () => {
        if(this._amount){
            this.setState({
                startPage: 1,
                data: [],
                isLoading: false,
                isRefresh : true,
            }, () => {
                this.getData(this.state.startPage, 'movie');
            })
        }
    }


  

    render() {

        console.log('dau ma render')
        
        return (
            
                <View style= {{flex: 1, flexDirection : 'column'}}>
    
                        <View style={{backgroundColor:'#fff'}}>
                            <FlatList 
                                numColumns={this.state.columns}
                                data = {this.state.data}
                                renderItem = {({ item }) => (
                                    <ItemMovie
                                        pressItem = {this.onPressItem(item.title, item.id, "movie")}
                                        mTitle = {item.title}
                                        mUrl = {"https://image.tmdb.org/t/p/w500".concat(item.poster_path)}
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


                </View>   
        
        
        );
    }
}


class TVShowFragment extends React.Component{

    _amount = false;


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
        const {navigate} = this.props.navigate;
        navigate('Detail', {title: mTitle, id: mId, type: mType})
    }
     

   componentWillUnmount(){
       this._amount = false;
   }
    

    getData = async(page, type) =>{

       
            try{
               
                const request = new ApiRequest({
                    //truyen props vao day
                }); 

                const dataDiscover = await request.getDiscoverApi(page, type);
                if(this._amount){
                    this.setState({
                        isLoading: true,
                    })
    
                    
                    this.setState({
                        data: this.state.data.concat(dataDiscover.results),
                        isLoading: false,
                    });
                    
                }

            }catch(e){
                console.log('page data ahihi error');
            }
          
    }



    onLoadMoreHandler = () => {
        if(this._amount){
            this.setState({
                startPage: this.state.startPage + 1,
            }, () => {
                this.getData(this.state.startPage, 'tv');
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


    componentDidMount(){
        console.log('willmount didmount');
        this._amount = true;
        this.getData(1, 'tv');
    }

    refreshHandler = () => {
        if(this._amount){
            this.setState({
                startPage: 1,
                data: [],
                isLoading: false,
                isRefresh : true,
            }, () => {
                this.getData(this.state.startPage, 'tv');
            })
        }
    }


  

    render() {

        console.log('dau ma render')
        
        return (
            
                <View style= {{flex: 1, flexDirection : 'column'}}>
    
                        <View style={{backgroundColor:'#fff'}}>
                            <FlatList 
                                numColumns={this.state.columns}
                                data = {this.state.data}
                                renderItem = {({ item }) => (
                                    <ItemShows
                                        pressItem = {this.onPressItem(item.original_name, item.id, "tv")}
                                        mTitle = {item.original_name}
                                        mUrl = {"https://image.tmdb.org/t/p/w500".concat(item.poster_path)}
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


                </View>   
        
        
        );
    }
}




const styles = StyleSheet.create({

    style_viewpager: {
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
// export default MovieFragment
export default PagerFragment