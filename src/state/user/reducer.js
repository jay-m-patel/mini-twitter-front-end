import { REGISTER, LOGIN, LOGOUT, CHECKLOGGEDIN, FOLLOW, UNFOLLOW } from './../actionTypes'


export default (state = {}, action) => {
    const { type, payload } = action

    console.log('payload', payload)
    switch(type) {
        case REGISTER:
            return {
                ...state,
                user: {
                    ...payload
                }
            }
        case LOGIN:
            return {
                ...state,
                user: {
                    ...payload
                }
            }
        case LOGOUT:
            return {
                ...state,
                user: {
                    ...payload
                }
            }
        case CHECKLOGGEDIN:
            return {
                ...state,
                user: payload
            }
        case FOLLOW:
            return {
                ...state,
                user: {
                    // ...state.user,
                    ...payload
                }
            }
        case UNFOLLOW:
            return {
                ...state,
                user: {
                    // ...state.user,
                    ...payload
                }
            }
        default:
            return state
    }
}