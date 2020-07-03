import React, { Component } from "react";
import qs from "querystring";
import { Image } from "react-bootstrap";
import ModalEdit from "../components/ModalEdit";
import ModalsDelete from "../components/ModalsDelete";
import { deleteBook } from "../utils/http";
import Loading from "../images/loading.gif";
import { connect } from "react-redux";
import {
  getBooksActionCreator,
  getBookByIdActionCreator,
  getBookByIdRecommendedActionCreator,
  borrowBookActionCreator,
} from "../redux/actions/books";
import {
  getBorrowActionCreator,
  postBorrowActionCreator,
  putBorrowActionCreator,
} from "../redux/actions/borrow";
import "../styles/Description.css";
import BackButton from "../images/backbutton.png";

class Description extends Component {
  async componentDidMount() {
    const { books } = this.props.match.params;
    if (books === `books`) {
      await this.getBookById();
    }
    if (books === `recommended`) {
      await this.getBookByIdRecommended();
    }
  }
  getBookById = async () => {
    const { id } = this.props.match.params;
    await this.props.getBookByIdAction(id);
  };
  getBookByIdRecommended = async () => {
    const { id } = this.props.match.params;
    await this.props.getBookByIdRecommendedAction(id);
  };

  deleteBook = async () => {
    const { token } = this.props.login;
    const id = this.props.match.params.id;
    await deleteBook(id, token);
  };

  borrowBook = async () => {
    const { id } = this.props.match.params;
    const { resBookById } = this.props.books;
    const { email, name } = this.props.login.response;
    const id_user = this.props.login.response.id;
    const { token } = this.props.login;
    const { postBorrowAction, borrowBookAction } = this.props;
    const { id_status, email_borrow } = this.state;
    await borrowBookAction(
      id,
      qs.stringify({
        id_status,
        email_borrow,
        status: "Unavailable",
      }),
      token
    );
    await postBorrowAction(
      qs.stringify({
        id_book: resBookById.id,
        id_user,
        status: 2,
        title: resBookById.title,
        image: resBookById.image,
        email,
        name,
        borrow_at: new Date().toISOString(),
        return_at: new Date().toISOString(),
      }),
      token
    );
  };

  returnBook = async () => {
    const { id } = this.props.match.params;
    const { resBookById } = this.props.books;
    const id_user = this.props.login.response.id;
    const { token } = this.props.login;
    const { putBorrowAction, borrowBookAction } = this.props;
    const { id_status, email_borrow } = this.state;
    await borrowBookAction(
      id,
      qs.stringify({
        id_status,
        email_borrow,
        status: "Available",
      }),
      token
    );
    await putBorrowAction(
      qs.stringify({
        id_book: resBookById.id,
        id_user,
        status: 1,
        return_at: new Date().toISOString(),
      }),
      token
    );
  };

  handleBorrow = async () => {
    const { email } = this.props.login.response;
    const { id_status } = this.props.books.resBookById;
    if (id_status === 1) {
      this.setState(
        {
          id_status: 2,
          email_borrow: email,
          isLoading: false,
        },
        () => this.borrowBook()
      );
    } else {
      this.setState(
        {
          id_status: 1,
          email_borrow: "",
          isLoading: false,
        },
        () => this.returnBook()
      );
    }
  };

  render() {
    const { isLoading, isFulfilled, resBookById } = this.props.books;
    const { role, email } = this.props.login.response;
    const { id } = this.props.match.params;
    return (
      <>
        {!isLoading && isFulfilled && resBookById ? (
          <div className="value">
            <Image
              className="top-cover"
              src={`${process.env.REACT_APP_URL}/${resBookById.image}`}
              fluid
            />
            <Image
              className="cover"
              src={`${process.env.REACT_APP_URL}/${resBookById.image}`}
            />
            <Image
              className="back-button"
              src={BackButton}
              onClick={() => this.props.history.push("/")}
            ></Image>
            {role === 1 ? (
              <ModalEdit
                data={resBookById}
                id={id}
                getBookById={this.getBookById}
              />
            ) : (
              <></>
            )}
            {role === 1 ? (
              <ModalsDelete
                delete={this.deleteBook}
                history={this.props.history}
              />
            ) : (
              <></>
            )}
            <div className="badge-novel">{resBookById.genre}</div>
            {resBookById.id_status === 1 ? (
              <div className="status">{resBookById.status}</div>
            ) : (
              <div className="status-red">{resBookById.status}</div>
            )}
            <div className="detail">
              <div className="title">{resBookById.title}</div>
              <div className="author">{resBookById.author}</div>
              <div className="description">{resBookById.description}</div>
            </div>
            {resBookById.id_status === 1 && role === 2 ? (
              <div className="badge-borrow" onClick={this.handleBorrow}>
                Borrow
              </div>
            ) : resBookById.id_status === 2 &&
              resBookById.email_borrow === email ? (
              <div className="badge-return" onClick={this.handleBorrow}>
                Return
              </div>
            ) : role === 2 ? (
              <div className="badge-return" onClick={this.postOrder}>
                Order
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <img
            src={Loading}
            alt="loading"
            style={{ display: "block", margin: "auto" }}
          ></img>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ books, login }) => {
  return {
    books,
    login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBooksAction: () => {
      dispatch(getBooksActionCreator());
    },
    getBookByIdAction: (id) => {
      dispatch(getBookByIdActionCreator(id));
    },
    getBookByIdRecommendedAction: (id) => {
      dispatch(getBookByIdRecommendedActionCreator(id));
    },
    borrowBookAction: (id, body, token) => {
      dispatch(borrowBookActionCreator(id, body, token));
    },
    getBorrowAction: (token) => {
      dispatch(getBorrowActionCreator(token));
    },
    postBorrowAction: (body, token) => {
      dispatch(postBorrowActionCreator(body, token));
    },
    putBorrowAction: (body, token) => {
      dispatch(putBorrowActionCreator(body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Description);
