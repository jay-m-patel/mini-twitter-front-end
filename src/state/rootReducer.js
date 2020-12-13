import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import user from './user/reducer'
import app from './app/reducer'


export default combineReducers({
    userReducer: user,
    appReducer: app,
    loadingBar: loadingBarReducer,

})