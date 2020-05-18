import {getBorrowAction, getBorrowByIdAction} from './actionTypes'
import {getBorrow, getBorrowById} from '../../utils/http'

export const getBorrowActionCreator = () => {
        return {
            type: getBorrowAction,
            payload: getBorrow()
        }
}

export const getBorrowByIdActionCreator = (id) => {
    return {
        type: getBorrowByIdAction,
        payload: getBorrowById(id)
    }
}
