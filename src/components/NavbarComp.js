import React, { Component } from 'react'
import { Throttle } from 'react-throttle'
import { Nav, Navbar, Form, FormControl} from 'react-bootstrap'
import {connect} from 'react-redux'
import '../styles/Home.css'


class NavbarComp extends Component {

    render() {
        const {role, name} = this.props.login.response
        const {isFulfilled} = this.props.login
        return (
            <>
            <Navbar bg="light" variant="light" expand="xl" sticky="top">
                <Navbar.Brand onClick={this.props.home} style={{cursor: "pointer"}}>SAHABAT SETIA LIBRARY</Navbar.Brand>
                {this.props.search === "Not use" ? <></> : <Form>
                      <Throttle time="2000" handler="onKeyUp">
                        <FormControl type="text" placeholder="Search" onKeyUp={this.props.search}/>
                      </Throttle>
                    </Form>}
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="mr-auto" style={{color: "black"}}>
                        {isFulfilled ? `${name}` : "Guest"}
                    </Navbar.Text>
                    <Nav>
                    {role === 1 ? <Nav.Link onClick={this.props.manage}>Manage</Nav.Link> : <></>}
                    {role ? <Nav.Link onClick={this.props.history}>History</Nav.Link> : <></>}
                    <Nav.Link  onClick={this.props.logout}>{isFulfilled ? `Logout` : `Login`}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
          </Navbar>
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

export default connect(mapStateToProps)(NavbarComp)