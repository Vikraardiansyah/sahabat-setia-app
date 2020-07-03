import React, { Component } from "react";
import { Nav, Navbar, Form, FormControl, Image } from "react-bootstrap";
import { connect } from "react-redux";
import Icon from "../images/icon.png";

class NavbarComp extends Component {
  render() {
    const { name, role } = this.props.login.response;
    return (
      <>
        <Navbar
          style={{ backgroundColor: "#CDD5DC" }}
          variant="light"
          expand="xl"
          sticky="top"
        >
          <Navbar.Brand onClick={this.props.home} style={{ cursor: "pointer" }}>
            SAHABAT SETIA
            <Image
              src={Icon}
              style={{
                width: "30px",
                height: "30px",
                marginLeft: "5px",
              }}
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Navbar.Collapse className="justify-content-between">
            <Nav>
              {this.props.search === "Not use" ? (
                <></>
              ) : (
                <Form>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    onKeyUp={this.props.search}
                    style={{ borderRadius: "20px" }}
                  />
                </Form>
              )}
            </Nav>
            <Nav>
              <Image
                src={
                  name
                    ? `https://ui-avatars.com/api/?size=35&background=f4f4f4&color=000&name=${name}`
                    : `https://ui-avatars.com/api/?size=35&background=f4f4f4&color=000&name=guest`
                }
                roundedCircle
                style={{
                  width: "35px",
                  height: "35px",
                  marginRight: "5px",
                  marginTop: "3px",
                }}
              />
              <Navbar.Text className="mr-auto" style={{ color: "black" }}>
                {name ? `${name}` : "Guest"}
              </Navbar.Text>
            </Nav>

            <Nav>
              {role === 1 ? (
                <Nav.Link onClick={this.props.manage}>Manage</Nav.Link>
              ) : (
                <></>
              )}
              {role === 1 || role === 2 ? (
                <Nav.Link onClick={this.props.history}>History</Nav.Link>
              ) : (
                <></>
              )}
              <Nav.Link onClick={this.props.logout}>
                {role === 1 || role === 2 ? `Logout` : `Login`}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = ({ login }) => {
  return {
    login,
  };
};

export default connect(mapStateToProps)(NavbarComp);
