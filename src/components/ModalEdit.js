import React, {Component} from 'react'
import {Button, Modal, Form, Col, Row, Image, Alert} from 'react-bootstrap'
import {getAuthor, getGenre, getStatus, putBook} from '../utils/http'


class ModalEdit extends Component {


    state = {
        show: false,
        authorLoad: false,
        genreLoad: false,
        statusLoad: false,
        imageFilter: false,
    }

    componentDidMount(){
      this.getAuthor()
      this.getGenre()
      this.getStatus()
    }

    getAuthor = async () => {
      await getAuthor()
      .then((response) => {
        this.setState({
          dataAuthor: response.data.data,
          authorLoad: true
        })
      })
      .catch((error) => console.log(error))
    }

    getGenre = async () => {
      await getGenre()
      .then((response) => {
        this.setState({
          dataGenre: response.data.data,
          genreLoad: true
        })
      })
      .catch((error) => console.log(error))
    }

    getStatus = async () => {
      await getStatus()
      .then((response) => {
        this.setState({
          dataStatus: response.data.data,
          statusLoad: true
        })
      })
      .catch((error) => console.log(error))
    }

  putBook = async () => {
    const {title, description, id_author, id_genre, id_status, image} = this.state
    const form = new FormData()
    if(image === undefined) {
    } else{
        form.append("image", image)
    }
    if(title === undefined){
    } else{
      form.append("title", title)
    }
    if(description === undefined){
    } else{
      form.append("description", description)
    }
    if(id_author === undefined){
    } else{
      form.append("id_author", id_author)
    }
    if(id_genre === undefined){
    } else{
      form.append("id_genre", id_genre)
    }
    if(id_status === undefined){
    } else{
      form.append("id_status", id_status)
    }
    await putBook(this.props.id, form)
    .then((response) => {
        console.log(response)
        this.handleClose()
    })
    .catch((error) => {
        this.setState({
          error: error.response.data.status
        })
        if(this.state.error === 500){
          this.handleClose()
        } else {
          this.setState({
            imageFilter: true
          })
        }
    })
    this.props.getBookById()
  }

  editTitle = (e) => {
  this.setState({
      title: e
  })
  }
  editDescription = (e) => {
  this.setState({
      description: e
  })
  }
  editAuthor = (e) => {
  this.setState({
      id_author: e
  })
  }
  editGenre = (e) => {
  this.setState({
      id_genre: e
  })
  }
  editStatus = (e) => {
  this.setState({
      id_status: e
  })
  }
  editImage = (e) => {
  this.setState({
      image: e
  })
  }

  handleClose = () => {
      this.setState({
          show: false,
          imageFilter: false
      })
  }
  handleShow = () => {
      this.setState({
          show: true
      })
  }
    render() {
    return (
      <>
        <Button variant="light" onClick={this.handleShow} size="sm">
          Edit
        </Button>
  
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="title" onChange={(e)=> {this.editTitle(e.target.value)}} defaultValue={this.props.data.title}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control type="textarea" as="textarea" placeholder="description" rows="3" onChange={(e) => {this.editDescription(e.target.value)}} defaultValue={this.props.data.description} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Author</Form.Label>
                <Form.Control as="select" onChange={(e) => {this.editAuthor(e.target.value)}} defaultValue={this.props.data.id_author}>
                <option >--Choose Author--</option>
                  {this.state.authorLoad ? this.state.dataAuthor.map(author => 
                  <option key={author.id} value={author.id}>{author.author}</option>) : <></>
                  }
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Genre</Form.Label>
                <Form.Control as="select" onChange={(e) => {this.editGenre(e.target.value)}} defaultValue={this.props.data.id_genre}>
                <option >--Choose Genre--</option>
                  {this.state.genreLoad ? this.state.dataGenre.map(genre => 
                  <option key={genre.id} value={genre.id}>{genre.genre}</option>) : <></>
                  }
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" onChange={(e) => {this.editStatus(e.target.value)}} defaultValue={this.props.data.id_status}>
                <option >--Choose Status--</option>
                  {this.state.statusLoad ? this.state.dataStatus.map(status => 
                  <option key={status.id} value={status.id}>{status.status}</option>) : <></>
                  }
                </Form.Control>
            </Form.Group>
            <Form.Group>
                
                <Form.File id="formcheck-api-regular">
                    <Form.File.Label>
                      Image
                      <Row>
                        <Col>
                          <Image src={`${process.env.REACT_APP_URL}/${this.props.data.image}`} style={{maxHeight: "100px"}} rounded/>
                        </Col>
                        <Col xs={9}>
                          {this.state.imageFilter ? <Alert variant="danger">
                            File not image or file too large
                          </Alert> : <></>}
                        </Col>
                      </Row>
                    </Form.File.Label>
                    <Form.File.Input onChange={(e) => {this.editImage(e.target.files[0])}} />
                </Form.File>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {this.putBook()}}>
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
  
export default ModalEdit