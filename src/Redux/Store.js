import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import RootReducer from './Root_reducer'

const Store = createStore(RootReducer, applyMiddleware(ReduxThunk))

export default Store;