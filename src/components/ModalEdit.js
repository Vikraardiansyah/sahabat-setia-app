import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "../styles/Modal.css";
import { connect } from "react-redux";
import { putBookActionCreator } from "../redux/actions/books";

class ModalEdit extends Component {
  state = {
    show: false,
    imageFilter: false,
  };

  componentDidMount() {}

  putBook = async () => {
    const {
      title,
      description,
      id_author,
      id_genre,
      id_status,
      image,
    } = this.state;
    const { id, data, putBookAction, author, genre, status } = this.props;
    const { token } = this.props.login;
    const form = new FormData();
    if (image === undefined) {
      form.append("image", data.image);
    } else {
      form.append("image", image);
    }
    if (title === undefined) {
      form.append("title", data.title);
    } else {
      form.append("title", title);
    }
    if (description === undefined) {
      form.append("description", data.description);
    } else {
      form.append("description", description);
    }
    if (id_author === undefined) {
      form.append("id_author", data.id_author);
      const dataAuthor = author.response.filter(
        (author) => author.id === data.id_author
      );
      form.append("author", dataAuthor[0].author);
    } else {
      form.append("id_author", id_author);
      const dataAuthor = author.response.filter(
        (author) => author.id === parseInt(id_author)
      );
      form.append("author", dataAuthor[0].author);
    }
    if (id_genre === undefined) {
      form.append("id_genre", data.id_genre);
      const dataGenre = genre.response.filter(
        (genre) => genre.id === data.id_genre
      );
      form.append("genre", dataGenre[0].genre);
    } else {
      form.append("id_genre", id_genre);
      const dataGenre = genre.response.filter(
        (genre) => genre.id === parseInt(id_genre)
      );
      form.append("genre", dataGenre[0].genre);
    }
    if (id_status === undefined) {
      form.append("id_status", data.id_status);
      const dataStatus = status.response.filter(
        (status) => status.id === data.id_status
      );
      form.append("status", dataStatus[0].status);
    } else {
      form.append("id_status", id_status);
      const dataStatus = status.response.filter(
        (status) => status.id === parseInt(id_status)
      );
      form.append("status", dataStatus[0].status);
    }
    await putBookAction(id, form, token);
    this.handleClose();
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  editImage = (e) => {
    this.setState({
      imageFilter: "",
    });
    var files = e.target.files;
    if (this.checkFileSize(e) && this.checkMimeType(e)) {
      // if return true allow to setState
      this.setState({
        image: files[0],
      });
    }
  };

  checkMimeType = (e) => {
    //getting file object
    let files = e.target.files;
    //define message container
    let err = "";
    // list allow mime type
    const types = ["image/png", "image/jpeg", "image/jpg"];
    // loop access array
    for (let x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every((type) => files[x].type !== type)) {
        // create error message and assign to container
        err += "is not a supported format, please pick image";
      }
    }

    if (err !== "") {
      // if message not same old that mean has error
      e.target.value = null; // discard selected file
      this.setState({
        imageFilter: err,
      });
      return false;
    }
    return true;
  };

  checkFileSize = (e) => {
    let files = e.target.files;
    let size = 1000000;
    let err = "";
    for (let x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err += "is too large, please pick a smaller file";
      }
    }
    if (err !== "") {
      e.target.value = null;
      this.setState({
        imageFilter: err,
      });
      return false;
    }

    return true;
  };

  handleClose = () => {
    this.setState({
      show: false,
      imageFilter: false,
    });
  };
  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  render() {
    const { imageFilter } = this.state;
    const { author, genre, status, data } = this.props;
    return (
      <>
        <div onClick={this.handleShow} className="edit">
          Edit
        </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="title"
                onChange={this.handleChange}
                defaultValue={data.title}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="textarea"
                as="textarea"
                name="description"
                placeholder="description"
                rows="3"
                onChange={this.handleChange}
                defaultValue={data.description}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Author</Form.Label>
              <Form.Control
                as="select"
                name="id_author"
                onChange={this.handleChange}
                defaultValue={data.id_author}
              >
                <option>--Choose Author--</option>
                {author.response.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.author}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                as="select"
                name="id_genre"
                onChange={this.handleChange}
                defaultValue={data.id_genre}
              >
                <option>--Choose Genre--</option>
                {genre.response.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.genre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="id_status"
                onChange={this.handleChange}
                defaultValue={data.id_status}
              >
                <option>--Choose Status--</option>
                {status.response.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.status}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.File id="formcheck-api-regular">
                <Form.File.Label>Image</Form.File.Label>
                <Form.File.Input
                  onChange={this.editImage}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </Form.File>
              {imageFilter ? <span className="error">{imageFilter}</span> : ""}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.putBook();
              }}
            >
              Edit
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = ({ author, genre, status, login }) => {
  return {
    author,
    genre,
    status,
    login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    putBookAction: (id, body, token) => {
      dispatch(putBookActionCreator(id, body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);
