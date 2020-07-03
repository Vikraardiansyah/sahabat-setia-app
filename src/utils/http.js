import Axios from "axios";

export const register = (body) => {
  return Axios.post(`${process.env.REACT_APP_URL}/auth/register`, body);
};

export const loginUser = (body) => {
  return Axios.post(`${process.env.REACT_APP_URL}/auth/login`, body);
};
export const tokenUser = (body) => {
  return Axios.post(`${process.env.REACT_APP_URL}/auth/token`, body);
};

export const getBooks = (data) => {
  return Axios.get(`${process.env.REACT_APP_URL}/books?${data}`);
};

export const getBooksByRecommended = () => {
  return Axios.get(`${process.env.REACT_APP_URL}/books/recommended`);
};

export const getBookById = (id, token) => {
  return Axios.get(`${process.env.REACT_APP_URL}/books/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const postBook = (body, token) => {
  return Axios.post(`${process.env.REACT_APP_URL}/books`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const putBook = (id, body, token) => {
  return Axios.put(`${process.env.REACT_APP_URL}/books/${id}`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const deleteBook = (id, token) => {
  return Axios.delete(`${process.env.REACT_APP_URL}/books/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getAuthor = (token) => {
  return Axios.get(`${process.env.REACT_APP_URL}/author`, {
    headers: {
      Authorization: token,
    },
  });
};

export const postAuthor = (body, token) => {
  return Axios.post(`${process.env.REACT_APP_URL}/author`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const putAuthor = (id, body, token) => {
  return Axios.put(`${process.env.REACT_APP_URL}/author/${id}`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const deleteAuthor = (id, token) => {
  return Axios.delete(`${process.env.REACT_APP_URL}/author/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getGenre = (token) => {
  return Axios.get(`${process.env.REACT_APP_URL}/genre`, {
    headers: {
      Authorization: token,
    },
  });
};

export const postGenre = (body, token) => {
  return Axios.post(`${process.env.REACT_APP_URL}/genre`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const putGenre = (id, body, token) => {
  return Axios.put(`${process.env.REACT_APP_URL}/genre/${id}`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const deleteGenre = (id, token) => {
  return Axios.delete(`${process.env.REACT_APP_URL}/genre/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getStatus = (token) => {
  return Axios.get(`${process.env.REACT_APP_URL}/status`, {
    headers: {
      Authorization: token,
    },
  });
};

export const borrowBook = (id, body, token) => {
  return Axios.put(`${process.env.REACT_APP_URL}/books/user/${id}`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const getBorrow = (token) => {
  return Axios.get(`${process.env.REACT_APP_URL}/borrow`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getBorrowById = (id, token) => {
  return Axios.get(`${process.env.REACT_APP_URL}/borrow/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const postBorrow = (body, token) => {
  return Axios.post(`${process.env.REACT_APP_URL}/borrow`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const putBorrow = (body, token) => {
  return Axios.put(`${process.env.REACT_APP_URL}/borrow`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const getOrder = (token) => {
  return Axios.get(`${process.env.REACT_APP_URL}/order`, {
    headers: {
      Authorization: token,
    },
  });
};

export const postOrder = (body, token) => {
  return Axios.post(`${process.env.REACT_APP_URL}/order`, body, {
    headers: {
      Authorization: token,
    },
  });
};
