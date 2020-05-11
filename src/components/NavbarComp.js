import React, { Component } from 'react'
import { Nav, Navbar, Form, FormControl} from 'react-bootstrap'


class NavbarComp extends Component {

    state ={
        name: localStorage.getItem("name")
    }

    render() {
        const {name} = this.state
        return (
            <>
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Navbar.Brand onClick={this.props.home} style={{cursor: "pointer"}} >SAHABAT SETIA LIBRARY</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {this.props.search === "Not use" ? <></> : <Form>
                    <FormControl type="text" placeholder="Search" onKeyUp={this.props.search}/>
                    </Form>}
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="mr-auto" style={{color: "white"}}>
                        Welcome {name}!
                    </Navbar.Text>
                    <Nav>
                    <Nav.Link onClick={this.props.logout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
          </Navbar>
            </>
        )
    }
}

export default NavbarComp