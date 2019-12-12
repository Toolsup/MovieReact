import React ,{Component} from 'react';
import {InteractionManager, BackHandler} from 'react-native';
import { StyleSheet, ScrollView , SafeAreaView, ActivityIndicator, FlatList, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import ApiRequest from '../networking/ApiRequest';
import Icon from 'react-native-vector-icons/Entypo';
import { NavigationActions } from 'react-navigation';
import {handleAndroidBackButton} from '../utils/Utils';




class ItemSuggest extends React.PureComponent{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <TouchableOpacity style={styles.container}
                onPress = {this.props.pressItemSG}>
                <View style={styles.season_item}>
                    <Image style = {styles.image_movie}
                        source = {{uri: this.props.mUrl}}
                        thumbnail = {require('../images/poster_placeholder.jpg')}
                    />
                    <Text style = {styles.textstyle} numberOfLines={1}>
                        {this.props.mTitle}
                    </Text>
                
                    
                </View>
                
            </TouchableOpacity>
        )
    }
}

class ItemSeasons extends React.PureComponent{
    render(){
        return(
            <TouchableOpacity style={styles.container}
                onPress = {this.props.pressItemSs}>
                <View style={styles.season_item}>
                    <Image style = {styles.image_movie}
                        source = {{uri: this.props.mUrl}}
                        thumbnail = {require('../images/poster_placeholder.jpg')}
                    />
                    <Text style = {styles.textstyle} numberOfLines={1}>
                        {this.props.mTitle}
                    </Text>
                
                    
                </View>
                
            </TouchableOpacity>
        )
    }
}


class DetailActivity extends React.Component{


    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.title = navigation.getParam('title', '');
        this.id = navigation.getParam('id', '');
        this.type = navigation.getParam('type', '');

