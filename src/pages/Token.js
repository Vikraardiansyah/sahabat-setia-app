import React, { Component} from 'react'
import qs from 'querystring'
import {connect} from 'react-redux'
import {tokenActionCreator} from '../redux/actions/login'




class Token extends Component {
    state = {
        token: localStorage.getItem("refreshToken")
    }
    componentDidMount(){
        this.token()
      }

    componentDidUpdate(){
        const {isFulfilled, token} = this.props.login
        const {history} = this.props
        if(isFulfilled) {
            localStorage.setItem("token", token)
            history.push(localStorage.getItem("lastPage"))
        }
    }
    
    token = async () => {
        const {refreshToken} = this.props.login.response
        const {tokenAction} = this.props
        await tokenAction(qs.stringify({token: refreshToken}))
    }
    // token = async () => {
    //     const {token} = this.state
    //     await tokenUser(qs.stringify({
    //     token
    //     }))
    //     .then((response) => {
    //         localStorage.setItem("token", response.data.data.token)
    //         this.props.history.push(localStorage.getItem("lastPage"))
    //     })
    //     .catch((error) => {
    //         console.log({error})
    //     })
    // }
    render(){
        return (
        <>
        </>
        )
    }
  }

  const mapStateToProps = ({
    login,
  }) => {
    return {
      login,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      tokenAction: (body) => {
        dispatch(tokenActionCreator(body))
      }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Token)