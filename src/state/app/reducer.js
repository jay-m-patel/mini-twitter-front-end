import { TWEET, GET_ALL_TWEETS, GET_FOLLOWED_TWEETS, GET_ONE_USER_TWEETS } from './../actionTypes'

export default (state = {}, action) => {
    const { type, payload } = action
    console.log(type, payload)
    switch(type) {
        case TWEET:
            return {
                ...state,
                app: {
                    ...state.app,
                    ...payload
                }
            }
        case GET_ALL_TWEETS:
            const existingAllTweets = state.app && state.app.allTweets ? state.app.allTweets : []
            return {
                ...state,
                app: {
                    ...state.app,
                    ...payload,
                    allTweets: [
                        ...existingAllTweets,
                        ...payload.allTweets
                    ]
                }
            }
        case GET_FOLLOWED_TWEETS:
            const existingFollowedTweets = state.app && state.app.followedTweets ? state.app.followedTweets: []
            return {
                ...state,
                app: {
                    ...state.app,
                    // ...payload,
                    followedTweets: [
                        ...existingFollowedTweets,
                        ...payload.allTweets
                    ],
                    err: payload.err,
                    errMessage: payload.errMessage,
                    errName: payload.errName
                }
            }
        case GET_ONE_USER_TWEETS:
            return {
                ...state,
                app: {
                    ...state.app,
                    oneUserTweets: payload.allTweets,
                    err: payload.err,
                    errMessage: payload.errMessage,
                    errName: payload.errName
                }
            }
        default:
            return state
    }
}