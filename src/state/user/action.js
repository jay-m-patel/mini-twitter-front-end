import axios from 'axios'
import { get as _get } from 'lodash'

import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { serverURL } from './../serverURL'
import { 
    REGISTER, LOGIN, LOGOUT, CHECKLOGGEDIN, FOLLOW, UNFOLLOW
 } from './../actionTypes'

export const register = formBody => async dispatch => {
    const response = await axios.post(`${serverURL}/register`, formBody)
    console.log(response)
    const token = _get(response, 'data.token', null)
    if(token) document.cookie = `token=${token}; samesite=strict; path='/'`
    dispatch({
        type: REGISTER,
        payload: response.data
    })
}

export const login = formBody => async dispatch => {
    const response = await axios.post(`${serverURL}/login`, formBody)
    console.log(response)
    const token = _get(response, 'data.token', null)
    if(token) document.cookie = `token=${token}; samesite=strict; path='/'`

    dispatch({
        type: LOGIN,
        payload: response.data
    })
}

export const logout = () => async dispatch => {
    
    const tokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token'))
    
    const token = tokenCookie ? tokenCookie
    .split('=')[1] : null;

    const response = await axios.delete(`${serverURL}/logout`, { headers: { Authorization: `Bearer ${token}` }})
    console.log(response)

    dispatch({
        type: LOGOUT,
        payload: response.data
    })
}

export const checkLoggedIn = () => async dispatch => {
    console.log('checkLoggedIn action', document.cookie)
    const tokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token'))

    const token = tokenCookie && tokenCookie.split('=')[1] 
    ? tokenCookie.split('=')[1] : null;

    console.log('token', token)

    const response = await axios.get(`${serverURL}/checkLoggedIn`, { headers: token ? { Authorization: `Bearer ${token}` } : null })
    console.log(response)

    dispatch({
        type: CHECKLOGGEDIN,
        payload: response.data
    })

}

export const follow = (whom) => async dispatch => {
    console.log('follow whom', whom)
    const tokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token'))

    const token = tokenCookie && tokenCookie.split('=')[1] 
    ? tokenCookie.split('=')[1] : null;

    const response = await axios.patch(`${serverURL}/follow`, {
        whom
    }, { headers: token ? { Authorization: `Bearer ${token}` } : null })

    console.log(response)

    dispatch({
        type: FOLLOW,
        payload: response.data
    })
}

export const unfollow = (whom) => async dispatch => {
    console.log('follow whom', whom)
    const tokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token'))

    const token = tokenCookie && tokenCookie.split('=')[1] 
    ? tokenCookie.split('=')[1] : null;

    const response = await axios.patch(`${serverURL}/unfollow`, {
        whom
    }, { headers: token ? { Authorization: `Bearer ${token}` } : null })

    console.log(response)

    dispatch({
        type: UNFOLLOW,
        payload: response.data
    })

}
