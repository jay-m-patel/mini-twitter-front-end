import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { get as _get, map as _map, head as _head, includes as _includes } from 'lodash'
import { Box, Container, Card, CardHeader, List, Button } from '@material-ui/core'

import { follow, unfollow } from './../../state/user/action'
import { getAllTweets } from './../../state/app/action'
import Tweet from './Tweet'

function Tweets({title, tweets, ...props}) {
    useEffect(() => {
        if(props.match.params.userMongoId) {
            props.getAllTweets({'uploader._id': props.match.params.userMongoId})
        }
    }, [])

    useEffect(() => {
       console.log('use this effect', props.following)
    //    props.getAllTweets({'uploader._id': {'$in': props.following}})
    }, [props.following])

    const user = props.match.params.userMongoId && _get(_head(_get(props, 'oneUserTweets')), 'uploader.name')
    const userName = props.match.params.userMongoId && _get(_head(_get(props, 'oneUserTweets')), 'uploader.userName')
    console.log(props.following, _get(props, 'match.params.userMongoId'), _includes(props.following, _get(props, 'match.params.userMongoId')))
    return (
        <Container maxWidth='xs'>
            <Card>
                <CardHeader 
                    title={props.match.params.userMongoId ? user : title}
                    subheader={props.match.params.userMongoId ? userName : '' }
                >
                </CardHeader>
                {props.isLoggedIn && props.match.params.userMongoId
                && props.match.params.userMongoId !== props.userMongoId
                &&  (
                    _includes(props.following, _get(props, 'match.params.userMongoId'))
                    ? 
                    <Button variant="outlined"
                        onClick={() => {
                            props.unfollow(props.match.params.userMongoId)
                            // .then(() => props.getAllTweets({'uploader._id': {'$in': props.following}}))
                        }}
                    >Unfollow</Button>
                    : <Button variant="contained" color="primary"
                        onClick={() => {
                            props.follow(props.match.params.userMongoId)
                            // .then(() => props.getAllTweets({'uploader._id': {'$in': props.following}}))
                        }}
                    >Follow</Button>
                )}
                <List component='div'>
                {_map(
                    props.match.params.userMongoId ? props.oneUserTweets : tweets,
                    ({_id, tweet, uploader, createdAt}) => <Tweet key={_id} 
                        tweet={tweet} createdAt={createdAt} uploader={uploader} 
                        onClick={() => !props.match.params.userMongoId && props.history.push(`/user/${uploader._id}`)}
                    />
                )}
                </List>
            </Card>
        </Container>
    )
}

const mapStateToProps = state => ({
    oneUserTweets: _get(state, 'appReducer.app.oneUserTweets'),
    following: _get(state, 'userReducer.user.following'),
    isLoggedIn: _get(state, 'userReducer.user.isLoggedIn', false),
    userMongoId: _get(state, 'userReducer.user._id'),
})

const mapDispatchToProps = dispatch => ({
    getAllTweets: (filter = {}, skip = 0, limit = 7, isOneUserTweets = true) => dispatch(getAllTweets(filter, skip, limit, isOneUserTweets)),
    follow: (whom) => dispatch(follow(whom)),
    unfollow: (whom) => dispatch(unfollow(whom))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tweets)