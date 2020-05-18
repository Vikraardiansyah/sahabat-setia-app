import {getOrderAction, pending, rejected, fulfilled} from '../actions/actionTypes'
const initialValue = {
    response: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorMsg: {}
}

const order = (prevState = initialValue, action) => {
    switch (action.type) {
        case getOrderAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getOrderAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data.message
            }
        case getOrderAction + fulfilled:
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

export default order