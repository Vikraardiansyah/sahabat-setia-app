import React, {Component} from 'react'
import {Button, Modal, Form, Alert} from 'react-bootstrap'
import {getAuthor, getGenre, getStatus, postBook} from '../utils/http'


class ModalAdd extends Component {


    state = {
        show: false,
        authorLoad: false,
        genreLoad: false,
        statusLoad: false,
        fillData: false,
        imageFilter: false
    }

    
    componentDidMount(){
      this.getAuthor()
      this.getGenre()
      this.getStatus()
    }

    postBook = async () => {
      const form = new FormData()
      const {title, description, id_author, id_genre, id_status, image} = this.state
      if(title === undefined || description === undefined || id_author === undefined || id_genre === undefined || id_status === undefined || image === undefined){
        this.setState({
          fillData: true
        })
      } else {
        form.append("title", title)
        form.append("description", description)
        form.append("id_author", id_author)
        form.append("id_genre", id_genre)
        form.append("id_status", id_status)
        form.append("image", image)
        await postBook(form)
        .then((response) => {
          console.log(response)
          this.handleClose()
          this.props.getBooks()
        })
        .catch((error) => {
          this.setState({
            error: error.response.data.status
          })
          if(this.state.error === 500){
            this.setState({
              fillData: true
            })
          } else {
            this.setState({
              imageFilter: true
            })
          }
        })
      }
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

    handleClose = () => {
        this.setState({
            show: false,
            fillData: false,
            imageFilter: false
        })
    }
    handleShow = () => {
        this.setState({
            show: true
        })
    }

    addTitle = (e) => {
      this.setState({
        title: e
      })
    }
    addDescription = (e) => {
      this.setState({
        description: e
      })
    }
    addAuthor = (e) => {
      this.setState({
        id_author: e
      })
    }
    addGenre = (e) => {
      this.setState({
        id_genre: e
      })
    }
    addStatus = (e) => {
      this.setState({
        id_status: e
      })
    }
    addImage = (e) => {
      this.setState({
        image: e
      })
    }
    
    render() {
    return (
      <>
        <Button variant="light" onClick={this.handleShow} size="sm" style={{height: "31px"}}>
          Add
        </Button>
  
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Book</Modal.Title>
          </Modal.Header>
          <Form >
          <Modal.Body>
            {this.state.fillData ? <Alert variant="danger">
              Fill in all forms
            </Alert> : <></>}
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="title" onChange={(e)=> {this.addTitle(e.target.value)}} required/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control type="textarea" as="textarea" placeholder="description" rows="3" onChange={(e) => {this.addDescription(e.target.value)}} required/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Author</Form.Label>
                <Form.Control as="select" onChange={(e) => {this.addAuthor(e.target.value)}} required>
                <option>--Choose Author--</option>
                  {this.state.authorLoad ? this.state.dataAuthor.map(author => 
                  <option key={author.id} value={author.id}>{author.author}</option>) : <></>
                  }
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Genre</Form.Label>
                <Form.Control as="select" onChange={(e) => {this.addGenre(e.target.value)}} required>
                <option>--Choose Genre--</option>
                  {this.state.genreLoad ? this.state.dataGenre.map(genre => 
                  <option key={genre.id} value={genre.id}>{genre.genre}</option>) : <></>
                  }
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" onChange={(e) => {this.addStatus(e.target.value)}} required>
                <option>--Choose Status--</option>
                {this.state.statusLoad ? this.state.dataStatus.map(status => 
                  <option key={status.id} value={status.id}>{status.status}</option>) : <></>
                  }
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.File id="formcheck-api-regular">
                    <Form.File.Label>
                      Image
                      {this.state.imageFilter ? <Alert variant="danger">
                        File not image or file too large
                      </Alert> : <></>}
                    </Form.File.Label>
                    <Form.File.Input type="file" onChange={(e) => {this.addImage(e.target.files[0])}} accept="image/*" required/>
                </Form.File>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={() => {this.postBook()}}>
              Add
            </Button>
            <Button variant="primary" type="button" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}
  
export default ModalAdd