import {getGenreAction, pending, rejected, fulfilled} from '../actions/actionTypes'
const initialValue = {
    response: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorMsg: {}
}

const genre = (prevState = initialValue, action) => {
    switch (action.type) {
        case getGenreAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getGenreAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data.message
            }
        case getGenreAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: action.payload.data.data
            }
        default:
            return{
                ...prevState
            }
    }
}

export default genre