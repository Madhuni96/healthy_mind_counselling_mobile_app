/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MyApp from './src/App'

AppRegistry.registerComponent(appName, () => MyApp);
