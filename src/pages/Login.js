import React, {Component} from 'react'
import {loginUser} from '../utils/http'
import qs from 'querystring'
import {Row, Col, Form, Button, Container, Alert} from 'react-bootstrap'
import Background from '../images/Background.jpg'


class Login extends Component {
  state = {
    email: "",
    password: "",
    validated: false,
    marginTop: "10%",
    alert: false
  }

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
      });
  }
  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
      });
  }
  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.login()
    }
  }
  login = async () => {
    const { email, password } = this.state
    await loginUser(qs.stringify({
      email,
      password,
    }))
      .then((response) => {
        localStorage.setItem("token", response.data.data.token)
        localStorage.setItem("refreshToken", response.data.data.refreshToken)
        localStorage.setItem("role", btoa(response.data.data.role))
        localStorage.setItem("name", response.data.data.name)
        localStorage.setItem("email", response.data.data.email)
        localStorage.setItem("lastPage", "/")
        this.props.history.push("/token")
      })
      .catch((error) => {
          this.setState({
            marginTop: "5%",
            alert: true
          })
      })
  }
  render(){
    return (
      <Container  fluid style={{backgroundImage: `url(${Background})`, height: "100vh"}}>
        <Container fluid >
        <Row>
          <Col style={{margin: 'auto', textAlign: "center", marginTop: "50px"}}>
            <h1 style={{color: "white"}} >SAHABAT SETIA LIBRARY</h1> 
          </Col>
        </Row>
        <Row>
          <Col xs={10} lg={3} style={{marginTop: this.state.marginTop, marginLeft: "auto", marginRight: "auto", display: "block"}} >
          {this.state.alert ? <Alert  variant="danger">
            Invalid email or password!
          </Alert>: <></>}
            <Form noValidate validated={this.state.validated}>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label style={{color: "white"}} >Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmail} onKeyPress={this.handleKeyPress} autoComplete="off"/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                  <Form.Label style={{color: "white"}}>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={this.handlePassword} onKeyPress={this.handleKeyPress}/>
                  <Form.Text style={{color: "white"}}>
                  We'll never share your password with anyone else.
                  </Form.Text>
              </Form.Group>
              <Button variant="primary" type="button" onClick={this.login} onKeyPress={this.handleKeyPress} >
                  Login
              </Button>{' '}
              <Button variant="light" onClick={() => {this.props.history.push("/register")}}>
                  Sign Up
              </Button>
              </Form>
          </Col>
        </Row>
        </Container>
      </Container>
    )
  }
}

export default Login