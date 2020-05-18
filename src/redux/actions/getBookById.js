import {getBookByIdAction} from './actionTypes'
import {getBookById} from '../../utils/http'

export const getBookByIdActionCreator = (id, headers) => {
        return {
            type: getBookByIdAction,
            payload: getBookById(id, headers)
        }
}