import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteGenreActionCreator } from "../redux/actions/genre";

class ModalsDeleteGenre extends Component {
  state = {
    show: false,
  };

  handleClose = () =>
    this.setState({
      show: false,
    });

  handleShow = () =>
    this.setState({
      show: true,
    });

  deleteGenre = async () => {
    const { id, deleteGenreAction } = this.props;
    const { token } = this.props.login;
    await deleteGenreAction(id, token);
    this.handleClose();
  };

  render() {
    return (
      <>
        <Button variant="danger" size="sm" onClick={this.handleShow}>
          Delete
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose} size="sm">
          <Modal.Header closeButton>
            <Form>
              <p>Are you sure want to delete this data?</p>
              <Button
                variant="primary"
                type="button"
                onClick={this.deleteGenre}
                style={{ marginLeft: "130px" }}
              >
                Yes
              </Button>{" "}
              <Button
                variant="secondary"
                type="button"
                onClick={this.handleClose}
              >
                No
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
    deleteGenreAction: (id, token) => {
      dispatch(deleteGenreActionCreator(id, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalsDeleteGenre);
