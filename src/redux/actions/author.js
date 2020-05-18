import {getAuthorAction} from './actionTypes'
import {getAuthor} from '../../utils/http'

export const getAuthorActionCreator = (headers) => {
        return {
            type: getAuthorAction,
            payload: getAuthor(headers)
        }
}