import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import NavbarComp from "../components/NavbarComp";
import ModalAddAuthor from "../components/ModalAddAuthor";
import ModalEditAuthor from "../components/ModalEditAuthor";
import ModalDeleteAuthor from "../components/ModalDeleteAuthor";
import ModalAddGenre from "../components/ModalAddGenre";
import ModalEditGenre from "../components/ModalEditGenre";
import ModalDeleteGenre from "../components/ModalDeleteGenre";
import { connect } from "react-redux";
import { logoutActionCreator } from "../redux/actions/logout";
import { getAuthorActionCreator } from "../redux/actions/author";
import { getGenreActionCreator } from "../redux/actions/genre";

class Manage extends Component {
  componentDidMount() {
    const { author, genre } = this.props;
    const { token } = this.props.login;
    const { role } = this.props.login.response;
    if (role !== 1) {
      this.props.history.push("/");
    }
    if (!author.isFulfilled) {
      this.props.getAuthorAction(token);
    }
    if (!genre.isFulfilled) {
      this.props.getGenreAction(token);
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
    const { author, genre } = this.props;
    return (
      <>
        <NavbarComp
          logout={this.logout}
          search="Not use"
          home={this.home}
          manage={this.manage}
          history={this.history}
        />
        <Container style={{ marginTop: "20px" }}>
          <Row>
            <Col lg={{ span: 4, offset: 2 }}>
              <Table responsive="xl">
                <thead>
                  <tr>
                    <th colSpan="2" style={{ textAlign: "center" }}>
                      Author
                    </th>
                    <th>
                      <ModalAddAuthor key={author} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {author.response.map((author) => (
                    <tr key={author.id}>
                      <td>{author.author}</td>
                      <td>
                        <ModalEditAuthor
                          id={author.id}
                          author={author.author}
                        />
                      </td>
                      <td>
                        <ModalDeleteAuthor id={author.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col lg={4}>
              <Table responsive="xl">
                <thead>
                  <tr>
                    <th colSpan="2" style={{ textAlign: "center" }}>
                      Genre
                    </th>
                    <th>
                      <ModalAddGenre key={genre} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {genre.response.map((genre) => (
                    <tr key={genre.id}>
                      <td>{genre.genre}</td>
                      <td>
                        <ModalEditGenre id={genre.id} genre={genre.genre} />
                      </td>
                      <td>
                        <ModalDeleteGenre id={genre.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ author, genre, login }) => {
  return {
    author,
    genre,
    login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => {
      dispatch(logoutActionCreator());
    },
    getAuthorAction: (token) => {
      dispatch(getAuthorActionCreator(token));
    },
    getGenreAction: (token) => {
      dispatch(getGenreActionCreator(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
