import React, { Component } from "react";
import { Container, Row, Col, Card, Image, Form } from "react-bootstrap";
import "../styles/Home.css";
import qs from "querystring";
import { debounce } from "lodash";
import NavbarComp from "../components/NavbarComp";
import ModalAdd from "../components/ModalAdd";
import Paginations from "../components/Paginations";
import Carousel from "../components/Carousel";
import Loading from "../images/loading.gif";
import { connect } from "react-redux";
import {
  getBooksActionCreator,
  getBooksByRecommendedActionCreator,
} from "../redux/actions/books";
import { logoutActionCreator } from "../redux/actions/logout";
import { getAuthorActionCreator } from "../redux/actions/author";
import { getGenreActionCreator } from "../redux/actions/genre";
import { getStatusActionCreator } from "../redux/actions/status";

class Home extends Component {
  async componentDidMount() {
    const {
      getBooksAction,
      getBooksByRecommendedAction,
      getAuthorAction,
      getGenreAction,
      getStatusAction,
      login,
    } = this.props;
    await getBooksAction();
    await getBooksByRecommendedAction();
    if (login.response.role === 1) {
      await getGenreAction(login.token);
    }
    if (login.response.role === 1) {
      await getAuthorAction(login.token);
    }
    if (login.response.role === 1) {
      await getStatusAction(login.token);
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState !== this.state) {
      const { page, limit, value, sort, search } = this.state;
      let query = "?";
      if (search) {
        query += `search=${search}&`;
      }
      if (value) {
        query += `value=${value}&`;
      }
      if (sort) {
        query += `sort=${sort}&`;
      }
      if (page) {
        query += `page=${page}&`;
      }
      if (limit) {
        query += `limit=${limit}`;
      }
      this.props.history.push(query);
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

  getBooks = async () => {
    const { getBooksAction } = this.props;
    await getBooksAction(qs.stringify(this.state));
  };

  getBooksDebounce = debounce(() => this.getBooks(), 1000);

  getById = (id, books) => {
    this.props.history.push(`/description/${id}/${books}`);
  };

  handlePage = (e) => {
    this.setState(
      {
        page: e.target.id,
      },
      () => this.getBooks()
    );
  };
  handleLimit = (e) => {
    this.setState(
      {
        limit: e.target.value,
      },
      () => this.getBooks()
    );
  };

  handleValue = (e) => {
    this.setState(
      {
        value: e.target.value,
      },
      () => this.getBooks()
    );
  };

  handleSort = (e) => {
    this.setState(
      {
        sort: e.target.value,
      },
      () => this.getBooks()
    );
  };

  handleSearch = (e) => {
    this.setState(
      {
        search: e.target.value,
      },
      () => this.getBooksDebounce()
    );
  };

  render() {
    const { role } = this.props.login.response;
    const { resBooks, isLoading, isFulfilled } = this.props.books;
    return (
      <>
        <NavbarComp
          logout={this.logout}
          search={this.handleSearch}
          home={this.home}
          manage={this.manage}
          history={this.history}
        />
        <Carousel getById={this.getById} />
        <Container>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control as="select" size="sm" onChange={this.handleValue}>
                  <option value="">Sort By</option>
                  <option value="">New release</option>
                  <option value="books.title">Title</option>
                  <option value="author.author">Author</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control as="select" size="sm" onChange={this.handleSort}>
                  <option value="true">A-Z</option>
                  <option value="false">Z-A</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control as="select" size="sm" onChange={this.handleLimit}>
                  <option value="6">6</option>
                  <option value="12">12</option>
                  <option value="18">18</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col key="pagination">
              <Paginations handlePage={this.handlePage} />
            </Col>
            <Col xl={{ offset: 5 }}>
              {role === 1 ? <ModalAdd getBooks={this.getBooks} /> : <></>}
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col style={{ fontWeight: "bold", fontSize: "20px" }}>
              <hr />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            {!isLoading && isFulfilled ? (
              resBooks.map((data) => (
                <Col
                  lg={2}
                  xs={6}
                  key={data.id}
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() => this.getById(data.id, `books`)}
                >
                  <Image
                    src={`${process.env.REACT_APP_URL}/${data.image}`}
                    style={{ height: "200px" }}
                    rounded
                  />
                  <Card style={{ border: "none" }}>
                    <Card.Body style={{ padding: "4px" }}>
                      <Card.Text style={{ margin: "1px" }}>
                        {data.title}
                      </Card.Text>
                      <Card.Text style={{ margin: "1px" }}>
                        <small className="text-muted">{data.author}</small>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <img
                src={Loading}
                alt="loading"
                style={{ display: "block", margin: "auto" }}
              ></img>
            )}
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ books, author, genre, status, login }) => {
  return {
    books,
    author,
    genre,
    status,
    login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBooksAction: (data) => {
      dispatch(getBooksActionCreator(data));
    },
    getBooksByRecommendedAction: () => {
      dispatch(getBooksByRecommendedActionCreator());
    },
    logoutAction: () => {
      dispatch(logoutActionCreator());
    },
    getAuthorAction: (token) => {
      dispatch(getAuthorActionCreator(token));
    },
    getGenreAction: (token) => {
      dispatch(getGenreActionCreator(token));
    },
    getStatusAction: (token) => {
      dispatch(getStatusActionCreator(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
