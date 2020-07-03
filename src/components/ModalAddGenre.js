import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import qs from "querystring";
import { connect } from "react-redux";
import { postGenreActionCreator } from "../redux/actions/genre";

class ModalAddGenre extends Component {
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
      this.postGenre();
    }
    this.setState({
      validated: true,
    });
  };

  postGenre = async () => {
    const { genre } = this.state;
    const { token } = this.props.login;
    await this.props.postGenreAction(
      qs.stringify({
        genre,
      }),
      token
    );
    this.handleClose();
  };
  handleGenre = (e) => {
    this.setState({
      genre: e.target.value,
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
      validated: false,
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
                  placeholder="Genre"
                  onChange={this.handleGenre}
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
    postGenreAction: (body, token) => {
      dispatch(postGenreActionCreator(body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddGenre);
