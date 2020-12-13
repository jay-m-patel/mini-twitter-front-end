import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { get as _get } from 'lodash'

// import { getAllTweets } from './state/app/action'

import Register from './containers/Register/Form'
import Login from './containers/Login/Form'
import NewTweet from './containers/NewTweet/Form'
import Tweets from './components/Tweet/Tweets'
function routes(props) {
    return (
        <React.Fragment>
            <Route exact path='/' render={routerProps => <Tweets title="Tweets around" tweets={props.allTweets} {...routerProps}/>}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            
            <Route exact path='/new' component={NewTweet}/>
            <Route exact path='/user/:userMongoId' render={routerProps => <Tweets {...routerProps}/>}/>
            <Route exact path='/followed' render={routerProps => <Tweets title="Tweets you are interested in" tweets={props.followedTweets} {...routerProps}/>}/>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    // uploaderId: _get(state, 'userReducer.user._id', null)
    allTweets: _get(state, 'appReducer.app.allTweets', []),
    followedTweets: _get(state, 'appReducer.app.followedTweets', [])
})

const mapDispatchToProps = dispatch => ({
    // getAllTweets: (filter = {}, skip = 0, limit = 7) => dispatch(getAllTweets(filter, skip, limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(routes)