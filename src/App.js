import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { get as _get, isUndefined as _isUndefined} from 'lodash'
import { AppBar, Tabs, Tab, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { withStyles } from '@material-ui/styles'
import LoadingBar from 'react-redux-loading-bar'
import Routes from './routes'
import './App.css';

import { logout, checkLoggedIn } from './state/user/action'
import { getAllTweets } from './state/app/action'

const useStyles = () => ({
  homeBtn: {
    marginRight: 'auto'
  },
  invisible: {
    display: 'none'
  }
})

const getIndex = (arr, field, val) => {
  console.log(val)
  let index
  arr.find((obj, i) => {
    if(obj[field] === val) {
      index = i
      return obj
    }
  })
  return index
}

class App extends Component {
  constructor(props) {
    super(props)

    this.routesArr = [
      {
        route: '/',
        label: 'All Tweets'
      }, {
        route: '/register',
        label: 'Register'
      }, {
        route: '/login',
        label: 'Login'
      }, {
        route: '/followed',
        label: 'Tweets For you'
      }, {
        route: '/new',
        label: 'Tweet something new'
      }, {
        route: '/logout',
        label: 'Logout'
      }, {
        route: '/user',
      }
    ]

    this.state = {
      tabIndex: getIndex(this.routesArr, 'route', this.props.location.pathname),
    }
  }

  componentDidMount = () => {
    this.props.checkLoggedIn().then(() => {
        console.log(this.props.following)
        if(_get(this.props, 'following.length'))
        this.props.getAllTweets({'uploader._id': {'$in': [...this.props.following, this.props.userMongoId]}})
    })
    this.props.getAllTweets()
  }

  componentDidUpdate = () => {
    // this.props.checkLoggedIn()
    console.log('App componentDidUpdate', this.state.tabIndex, this.props)
    if(!_isUndefined(this.state.tabIndex) && this.props.location.pathname !== this.routesArr[this.state.tabIndex].route)
    this.setState({tabIndex: getIndex(this.routesArr, 'route', this.props.location.pathname)})
  }
  
  handleTabClick = (newRoute, tabIndex) => {
    this.setState({tabIndex})
    if(this.props.location.pathname !== newRoute)
    this.props.history.push(newRoute)
  }
  
  render() {
    const { classes } = this.props
    return (
      <div className="App">
        <AppBar 
          position="static"
        >
          <Tabs 
            variant="scrollable"
            value={this.state.tabIndex}
          >
            <Tab className={classes.homeBtn} label={this.routesArr[0].label} onClick={() => this.handleTabClick('/', 0)}/>
            <Tab className={this.props.isLoggedIn ? classes.invisible : ''} label={this.routesArr[1].label} onClick={() => this.handleTabClick('/register', 1)}/>
            <Tab className={this.props.isLoggedIn ? classes.invisible : ''} label={this.routesArr[2].label} onClick={() => this.handleTabClick('/login', 2)}/>
            <Tab className={this.props.isLoggedIn ? '' : classes.invisible} label={this.routesArr[3].label} onClick={() => this.handleTabClick('/followed', 3)}/>
            <Tab className={this.props.isLoggedIn ? '' : classes.invisible} label={this.routesArr[4].label} onClick={() => this.handleTabClick('/new', 4)}/>
            <Tab className={this.props.isLoggedIn ? '' : classes.invisible} label={this.routesArr[5].label} onClick={() => {
              this.handleTabClick('/', 5)
              this.props.logout()
              document.cookie = `token=; expires=${new Date()} path='/'`
            }}/>
          </Tabs>

          <LoadingBar />

        </AppBar>

        {this.props.errMesage ? <Alert severity="error">{this.props.errMesage}<br/>Please reload, if nothing works.</Alert> : null}
        <br/>
        <Routes/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errMesage: _get(state, 'userReducer.user.errMessage', '') || _get(state, 'appReducer.app.errMessage', ''),
  isLoggedIn: _get(state, 'userReducer.user.isLoggedIn', false),
  following: _get(state, 'userReducer.user.following', []),
  userMongoId: _get(state, 'userReducer.user._id'),
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  checkLoggedIn: () => dispatch(checkLoggedIn()),
  getAllTweets: (filter = {}, skip = 0, limit = 7) => dispatch(getAllTweets(filter, skip, limit))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)
  (withStyles(useStyles)(App))
);
