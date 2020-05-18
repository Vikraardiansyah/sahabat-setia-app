import {getGenreAction} from './actionTypes'
import {getGenre} from '../../utils/http'

export const getGenreActionCreator = (headers) => {
        return {
            type: getGenreAction,
            payload: getGenre(headers)
        }
}