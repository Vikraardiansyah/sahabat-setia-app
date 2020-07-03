import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import qs from "querystring";
import { connect } from "react-redux";
import { postAuthorActionCreator } from "../redux/actions/author";

class ModalAddAuthor extends Component {
  state = {
    show: false,
    validated: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      this.postAuthor();
    }
    this.setState({
      validated: true,
    });
  };

  postAuthor = async () => {
    const { token } = this.props.login;
    const { author } = this.state;
    await this.props.postAuthorAction(
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
    const { show, validated } = this.state;
    return (
      <>
        <Button variant="primary" size="sm" onClick={this.handleShow}>
          Add
        </Button>

        <Modal show={show} onHide={this.handleClose} size="sm">
          <Modal.Header closeButton>
            <Form onSubmit={this.handleSubmit} validated={validated} noValidate>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Author"
                  onChange={this.handleAuthor}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please fill the form.
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                size="sm"
                style={{ marginLeft: "200px" }}
              >
                Add
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
    postAuthorAction: (body, token) => {
      dispatch(postAuthorActionCreator(body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddAuthor);
