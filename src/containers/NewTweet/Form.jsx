import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get as _get } from 'lodash'
import { Container, Grid, Box, TextField, Button, Paper, Card, CardHeader, CardContent, FormControlLabel, Checkbox } from '@material-ui/core'

import CKEditor from './../../components/CkEditor/InlineEditor'
import { checkLoggedIn } from './../../state/user/action'
import { newTweet } from './../../state/app/action'

class NewTweet extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tweet: ""
        }
    }

    componentDidMount = () => {
        this.props.checkLoggedIn()
        if(!this.props.isLoggedIn)
        this.props.history.replace('/login')
    }

    // componentDidUpdate = () => {
    //     // if(this.props.isLoggedIn)
    //     // this.props.history.replace('/followed')
    // }

    handleSubmit = event => {
        event.preventDefault()
        if(!this.state.tweet.length) return this.setState({
            tweetLengthErr: true,
            tweetLengthErrMessage: 'Tweet is too short!'
        })
        else this.setState({tweetLengthErr: false})

        if(this.state.tweet && this.state.tweet.replace(/<[^>]*>/g, '').length > 140) return this.setState({
            tweetLengthErr: true,
            tweetLengthErrMessage: 'Tweet is too long!'
        })
        else this.setState({tweetLengthErr: false})

        this.props.newTweet({
            uploader: {
                name: this.props.name,
                userName: this.props.userName,
                _id: this.props.userMongoId
            },
            tweet: this.state.tweet,
        })
        .then(() => this.props.history.replace('/followed'))
    }


    render() {
        return (
            <Container maxWidth='xs'>
                    <Card>
                        <CardHeader title="Add New Tweet">
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={this.handleSubmit}>
                                <CKEditor 
                                    className="check"
                                    config={ {
                                        toolbar: ['heading', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote' ]
                                    }}
                                    data={this.state.tweet}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        this.setState({tweet: data})
                                    }}
                                    onFocus={(event, editor) => {
                                        this.setState({
                                            tweetLengthErr: false,
                                            tweetLengthErrMessage: ''
                                        })
                                    }}
                                    err={this.state.tweetLengthErr}
                                    errMessage={this.state.tweetLengthErrMessage}
                                />
                                <br/><br/>

                                <Button variant="contained" color="primary" type="submit" 
                                    onClick={this.handleSubmit}
                                >Tweet</Button>
                            </form>
                        </CardContent>
                    </Card>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: _get(state, 'userReducer.user.isLoggedIn', false),
    name: _get(state, 'userReducer.user.name'),
    userName: _get(state, 'userReducer.user.userName'),
    userMongoId: _get(state, 'userReducer.user._id'),
    // errMessage: _get(state, 'appReducer.app.errMessage', null)
})

const mapDispatchToProps = dispatch => ({
    checkLoggedIn: () => dispatch(checkLoggedIn()),
    newTweet: tweet => dispatch(newTweet(tweet))
})


export default connect(mapStateToProps, mapDispatchToProps)(NewTweet)