import React, {Component} from 'react';

export const DOMAIN_API = "https://api.themoviedb.org";
class ApiRequest{


    constructor(props){
        //tham so co the truyen qua props
    }

    getDiscoverApi = async (page, type) => {
        return await fetch('https://api.themoviedb.org/3/discover/' + type +'?api_key=545dee6baf25392fcd4458dc7794dce1&language=en-US&page=' + page, {
            method: 'GET',
        }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        });
    
    }

    getDetail = async(id , type) => {
        return await fetch('https://api.themoviedb.org/3/'+type+'/'+id+'?api_key=545dee6baf25392fcd4458dc7794dce1&language=en-US', {
            method: 'GET',
        }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        });
    }

    getRecommedDetail = async(id, type) =>{
      return await fetch('https://api.themoviedb.org/3/' +type+ '/' +id+ '/recommendations' + '?api_key=545dee6baf25392fcd4458dc7794dce1&language=en-US', {
        method: 'GET',
      }).then((response) => response.json())
      .then((responseJson) => {
          return responseJson;
      });
    }

    getActor = async(id, type) => {
      return await fetch('https://api.themoviedb.org/3/'+type+'/'+id + '/credits?api_key=545dee6baf25392fcd4458dc7794dce1&language=en-US', {
        method: 'GET',
      }).then((response) => response.json())
      .then((responseJson) => {
          let s = '';
          let castLength = responseJson.cast.length;
          for(let i = 0 ; i < castLength; i++){
            s = s + responseJson.cast[i].name + ', ';
          }

          return s;
      });
    }

    logthuphat = () => {
        this.myVar = 0;
        var that = this; 
        setTimeout(
          () => { 
            console.log(that.myVar)
            console.log(this.myVar) 
          },
          0
        );
    }

    logthuphat() {
        this.myVar = 0;
        var that = this; 
        setTimeout(
          function() { 
            console.log(that.myVar) 
            console.log(this.myVar) 
          },
          0
        );
      }

}
export default ApiRequest;