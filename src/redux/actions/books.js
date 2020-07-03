import {
  getBooksAction,
  getBooksByRecommendedAction,
  getBookByIdAction,
  getBookByIdRecommendedAction,
  putBookAction,
  borrowBookAction,
} from "./actionTypes";
import {
  getBooks,
  getBooksByRecommended,
  borrowBook,
  putBook,
} from "../../utils/http";

export const getBooksActionCreator = (data) => {
  return {
    type: getBooksAction,
    payload: getBooks(data),
  };
};

export const getBooksByRecommendedActionCreator = () => {
  return {
    type: getBooksByRecommendedAction,
    payload: getBooksByRecommended(),
  };
};

export const getBookByIdActionCreator = (id, token) => {
  return {
    type: getBookByIdAction,
    payload: parseInt(id, token),
  };
};

export const getBookByIdRecommendedActionCreator = (id) => {
  return {
    type: getBookByIdRecommendedAction,
    payload: parseInt(id),
  };
};

export const putBookActionCreator = (id, body, token) => {
  return {
    type: putBookAction,
    payload: putBook(id, body, token),
  };
};

export const borrowBookActionCreator = (id, body, token) => {
  return {
    type: borrowBookAction,
    payload: borrowBook(id, body, token),
  };
};
