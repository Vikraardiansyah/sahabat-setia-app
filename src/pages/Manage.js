import React, {Component} from 'react'
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import NavbarComp from '../components/NavbarComp'
import {connect} from 'react-redux'
import {logoutActionCreator} from '../redux/actions/logout'

class Manage extends Component {

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
        const {author, genre} = this.props
        return (
            <>
            <NavbarComp logout={this.logout} search="Not use" home={this.home} manage={this.manage} history={this.history}/>
            <Container>
                <Row>
                    <Col lg={{span: 4, offset: 2}}>
                        <Table responsive="xl">
                            <thead>
                                <tr>
                                    <th colspan="3" style={{textAlign: "center"}}>Author</th>
                                </tr>
                            </thead>
                            <tbody>
                            {author.response.map(author =>
                                <tr>
                                    <td>{author.author}</td>
                                    <td><Button variant="primary" size="sm">Edit</Button></td>
                                    <td><Button variant="danger" size="sm">Delete</Button></td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg={4}>
                        <Table responsive="xl">
                            <thead>
                                <tr>
                                    <th colspan="3" style={{textAlign: "center"}}>Genre</th>
                                </tr>
                            </thead>
                            <tbody>
                            {genre.response.map(genre =>
                                <tr>
                                    <td>{genre.genre}</td>
                                    <td><Button variant="primary" size="sm">Edit</Button></td>
                                    <td><Button variant="danger" size="sm">Delete</Button></td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}

const mapStateToProps = ({
    author,
    genre,
}) => {
    return {
        author,
        genre,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      logoutAction: () => {
          dispatch(logoutActionCreator())
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage)