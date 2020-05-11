import React, { Component} from 'react'
import {tokenUser} from '../utils/http'
import qs from 'querystring'



class Token extends Component {
    state = {
        token: localStorage.getItem("refreshToken")
    }
    componentDidMount(){
        this.token()
      }
    token = async () => {
        const {token} = this.state
        await tokenUser(qs.stringify({
        token
        }))
        .then((response) => {
            console.log(response)
            localStorage.setItem("token", response.data.data.token)
            this.props.history.push(localStorage.getItem("lastPage"))
        })
        .catch((error) => {
            console.log({error})
        })
    }
    render(){
        return (
        <>
        </>
        )
    }
  }

export default Token