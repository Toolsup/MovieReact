import {BackHandler} from 'react-native';

const handleAndroidBackButton = callback => {
  BackHandler.addEventListener('hardwareBackPress', () => {
        console.log('onback utils')
        callback();
        return true;
  });
};
/**
 * Removes the event listener in order not to add a new one
 * every time the view component re-mounts
 */
const removeAndroidBackButtonHandler = () => {
  BackHandler.removeEventListener('hardwareBackPress', () => {});
}
export {handleAndroidBackButton, removeAndroidBackButtonHandler};