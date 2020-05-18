import { combineReducers } from "redux";
import { logoutAction } from "../actions/actionTypes";
import getBooks from "./getBooks";
import login from "./login"
import register from './register'
import getBookById from './getBookById'
import author from './author'
import genre from './genre'
import status from './status'
import borrow from './borrow'
import order from './order'

const appReducer = combineReducers({
    getBooks,
    login,
    register,
    getBookById,
    author,
    genre,
    status,
    borrow,
    order,
});

const rootReducer = (state, action) => {
    if(action.type === logoutAction){
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer;