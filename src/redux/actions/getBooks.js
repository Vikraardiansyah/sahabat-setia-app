import {getBooksAction} from './actionTypes'
import {getBooks} from '../../utils/http'

export const getBooksActionCreator = (data) => {
        return {
            type: getBooksAction,
            payload: getBooks(data)
        }
}