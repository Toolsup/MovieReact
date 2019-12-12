import React ,{Component , PureComponent} from 'react';
import { StyleSheet, ScrollView , FlatList, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import ApiRequest from '../networking/ApiRequest';
import Icon from 'react-native-vector-icons/Entypo';



class ItemCategory extends React.PureComponent{
    render(){
        return(
            <TouchableOpacity style={{flex:1}}
                onPress = {this.props.pressItem}>
                <View style={{flex :1, paddingTop: 12, paddingBottom: 12, width: '100%', marginLeft: 18}}>
                    <Text style={{color: '#000', backgroundColor: '#fff', fontSize: 18}}>
                        {this.props.mTitle}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

class CategoryActivity extends React.Component{

    constructor(props) {
        super(props)
        
        this.state = {
            data: [],
        };
    }

    componentDidMount(){
        this.getDataCategory();
    }

    getDataCategory = async() => {
        const request = new ApiRequest({

        });

        const category = await request.getCategory('tv');
        
        this.setState({
            data: category.genres,
        })

    }

    onPressItem = (mIdCategory, mCategoryName) =>{

    }

    render(){
        return(
            <View style={{flex :1}}>
                <View style={{width:'100%', height:64, backgroundColor: '#1A98DA', flexDirection: 'row',  marginTop: StatusBar.currentHeight}}>
                        <View style={{width:64, height: 64, justifyContent: 'center', marginLeft: 16}}>
                            <Icon size={24}  name='chevron-thin-left' color="#fff"/>
                        </View>

                        <Text style={{fontWeight : 'bold',color: '#fff', alignItems: 'center',justifyContent: 'center', textAlignVertical: "center", fontSize:18, textAlign:'center'}}>{'Movie apps'}</Text>
                </View>

                <FlatList
                    data = {this.state.data}
                    renderItem = {({ item }) => (
                        <ItemCategory
                            pressItem = {this.onPressItem(item.id, item.name, "tv")}
                            mTitle = {item.name}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}
export default CategoryActivity