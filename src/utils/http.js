import Axios from 'axios'

export const register = (body) => {
  return Axios.post(`${process.env.REACT_APP_URL}/auth/register`, body)
}

export const loginUser = (body) => {
    return Axios.post(`${process.env.REACT_APP_URL}/auth/login`, body)
}

export const tokenUser = (body) => {
    return Axios.post(`${process.env.REACT_APP_URL}/auth/token`, body)
}

export const getBooks = (data) => {
    return Axios.get(`${process.env.REACT_APP_URL}/books?${data}`,
    {
        headers : {
          "Authorization" : localStorage.getItem("token")
        }
      })
}

export const getAuthor = () => {
  return Axios.get(`${process.env.REACT_APP_URL}/author`,
  {
      headers : {
        "Authorization" : localStorage.getItem("token")
      }
    })
}

export const getGenre = () => {
  return Axios.get(`${process.env.REACT_APP_URL}/genre`,
  {
      headers : {
        "Authorization" : localStorage.getItem("token")
      }
    })
}

export const getStatus = () => {
  return Axios.get(`${process.env.REACT_APP_URL}/status`,
  {
      headers : {
        "Authorization" : localStorage.getItem("token")
      }
    })
}

export const getBookById = (id) => {
    return Axios.get(`${process.env.REACT_APP_URL}/books/${id}`,
    {
        headers : {
          "Authorization" : localStorage.getItem("token")
        }
      })
    
}

export const putBook = (id, data) => {
    return Axios.put(`${process.env.REACT_APP_URL}/books/${id}`, data,
    {
        headers : {
          "Authorization" : localStorage.getItem("token")
        }
      })
}

export const postBook = (data) => {
    return Axios.post(`${process.env.REACT_APP_URL}/books`, data,
    {
        headers : {
          "Authorization" : localStorage.getItem("token")
        }
      })
}

export const deleteBook = (id) => {
    return Axios.delete(`${process.env.REACT_APP_URL}/books/${id}`,
    {
        headers : {
          "Authorization" : localStorage.getItem("token")
        }
      })
    
}

export const borrowBook = (id, body) => {
  return Axios.put(`${process.env.REACT_APP_URL}/books/user/${id}`, body,
  {
      headers : {
        "Authorization" : localStorage.getItem("token")
      }
    })
}

export const getBorrow = () => {
  return Axios.get(`${process.env.REACT_APP_URL}/borrow`,
  {
    headers : {
      "Authorization" : localStorage.getItem("token")
    }
  })
}

export const getBorrowById = (id) => {
  return Axios.get(`${process.env.REACT_APP_URL}/borrow/${id}`,
  {
    headers : {
      "Authorization" : localStorage.getItem("token")
    }
  })
}

export const postBorrow = (body) => {
  return Axios.post(`${process.env.REACT_APP_URL}/borrow`, body,
  {
    headers : {
      "Authorization" : localStorage.getItem("token")
    }
  })
}

export const putBorrow = (body) => {
  return Axios.put(`${process.env.REACT_APP_URL}/borrow`, body,
  {
    headers : {
      "Authorization" : localStorage.getItem("token")
    }
  })
}

export const getOrder = () => {
  return Axios.get(`${process.env.REACT_APP_URL}/order`,
  {
    headers : {
      "Authorization" : localStorage.getItem("token")
    }
  })
}

export const postOrder = (body) => {
  return Axios.post(`${process.env.REACT_APP_URL}/order`, body,
  {
    headers : {
      "Authorization" : localStorage.getItem("token")
    }
  })
}
