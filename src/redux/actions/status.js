import {getStatusAction} from './actionTypes'
import {getStatus} from '../../utils/http'

export const getStatusActionCreator = (headers) => {
        return {
            type: getStatusAction,
            payload: getStatus(headers)
        }
}