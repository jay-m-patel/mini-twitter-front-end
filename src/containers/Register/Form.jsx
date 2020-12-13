import React, { Component } from 'react'
import { connect } from 'react-redux'
import validator from 'validator'
import { Container, Grid, Box, TextField, Button, Paper, Card, CardHeader, CardContent, FormControlLabel, Checkbox } from '@material-ui/core'
import {get as _get  } from 'lodash'

import { register, checkLoggedIn } from './../../state/user/action'

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            userName: '',
            password: '',
            rePassword: '',
            nameErr: false,
            userNameErr: false,
            passwordMatchErr: false
        }
    }


    componentDidMount = () => {
        this.props.checkLoggedIn()
        if(this.props.isLoggedIn)
        this.props.history.replace('/followed')
    }

    componentDidUpdate = () => {
        if(this.props.isLoggedIn)
        this.props.history.replace('/')
    }

    
    handleSubmit = event => {
        event.preventDefault()
        let err = false
        if(!this.state.name.length) {
            err = true
            this.setState({nameErr: true})
        } else this.setState({nameErr: false})

        if(!this.state.userName.length) {
            err = true
            this.setState({userNameErr: true})
        } else this.setState({userNameErr: false})

        if(!this.state.password.length || this.state.password !== this.state.rePassword) {
            err = true
            this.setState({passwordMatchErr: true})
        } else this.setState({passwordMatchErr: false})

        if(!err) this.props.register({
            name: this.state.name,
            userName: this.state.userName,
            password: this.state.password,
        })
    }

    render() {
        return (
            <Container maxWidth='xs'>
                    <Card>
                        <CardHeader title="Register">
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={this.handleSubmit}>
                                <TextField required 
                                    error={this.state.nameErr} 
                                    helperText={this.state.nameErr ? "Please, enter your name" : ""} 
                                    fullWidth 
                                    label="Name" name="name" type="text" 
                                    value={this.state.name} 
                                    onChange={
                                        event => this.setState({name: event.target.value}, 
                                        () => {if(this.state.name.length) this.setState({nameErr: false})})
                                    }
                                />
                                <br/><br/>
                                <TextField required 
                                    error={this.state.userNameErr} 
                                    helperText={this.state.userNameErr ? "Please, enter a new userName" : ""} 
                                    fullWidth 
                                    label="Username" name="userName" type="text" 
                                    value={this.state.userName} 
                                    onChange={
                                        event => this.setState({userName: event.target.value},
                                        // () => {if(validator.isuserName(this.state.userName)) this.setState({userNameErr: false})}
                                        )
                                    }
                                />
                                <br/><br/>
                                <TextField required 
                                    error={this.state.passwordMatchErr} 
                                    fullWidth 
                                    label="Password" name="password" type="password" 
                                    value={this.state.password} 
                                    onChange={
                                        event => this.setState({password: event.target.value, passwordMatchErr: false})
                                    }
                                />
                                <br/><br/>
                                <TextField required 
                                    error={this.state.passwordMatchErr} 
                                    helperText={this.state.passwordMatchErr ? "Passwords don't match!" : ""} 
                                    fullWidth 
                                    label="Re-write password" name="rePassword" type="password" 
                                    value={this.state.rePassword} 
                                    onChange={
                                        event => this.setState({rePassword: event.target.value, passwordMatchErr: false})
                                    }                                    
                                />
                                <br/><br/>
                                <Button variant="contained" color="primary" type="submit" 
                                    onClick={this.handleSubmit}
                                >Register</Button>
                            </form>
                        </CardContent>
                    </Card>
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    isLoggedIn: _get(state, 'userReducer.user.isLoggedIn', false),
})

const mapDispatchToProps = dispatch => ({
    register: formBody => dispatch(register(formBody)),
    checkLoggedIn: () => dispatch(checkLoggedIn())
})


export default connect(mapStateToProps, mapDispatchToProps)(Register)