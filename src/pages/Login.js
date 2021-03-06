import React, { Component } from "react";
import qs from "querystring";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Image,
  Alert,
} from "react-bootstrap";
import Background from "../images/Background.jpg";
import { connect } from "react-redux";
import { loginActionCreator } from "../redux/actions/login";
import "../styles/Login.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  componentDidUpdate() {
    const { history } = this.props;
    const { isFulfilled } = this.props.login;
    localStorage.setItem("lastPage", "/");
    if (isFulfilled) {
      history.push("/token");
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.login();
    }
  };

  login = async () => {
    const { loginAction } = this.props;
    const { email, password } = this.state;
    await loginAction(
      qs.stringify({
        email,
        password,
      })
    );
  };

  render() {
    const { isRejected, isLoading, errorMsg } = this.props.login;
    return (
      <>
        <Container fluid style={{ marginLeft: "-2%", paddingRight: "10%" }}>
          <Row>
            <Col>
              <Image
                fluid
                src={Background}
                style={{ height: "100vh", width: "60vw" }}
              />
            </Col>
            <Col xs={11} lg={3} style={{ marginTop: "7%" }}>
              <h1>SAHABAT SETIA</h1>
              {isRejected && !isLoading ? (
                <Alert variant="danger" style={{ textAlign: "center" }}>
                  {errorMsg}
                </Alert>
              ) : (
                <></>
              )}
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                  />
                  <Form.Text>
                    We'll never share your password with anyone else.
                  </Form.Text>
                </Form.Group>
                <Button
                  variant="primary"
                  type="button"
                  onClick={this.login}
                  onKeyPress={this.handleKeyPress}
                >
                  Login
                </Button>{" "}
                <Button
                  variant="light"
                  type="button"
                  onClick={() => {
                    this.props.history.push("/register");
                  }}
                >
                  Sign Up
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ login }) => {
  return {
    login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (data) => {
      dispatch(loginActionCreator(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
