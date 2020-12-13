import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Box, TextField, Button, Paper, Card, CardHeader, CardContent } from '@material-ui/core'
import {get as _get  } from 'lodash'

import { login, checkLoggedIn } from './../../state/user/action'
import { getAllTweets } from './../../state/app/action'


class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            password: '',
            userNameErr: false,
            passwordErr: false
        }
    }

    componentDidMount = () => {
        this.props.checkLoggedIn()
        if(this.props.isLoggedIn)
        this.props.history.replace('/followed')
    }

    componentDidUpdate = () => {
        if(this.props.isLoggedIn)
        this.props.history.replace('/followed')
    }

    handleSubmit = event => {
        event.preventDefault()
        let err = false
        if(!this.state.userName.length) {
            err = true
            this.setState({userNameErr: true})
        } else this.setState({userNameErr: false})

        if(!this.state.password.length) {
            err = true
            this.setState({passwordErr: true})
        } else this.setState({passwordErr: false})



        if(!err) this.props.login({
            userName: this.state.userName,
            password: this.state.password,
        }).then(() => {
            this.props.getAllTweets({'uploader._id': {'$in': [...this.props.following, this.props.userMongoId]}})
        })

    }

    render() {
        return (
            <Container maxWidth='xs'>
                    <Card>
                        <CardHeader title="Login">
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={this.handleSubmit}>
                                <TextField required 
                                    error={this.state.userNameErr || (this.props.errMessage ? true : false)}
                                    fullWidth 
                                    label="User-name" type="userName" 
                                    value={this.state.userName} 
                                    onChange={
                                        event => this.setState({userName: event.target.value})
                                    }
                                />
                                <br/><br/>
                                <TextField required 
                                    error={this.state.passwordErr || (this.props.errMessage ? true : false)}
                                    fullWidth 
                                    label="Password" type="password" 
                                    value={this.state.password} 
                                    onChange={
                                        event => this.setState({password: event.target.value})
                                    }
                                />
                                <br/><br/>
                                <Button variant="contained" color="primary" type="submit" 
                                    onClick={this.handleSubmit}
                                >Login</Button>
                            </form>
                        </CardContent>
                    </Card>
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    isLoggedIn: _get(state, 'userReducer.user.isLoggedIn', false),
    errMessage: _get(state, 'userReducer.user.errMessage', null),
    following: _get(state, 'userReducer.user.following', []),
    userMongoId: _get(state, 'userReducer.user._id'),
})

const mapDispatchToProps = dispatch => ({
    login: formBody => dispatch(login(formBody)),
    checkLoggedIn: () => dispatch(checkLoggedIn()),
    getAllTweets: (filter = {}, skip = 0, limit = 7) => dispatch(getAllTweets(filter, skip, limit))
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)