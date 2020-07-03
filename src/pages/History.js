import React, { Component } from "react";
import { Container, Row, Col, Table, Image } from "react-bootstrap";
import NavbarComp from "../components/NavbarComp";
import { connect } from "react-redux";
import {
  getBorrowActionCreator,
  getBorrowByIdActionCreator,
} from "../redux/actions/borrow";
import { logoutActionCreator } from "../redux/actions/logout";

class History extends Component {
  componentDidMount() {
    const { role, id } = this.props.login.response;
    const { token } = this.props.login;
    const { getBorrowAction, getBorrowByIdAction } = this.props;
    if (role === 1) {
      getBorrowAction(token);
    }
    if (role === 2) {
      getBorrowByIdAction(id, token);
    }
  }

  home = () => {
    this.props.history.push("/");
  };
  logout = async () => {
    const { logoutAction, history } = this.props;
    await logoutAction();
    history.push("/login");
  };

  manage = () => {
    this.props.history.push("/manage");
  };

  history = () => {
    this.props.history.push("/history");
  };

  render() {
    const { borrow } = this.props;
    const { role } = this.props.login.response;
    return (
      <>
        <NavbarComp
          logout={this.logout}
          search="Not use"
          home={this.home}
          manage={this.manage}
          history={this.history}
        />
        <>
          <Container style={{ marginTop: "20px" }}>
            <Row>
              <Col>
                <h1 style={{ textAlign: "center" }}>Borrow History</h1>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col lg={{ span: 10, offset: 1 }}>
                <Table responsive="xl">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Image</th>
                      {role === 1 ? (
                        <>
                          <th>Name</th>
                          <th>Email</th>
                        </>
                      ) : null}
                      <th>Borrow Time</th>
                      <th>Return Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrow.resBorrow.map((borrow) => (
                      <tr>
                        <td style={{ width: "200px" }}>{borrow.title}</td>
                        <td style={{ width: "200px" }}>
                          <Image
                            src={`${process.env.REACT_APP_URL}/${borrow.image}`}
                            rounded
                            style={{ width: "101px", height: "150px" }}
                          />
                        </td>
                        {role === 1 ? (
                          <>
                            <td>{borrow.name}</td>
                            <td>{borrow.email}</td>
                          </>
                        ) : null}
                        <td style={{ width: "150px" }}>
                          {new Date(borrow.borrow_at).toLocaleDateString()}
                        </td>
                        <td style={{ width: "150px" }}>
                          {borrow.status === 1
                            ? new Date(borrow.return_at).toLocaleDateString()
                            : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </>
      </>
    );
  }
}

const mapStateToProps = ({ borrow, login }) => {
  return {
    borrow,
    login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBorrowAction: (token) => {
      dispatch(getBorrowActionCreator(token));
    },
    getBorrowByIdAction: (id, token) => {
      dispatch(getBorrowByIdActionCreator(id, token));
    },
    logoutAction: () => {
      dispatch(logoutActionCreator());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
