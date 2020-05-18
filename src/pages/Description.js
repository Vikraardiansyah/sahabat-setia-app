import React, { Component } from 'react'
import qs from 'querystring'
import {Image} from 'react-bootstrap'
import ModalEdit from '../components/ModalEdit'
import ModalsDelete from '../components/ModalsDelete'
import {deleteBook, borrowBook, postBorrow, putBorrow, postOrder} from '../utils/http'
import Loading from '../images/loading.gif'
import {connect} from 'react-redux'
import {getBookByIdActionCreator} from '../redux/actions/getBookById'
import '../styles/Description.css'
import BackButton from '../images/backbutton.png'

class Description extends Component {

    state = {
        role: atob(localStorage.getItem("role")),
        email: localStorage.getItem("email"),
        id_user: localStorage.getItem("id"),
        data: {}
    }

    componentDidMount() {
        this.getBookById()
        localStorage.setItem("lastPage", `/description/${this.props.match.params.id}`)
    }

    auth = () => {
          this.props.history.push("/login")
    }

    getBookById = async () => {
        const {id} = this.props.match.params
        const {token} = this.props.login
        await this.props.getBookByIdAction(id, token)
    }

    // getBookById = async () => { 
    //     const id = this.props.match.params.id
    //     await getBookById(id)
    //     .then((response) => {
    //       this.setState({
    //         data : response.data.data[0],
    //         isLoading: true
    //       })
    //     })
    //     .catch((error) => {
    //         this.setState({
    //             error: error.response.data.data.message
    //           })
    //           if(this.state.error === "TokenExpiredError"){
    //             this.props.history.push("/token")
    //           } else if (this.state.error === "JsonWebTokenError") {
    //             this.props.history.push("/login")
    //           }
    //     })
    // }

    deleteBook = async () => {
    const id = this.props.match.params.id
        await deleteBook(id)
    }
    
    borrowBook = async () => {
        const {token} = this.props.login
        const {id} = this.props.match.params
        const {response} = this.props.getBookById
        await borrowBook(id, qs.stringify({
            id_status: this.state.id_status,
            email_borrow: this.state.email_borrow
        }), token)
        await postBorrow(qs.stringify({
            id_book: response.id,
            id_user: this.props.login.response.id,
            status: 2
        }), token)
        this.getBookById()
        }
    
    returnBook = async () => {
        const {token} = this.props.login
        const {id} = this.props.match.params
        const {response} = this.props.getBookById
        await borrowBook(id, qs.stringify({
            id_status: this.state.id_status,
            email_borrow: this.state.email_borrow
        }), token)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log({error})
        })
        await putBorrow(qs.stringify({
            id_book: response.id,
            id_user: this.props.login.response.id,
            status: 1
        }), token)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log({error})
        })
        this.getBookById()
        }

    handleBorrow =  async () => {
        const {email} = this.props.login.response
        const {id_status} = this.props.getBookById.response
        if(id_status === 1) {
            this.setState({
                id_status: 2,
                email_borrow: email,
                isLoading: false
            }, () => this.borrowBook())
        } else {
            this.setState({
                id_status: 1,
                email_borrow: "",
                isLoading: false
            }, () => this.returnBook())
        }
    }

    postOrder = async () => {
        const {id} = this.props.match.params
        await postOrder(qs.stringify({
            id_book: id,
            id_user: this.props.login.response.id,
        }))
        this.getBookById()
    }

    render() {
        const {isLoading, isFulfilled, isRejected, response} = this.props.getBookById
        const {role, email} = this.props.login.response
        const {id} = this.props.match.params
           return (
            <>
                {!isLoading && isFulfilled ? <div className="value">
                <Image className="top-cover" src={`${process.env.REACT_APP_URL}/${response.image}`} fluid/>
                <Image className="cover" src={`${process.env.REACT_APP_URL}/${response.image}`}/>
                <Image className="back-button" src={BackButton} onClick={() => this.props.history.push("/")}></Image>
                {role === 1 ? <ModalEdit data={response} id={id} getBookById={this.getBookById}/> : <></>}
                {role === 1 ? <ModalsDelete delete={this.deleteBook} history={this.props.history}/> : <></>}
                <div className="badge-novel">{response.genre}</div>
                {response.id_status === 1 ? <div className="status">{response.status}</div> : <div className="status-red">{response.status}</div>}
                <div className="detail">
                    <div className="title">{response.title}</div> 
                    <div className="description">{response.description}</div>
                </div>
                {response.id_status === 1 && role === 2 ? <div className="badge-borrow" onClick={this.handleBorrow}>Borrow</div> : response.id_status === 2 && response.email_borrow === email ? <div className="badge-return" onClick={this.handleBorrow}>Return</div> : role === 2 ? <div className="badge-return" onClick={this.postOrder}>Order</div> : <></>}
                </div> : <img src={Loading} alt="loading" style={{display: "block", margin: "auto"}}></img>}
                {isRejected ? this.auth() : ""}
            </>
        )
    }
}

const mapStateToProps = ({
    login,
    getBookById,
}) => {
    return {
        login,
        getBookById,
    }
}

const mapDispatchToProps= (dispatch) => {
    return {
        getBookByIdAction: (id, headers) => {
            dispatch(getBookByIdActionCreator(id, headers))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Description)