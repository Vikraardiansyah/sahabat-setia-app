import React, {Component} from 'react'
import {Container, Row, Col, Table} from 'react-bootstrap'
import NavbarComp from '../components/NavbarComp'
import {connect} from 'react-redux'
import {getBorrowActionCreator, getBorrowByIdActionCreator} from '../redux/actions/borrow'
import {getOrderActionCreator} from '../redux/actions/order'
import {logoutActionCreator} from '../redux/actions/logout'

class History extends Component {

    componentDidMount() {
        const {role, id} = this.props.login.response
        if(role === 1) {
        this.props.getBorrowAction()
        this.props.getOrderAction()
        } else {
            this.props.getBorrowByIdAction(id) 
        }
    }

    home = () => {
        this.props.history.push("/")
      }
      logout = async () => {
        const {logoutAction, history} = this.props
        await logoutAction()
        localStorage.clear()
        history.push("/login")
      }
    
      manage = () => {
        this.props.history.push("/manage")
      }
    
      history = () => {
        this.props.history.push("/history")
      }

    render() {
        const {borrow, order} = this.props
        const {role} = this.props.login.response
        return (
            <>
            <NavbarComp logout={this.logout} search="Not use" home={this.home} manage={this.manage} history={this.history}/>
            {role === 1 ? 
            <>
            <Container>
                <Row>
                    <Col>
                        <h1 style ={{textAlign: "center"}}>Borrow History</h1>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col lg={{span: 10, offset: 1}}>
                        <Table responsive="xl">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Borrow Time</th>
                                    <th>Return Time</th>
                                </tr>
                            </thead>
                            <tbody>
                            {borrow.response.map(borrow =>
                                <tr>
                                    <td>{borrow.title}</td>
                                    <td>{borrow.name}</td>
                                    <td>{borrow.email}</td>
                                    <td>{new Date(borrow.borrow_at).toLocaleString()}</td>
                                    <td>{borrow.status === 1 ? new Date(borrow.return_at).toLocaleString() : ""}</td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <h1 style ={{textAlign: "center"}}>Order List</h1>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col lg={{span: 8, offset: 2}}>
                        <Table responsive="xl">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Order Time</th>
                                </tr>
                            </thead>
                            <tbody>
                            {order.response.map(order =>
                                <tr>
                                    <td>{order.title}</td>
                                    <td>{order.name}</td>
                                    <td>{order.email}</td>
                                    <td>{new Date(order.order_at).toLocaleString()}</td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            </> :
            <>
            <Container>
                <Row>
                    <Col>
                        <h1 style ={{textAlign: "center"}}>Borrow History</h1>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col lg={{span: 8, offset: 2}}>
                        <Table responsive="xl">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Borrow Time</th>
                                    <th>Return Time</th>
                                </tr>
                            </thead>
                            <tbody>
                            {borrow.response.map(borrow =>
                                <tr>
                                    <td>{borrow.title}</td>
                                    <td>{new Date(borrow.borrow_at).toLocaleString()}</td>
                                    <td>{borrow.status === 1 ? new Date(borrow.return_at).toLocaleString() : ""}</td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            </>}
            </>
        )
    }
}

const mapStateToProps = ({
    borrow,
    login,
    order
}) => {
    return {
        borrow,
        login,
        order
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getBorrowAction: () => {
        dispatch(getBorrowActionCreator())
      },
      getBorrowByIdAction: (id) => {
        dispatch(getBorrowByIdActionCreator(id))
      },
      getOrderAction: () => {
        dispatch(getOrderActionCreator())
      },
      logoutAction: () => {
          dispatch(logoutActionCreator())
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)