import {getBooksAction, pending, rejected, fulfilled} from '../actions/actionTypes'
const initialValue = {
    getBooksResponse: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    paginationResponse: {},
}

const getBooks = (prevState = initialValue, action) => {
    switch (action.type) {
        case getBooksAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getBooksAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                getBooksResponse: action.payload,
            }
        case getBooksAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                getBooksResponse: action.payload.data.data,
                paginationResponse: action.payload.data.pagination
            }
        default:
            return{
                ...prevState
            }
    }
}

export default getBooks