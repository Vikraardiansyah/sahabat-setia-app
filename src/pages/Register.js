import React, {Component} from 'react'
import {register} from '../utils/http'
import qs from 'querystring'
import {Row, Col, Form, Button, Container, Alert} from 'react-bootstrap'
import Background from '../images/Background.jpg'


class Register extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    marginTop: "8%",
    validPassword: false,
    validEmail: false,
    success: false
  }
  handleName = (event) => {
    this.setState({
      name: event.target.value,
      });
  }
  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
      });
  }
  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
      });
  }
  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.register()
    }
  }

  register = async () => {
    const { name, email, password } = this.state
    const validation = "^(?=.*[a-z])(?=.*[0-9]).{8,}$" 
    if(password.match(validation)){
      await register(qs.stringify({
        name,
        email,
        password,
        role: 2
    }))
      .then((response) => {
        this.setState({
          validPassword: false,
          validEmail: false,
          success: true,
          marginTop: "2%"
        })
      })
      .catch((error) => {
        this.setState({
          validPassword: false,
          success: false,
          validEmail: true,
          marginTop: "4%"
        })
      })
    } else{
      this.setState({
        validEmail: false,
        success: false,
        validPassword: true,
        marginTop: "2%"
      })
    }
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
          {this.state.validPassword ? <Alert  variant="danger">
            Password minimum eight characters, at least one letter and one number.
          </Alert>: <></>}
          {this.state.validEmail ? <Alert  variant="danger">
            Email already exist.
          </Alert>: <></>}
          {this.state.success ? <Alert  variant="success">
            Account successfully created, please login.
          </Alert>: <></>}
            <Form.Group controlId="formBasicName">
                <Form.Label style={{color: "white"}}>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" onChange={this.handleName} onKeyPress={this.handleKeyPress} autoComplete="off"/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label style={{color: "white"}}>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmail} onKeyPress={this.handleKeyPress} autoComplete="off"/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label style={{color: "white"}}>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={this.handlePassword} onKeyPress={this.handleKeyPress}/>
                <Form.Text style={{color: "white"}}>
                  We'll never share your password with anyone else.
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.register} onKeyPress={this.handleKeyPress}>
                Sign Up
            </Button>{' '}
            <Button variant="light" type="submit" onClick={() => this.props.history.push("/login")} >
                Login
            </Button>
          </Col>
        </Row>
        </Container>
      </Container>
    )
  }
}

export default Register