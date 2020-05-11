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

export const borrowBook = (id, data) => {
  return Axios.put(`${process.env.REACT_APP_URL}/books/user/${id}`, data,
  {
      headers : {
        "Authorization" : localStorage.getItem("token")
      }
    })
}

