import React, {Component} from 'react'
import qs from 'querystring'
import {Row, Col, Form, Button, Container, Alert, Image} from 'react-bootstrap'
import Background from '../images/Background.jpg'
import '../styles/Register.css'
import {connect} from 'react-redux'
import {registerActionCreator} from '../redux/actions/register'

// eslint-disable-next-line
const validPasswordRegex = RegExp(/^(?=.*[a-z])(?=.*[0-9]).{8,}$/i)
// eslint-disable-next-line
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Register extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    submit: "",
    validated: false,
    errors: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  }

  componentDidUpdate() {
    const {isFulfilled} = this.props.register
    const {history} = this.props
    if(isFulfilled) {
      history.push("/login")
    }
  }

  handleChange = (event) => {
    this.setState({
      submit: ""
    })
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'name': 
        errors.name = 
          value.length < 5
            ? 'Name must be 5 characters long'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid';
        break;
      case 'password': 
        errors.password = 
        validPasswordRegex.test(value)
            ? ''
            : 'Password must be minimum 8 characters, at least one letter and one number';
        break;
      case 'confirmPassword':
        const {password} = this.state
        errors.confirmPassword = 
          value !== password
            ? 'Your password and confirmation password do not match'
            : '';
        break;
      default:
        break;
    }
    this.setState({errors, [name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else{
      if(validateForm(this.state.errors)) {
        this.register()
      }else{
        console.error('Invalid Form')
      }
    }
    this.setState({
      validated: true
    })
  }

  register = async () => {
    const {registerAction} = this.props
    const {name, email, password} = this.state
      await registerAction(qs.stringify({
        name,
        email,
        password,
        role: 2,
      }))
  }

  // register = async () => {
  //   const { name, email, password } = this.state
  //     await register(qs.stringify({
  //       name,
  //       email,
  //       password,
  //       role: 2
  //   }))
  //     .then((response) => {
  //       this.props.history.push("/login")
  //     })
  //     .catch((error) => {
  //       this.setState({
  //         submit: error.response.data.data.message
  //       })
  //     })
  // }
  render(){
    const {errors, validated} = this.state
    const {isLoading, isRejected, errorMsg} = this.props.register
    return (
      <>
      <Container fluid style={{marginLeft: "-2%", paddingRight: "10%"}}>
        <Row>
          <Col>
            <Image src={Background} style={{height: "100vh", width: "60vw"}}/>
          </Col>
          <Col xs={10} sm={5} md={4} lg={3} style={{marginTop: "7%"}}>
            <h1>SAHABAT SETIA LIBRARY</h1>
            <Form onSubmit={this.handleSubmit} validated={validated} noValidate>
            <Form.Group controlId="formBasicName">
                {isRejected && !isLoading ?
                <Alert variant="danger" style={{textAlign: "center"}}>{errorMsg}</Alert> : <></>}
                <Form.Label >Your Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter Name" onChange={this.handleChange} noValidate required autoComplete="off"/>
                {errors.name.length > 0 && 
                <span className='error'>{errors.name}</span>}
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label >Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleChange} noValidate required autoComplete="off"/>
                {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label >Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} noValidate required/>
                {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label >Confirmation Password</Form.Label>
                <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange} noValidate required/>
                {errors.confirmPassword.length > 0 && 
                <span className='error'>{errors.confirmPassword}</span>}
            </Form.Group>
            <Button variant="primary" type="submit">
                Sign Up
            </Button>{' '}
            <Button variant="light" onClick={() => this.props.history.push("/login")} >
                Login
            </Button>
            </Form>
          </Col>
        </Row>
        </Container>
        </>
    )
  }
}

const mapStateToProps = ({
  register,
}) => {
  return {
    register,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerAction: (data) => {
      dispatch(registerActionCreator(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)