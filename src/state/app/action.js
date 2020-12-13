import axios from 'axios'
import { get as _get, identity, isEmpty as _isEmpty } from 'lodash'

import { serverURL } from './../serverURL'
import { 
    TWEET, GET_ALL_TWEETS, GET_FOLLOWED_TWEETS, GET_ONE_USER_TWEETS
} from './../actionTypes'


export const newTweet = tweet => async dispatch => {
    console.log('newTweet', tweet)
    const tokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token'))

    const token = tokenCookie ? tokenCookie
    .split('=')[1] : null;

    console.log(token)

    const response = await axios.post(`${serverURL}/newTweet`, tweet, {
        headers: { Authorization: `Bearer ${token}` }
    })
    console.log(response)

    dispatch({
        type: TWEET,
        payload: response.data
    })
}

export const getAllTweets = (filter, skip, limit, isOneUserTweets) => async dispatch => {
    
    console.log('filter', filter, 'skip', skip, 'limit', limit)

    const tokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token'))

    const token = tokenCookie ? tokenCookie
    .split('=')[1] : null;

    console.log(token)

    const response = await axios.get(`${serverURL}/allTweets`, {
        params: {
            filter,
            skip,
            limit
        }
    })
    
    console.log(response)

    if(_isEmpty(filter)) return dispatch({
        type: GET_ALL_TWEETS,
        payload: response.data
    })
    else if(isOneUserTweets) return dispatch({
        type: GET_ONE_USER_TWEETS,
        payload: response.data
    })
    else return dispatch({
        type: GET_FOLLOWED_TWEETS,
        payload: response.data
    })
}