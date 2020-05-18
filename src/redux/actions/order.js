import {getOrderAction} from './actionTypes'
import {getOrder} from '../../utils/http'

export const getOrderActionCreator = (headers) => {
        return {
            type: getOrderAction,
            payload: getOrder(headers)
        }
}