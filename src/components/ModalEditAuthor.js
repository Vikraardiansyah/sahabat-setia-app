import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import qs from "querystring";
import { connect } from "react-redux";
import { putAuthorActionCreator } from "../redux/actions/author";

class ModalEditAuthor extends Component {
  state = {
    show: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.putAuthor();
  };

  putAuthor = async () => {
    const { id, putAuthorAction } = this.props;
    const { token } = this.props.login;
    let { author } = this.state;
    if (author === undefined) {
      author = this.props.author;
    }
    await putAuthorAction(
      id,
      qs.stringify({
        author,
      }),
      token
    );
    this.handleClose();
  };

  handleAuthor = (e) => {
    this.setState({
      author: e.target.value,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  render() {
    return (
      <>
        <Button variant="primary" size="sm" onClick={this.handleShow}>
          Edit
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose} size="sm">
          <Modal.Header closeButton>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Author"
                  defaultValue={this.props.author}
                  onChange={this.handleAuthor}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                size="sm"
                style={{ marginLeft: "200px" }}
              >
                Edit
              </Button>
            </Form>
          </Modal.Header>
        </Modal>
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
    putAuthorAction: (id, body, token) => {
      dispatch(putAuthorActionCreator(id, body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditAuthor);
