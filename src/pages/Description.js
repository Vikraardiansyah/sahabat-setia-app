import React, { Component } from 'react'
import qs from 'querystring'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import ModalEdit from '../components/ModalEdit'
import ModalsDelete from '../components/ModalsDelete'
import NavbarComp from '../components/NavbarComp'
import {getBookById, deleteBook, borrowBook} from '../utils/http'
import Loading from '../images/loading.gif'

class Description extends Component {

    state = {
        role: atob(localStorage.getItem("role")),
        email: localStorage.getItem("email")
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        })
        this.getBookById()
        this.auth()
        localStorage.setItem("lastPage", `/description/${this.props.match.params.id}`)
    }
    auth = () => {
        if(!localStorage.getItem("token")) {
          this.props.history.push("/login")
         }
    }

    home = () => {
        this.props.history.push("/")
      }

    logout = () => {
        localStorage.clear()
        this.props.history.push("/login")
    }

    getBookById = async () => { 
        const id = this.props.match.params.id
        await getBookById(id)
        .then((response) => {
          this.setState({
            data : response.data.data[0],
            isLoading: true
          })
        })
        .catch((error) => {
          this.setState({
            error : {error}
          })
          if(this.state.error){
              this.props.history.push("/login")
          }
        })
    }

    deleteBook = async () => {
    const id = this.props.match.params.id
        await deleteBook(id)
        .then((response) => {
        console.log(response)
        })
        .catch((error) => {
            console.log({error})
        })
    }
    
    borrowBook = async () => {
        const id = this.props.match.params.id
        await borrowBook(id, qs.stringify({
            id_status: this.state.id_status,
            email_borrow: this.state.email_borrow
        }))
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log({error})
    })
    this.getBookById()
    }
    
    handleBorrow =  async () => {
        if(this.state.data.id_status === 1) {
            this.setState({
                id_status: 2,
                email_borrow: localStorage.getItem("email"),
                isLoading: false
            }, () => this.borrowBook())
        } else {
            this.setState({
                id_status: 1,
                email_borrow: "",
                isLoading: false
            }, () => this.borrowBook())
        }
    }

    render() {
        const {data, role, isLoading, email} = this.state
        return (
            <>
                <NavbarComp logout={this.logout} home={this.home} search="Not use"/>
                    <Container style={{ marginTop: "70px", paddingLeft: "30px"}}>
                        { isLoading && role === "1" ? <ModalEdit data={data} id={this.props.match.params.id} getBookById={this.getBookById}/> : <></>}
                        {role === "1" ? <ModalsDelete delete={this.deleteBook} history={this.props.history}/> : <></>}
                        { isLoading && data.id_status === 1 ? <Button href="#" variant="success" style={{ margin: "auto"}} onClick={this.handleBorrow} size="sm">Borrow</Button> : isLoading && data.id_status === 2 && data.email_borrow === email ? <Button href="#" variant="success" style={{ margin: "auto"}} onClick={this.handleBorrow} size="sm">Return</Button> : <Button href="#" variant="success" style={{ margin: "auto"}} onClick={this.handleBorrow} size="sm" disabled>Borrow</Button> }
                    </Container>
                    <Container style={{ marginTop: "10px" }}>
                        {isLoading ? <Row>
                            <Col xs={12} lg={4}>
                                <Image src={`${process.env.REACT_APP_URL}/${data.image}`} rounded style={{ maxHeight: "500px", display: "block", margin: "auto"}} />
                            </Col>
                            <Col xs={12} lg={8} style={{display: "block", marginLeft: "auto", marginRight: "auto"}} >
                                <h2>{data.title}</h2>
                                <h5 style={{marginBottom: "3px", fontWeight: "bold"}} >Description</h5>
                                <p style={{textAlign: "justify"}} >{data.description}</p>
                                <p style={{margin: "3px", fontWeight: "bold"}} >Author: {data.author}</p>
                                <p style={{margin: "3px", fontWeight: "bold"}}>Genre: {data.genre}</p> 
                                <p style={{margin: "3px", fontWeight: "bold"}}>Status: {data.status}</p>
                            </Col>
                        </Row> : <img src={Loading} alt="loading" style={{display: "block", margin: "auto"}}></img>}
                    </Container>
            </>
        )
    }
}

export default Description