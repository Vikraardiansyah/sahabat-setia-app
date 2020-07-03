import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import qs from "querystring";
import { connect } from "react-redux";
import { putGenreActionCreator } from "../redux/actions/genre";

class ModalEditGenre extends Component {
  state = {
    show: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.putGenre();
  };

  putGenre = async () => {
    const { id, putGenreAction } = this.props;
    const { token } = this.props.login;
    let { genre } = this.state;
    if (genre === undefined) {
      genre = this.props.genre;
    }
    await putGenreAction(
      id,
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
                  placeholder="Genre"
                  defaultValue={this.props.genre}
                  onChange={this.handleGenre}
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
    putGenreAction: (id, body, token) => {
      dispatch(putGenreActionCreator(id, body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditGenre);