        this.state = {
            isLoading: true,
            actors: '',
            description: '',
            poster_path: 'https://facebook.github.io/react-native/img/tiny_logo.png',
            backdrop_path: 'https://facebook.github.io/react-native/img/tiny_logo.png',
            date: '',
            seasons :[],
            suggest :[],
        };
    }

    componentWillUnmount(){
        console.log('onback unmount detail')
    }

    componentDidMount(){
       
        if(this.state.isLoading){
            this.getDetail();
            this.getActor();
            this.getRecommend();
        }
       
    }

   

   

    pressItemSeasons = (nameSeasons, seasonId) => () =>{

    }

    pressItemMovie = (nameMovie, idMovie, mTypeMovie) => () =>{
        this.props.navigation.push('Detail', {title: nameMovie, id: idMovie, type: mTypeMovie})
    }

    getActor = async() => {
        const request = new ApiRequest({
            
        }); 
        const actorsData = await request.getActor(this.id, this.type);    
        
        this.setState({
            actors : actorsData,
        })
        
    }


    componentWillMount(){
        
    }

    componentDidUpdate(){
        
    }
    

    getRecommend = async() => {
        const reuqest = new ApiRequest({});
        let dataRecommend = await reuqest.getRecommedDetail(this.id, this.type);
        let mSuggest = dataRecommend.results; 

      
        this.setState({
            suggest : mSuggest,
        })
        
    }


    getDetail = async() => {

        const request = new ApiRequest({
            //truyen props vao day
        }); 
        let mDate = '';

        const dataDetail = await request.getDetail(this.id, this.type);
     
        let mSeasons = [];
        let mOverView = dataDetail.overview;
        if(this.type === 'tv'){
            mDate = dataDetail.first_air_date;
            mSeasons = dataDetail.seasons;
        }else{
            mDate = dataDetail.title;
        }

        const poster_path_data = "https://image.tmdb.org/t/p/w342".concat(dataDetail.poster_path);
        const backdrop_path_data = "https://image.tmdb.org/t/p/w1280".concat(dataDetail.backdrop_path);
       
        this.setState({
            isLoading : false,
            poster_path: poster_path_data,
            date : mDate,
            description: mOverView,
            backdrop_path: backdrop_path_data,
            seasons: mSeasons,
        });
        

    }

    onPressBack = () => {

        let key = this.props.navigation.state.params.key;
        console.log('detail key = ' + key);
        
        this.props.navigation.goBack(null);
    }

    render() {

        if(!this.state.isLoading) {
            let seasonsList;
            let suggestList;

            if(this.type === 'tv'){
                seasonsList =   <View>
                                    <Text style={{marginLeft: 8, fontWeight : 'bold',marginTop : 8,  marginRight: 8, color: '#fff',textAlignVertical: "center",lineHeight: 22, fontSize: 14}} numberOfLines ={1}>{'Seasons:'}</Text> 
                                    <FlatList 
                                        style = {{height : 240}}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal ={true}
                                        data = {this.state.seasons}
                                        renderItem = {({ item }) => (
                                            <ItemSeasons
                                                pressItemSs = {this.pressItemSeasons(item.name, item.id)}
                                                mTitle = {item.name}
                                                mUrl = {"https://image.tmdb.org/t/p/w342".concat(item.poster_path)}
                                            />
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />     
                                </View>

            

            }else{
                seasonsList = <View></View>
            }
            if(this.type === 'tv'){
                suggestList = <View style={{marginBottom :84}}>
                    <Text style={{marginLeft: 8, fontWeight : 'bold',marginTop : 8,  marginRight: 8, color: '#fff',textAlignVertical: "center",lineHeight: 22, fontSize: 14}} numberOfLines ={1}>{'Suggest:'}</Text> 

                    <FlatList 
                        style = {{height : 240}}
                        showsHorizontalScrollIndicator={false}
                        horizontal ={true}
                        data = {this.state.suggest}
                        renderItem = {({ item }) => (
                            <ItemSuggest
                                pressItemSG = {this.pressItemMovie(item.original_name, item.id, this.type)}
                                mTitle = {item.original_name}
                                mUrl = {"https://image.tmdb.org/t/p/w342".concat(item.poster_path)}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    
                    
                    />    

                </View>
            }else{
                suggestList = <View style={{marginBottom :84}}>
                    <Text style={{marginLeft: 8, fontWeight : 'bold',marginTop : 8,  marginRight: 8, color: '#fff',textAlignVertical: "center",lineHeight: 22, fontSize: 14}} numberOfLines ={1}>{'Suggest:'}</Text> 

                    <FlatList 
                        style = {{height : 240}}
                        showsHorizontalScrollIndicator={false}
                        horizontal ={true}
                        data = {this.state.suggest}
                        renderItem = {({ item }) => (
                            <ItemSuggest
                                pressItemSG = {this.pressItemMovie(item.title, item.id, this.type)}
                                mTitle = {item.title}
                                mUrl = {"https://image.tmdb.org/t/p/w342".concat(item.poster_path)}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    
                    
                    />    

                </View>
            }
      
            return (
                <View style={{flex:1}}>

                    <StatusBar hidden={false} />

                    <View style={{width:'100%', height:64, backgroundColor: '#1A98DA',  marginTop: StatusBar.currentHeight, flexDirection:'row'}}>
                    
                        <View style={{width:64, height: 64, justifyContent: 'center', marginLeft: 16}}>
                            <TouchableOpacity  onPress = {this.onPressBack}>
                                <Icon size={24}  name='chevron-thin-left' color="#fff"/>
                            </TouchableOpacity>
                        </View>

                        <Text style={{fontWeight :'bold', color: '#fff',textAlignVertical: "center", fontSize:18}}>{this.title}</Text>
                    </View>

            

                    <SafeAreaView  style = {{width: '100%', height: '100%'}}>
                    
                        <ScrollView style={{ width: '100%', height: '100%', paddingTop: 10, backgroundColor:'#464646'}}>
                            <View>
                                <Image style = {styles.image_cover}
                                    source = {{uri: this.state.backdrop_path}}
                                    thumbnail = {require('../images/poster_placeholder.jpg')}
                                />
                                <Text style={{width: '100%', fontWeight:'bold',margin: 8, color: '#fff',textAlignVertical: "center", fontSize: 24}}>{this.title}</Text>
                                <Text style={{marginLeft: 8, color: '#fff',textAlignVertical: "center", fontSize: 14}}>{this.state.date}</Text>

                                <Text style={{marginLeft: 8, fontWeight : 'bold', marginTop: 8, marginRight: 8, color: '#fff',textAlignVertical: "center",lineHeight: 22, fontSize: 14}} numberOfLines ={1}>{'Detail:'}</Text>
                                <Text style={{marginLeft: 8, marginRight: 8, color: '#fff',textAlignVertical: "center",lineHeight: 22, fontSize: 14}} numberOfLines ={3}>{this.state.description}</Text>
                                
                                <Text style={{marginLeft: 8, fontWeight : 'bold',marginTop : 8,  marginRight: 8, color: '#fff',textAlignVertical: "center",lineHeight: 22, fontSize: 14}} numberOfLines ={1}>{'Cast:'}</Text>
                                <Text style={{marginLeft: 8, marginRight: 8, color: '#fff',textAlignVertical: "center",lineHeight: 22, fontSize: 14}} numberOfLines ={2}>{this.state.actors}</Text>

                                {seasonsList}
                                {suggestList}
                            
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                    
                </View>      
            );
        }else{
            return <View style={{flex:1 , backgroundColor:'#000', justifyContent: 'center'}}>
                        <ActivityIndicator 
                            size={'large'}
                            animating= {true}
                            color={'#f56642'}
                        />
                </View>
        }
    }

}
const styles = StyleSheet.create({

    image_cover: {
        height:220, 
        marginLeft:8,
        marginRight : 8,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    season_item: {
        width: 120,
        height: 200,
        marginLeft : 8,
    },

    image_movie: {
        flex: 1,
        width: '100%',
    },

    items: {
        flex: 1,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textstyle: {
        color: '#fff',
        alignItems: 'center',
        fontSize: 18,
        justifyContent: 'center',
    },
  });
export default DetailActivity