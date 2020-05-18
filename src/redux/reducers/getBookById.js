import {getBookByIdAction, pending, rejected, fulfilled} from '../actions/actionTypes'
const initialValue = {
    response: {},
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorMsg: "",
}

const getBookById = (prevState = initialValue, action) => {
    switch (action.type) {
        case getBookByIdAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getBookByIdAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload
            }
        case getBookByIdAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: action.payload.data.data[0]
            }
        default:
            return{
                ...prevState
            }
    }
}

export default getBookById