import {
  getBooksAction,
  getBooksByRecommendedAction,
  getBookByIdAction,
  getBookByIdRecommendedAction,
  putBookAction,
  borrowBookAction,
  pending,
  rejected,
  fulfilled,
} from "../actions/actionTypes";
const initialValue = {
  resBooks: [],
  resBooksByRecommended: [],
  resBookById: {},
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  errorBooks: "",
  resPagination: {},
};

const books = (prevState = initialValue, action) => {
  switch (action.type) {
    case getBooksAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getBooksAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        errorBooks: action.payload.response.data.data,
      };
    case getBooksAction + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        resBooks: action.payload.data.data,
        resPagination: action.payload.data.pagination,
      };
    case getBooksByRecommendedAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getBooksByRecommendedAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        errorBooks: action.payload.response.data.data,
      };
    case getBooksByRecommendedAction + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        resBooksByRecommended: action.payload.data.data,
      };
    case getBookByIdAction:
      const BookById = prevState.resBooks.filter(
        (book) => book.id === action.payload
      );
      return {
        ...prevState,
        resBookById: BookById[0],
      };
    case getBookByIdRecommendedAction:
      const BookByIdRecommended = prevState.resBooksByRecommended.filter(
        (book) => book.id === action.payload
      );
      return {
        ...prevState,
        resBookById: BookByIdRecommended[0],
      };
    case putBookAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case putBookAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        errorBooks: action.payload.response.data.data,
      };
    case putBookAction + fulfilled:
      const data = action.payload.data.data;
      const dataAfterEdit = prevState.resBooks.map((book) => {
        if (book.id === data.id) {
          return data;
        }
        return book;
      });
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        resBooks: dataAfterEdit,
        resBookById: {
          ...data,
        },
      };
    case borrowBookAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case borrowBookAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        errorBooks: action.payload.response.data.data,
      };
    case borrowBookAction + fulfilled:
      const { id, id_status, email_borrow, status } = action.payload.data.data;
      const dataAfterBorrow = prevState.resBooks.map((book) => {
        if (book.id === id) {
          return {
            ...book,
            id_status,
            status,
            email_borrow,
          };
        }
        return book;
      });
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        resBooks: dataAfterBorrow,
        resBookById: {
          ...prevState.resBookById,
          id_status,
          email_borrow,
          status,
        },
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default books;
