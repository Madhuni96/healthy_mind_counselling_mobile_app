import { Dimensions, StatusBar} from 'react-native';

export const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;

export const HEIGHT = (value) =>{
    return DEVICE_HEIGHT * (value / 100);
}

export const WIDTH = (value) =>{
    return DEVICE_WIDTH * (value / 100);
}