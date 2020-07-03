import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteAuthorActionCreator } from "../redux/actions/author";

class ModalsDeleteAuthor extends Component {
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

  deleteAuthor = async () => {
    const { id, deleteAuthorAction } = this.props;
    const { token } = this.props.login;
    await deleteAuthorAction(id, token);
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
                onClick={this.deleteAuthor}
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
    deleteAuthorAction: (id, token) => {
      dispatch(deleteAuthorActionCreator(id, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalsDeleteAuthor);
