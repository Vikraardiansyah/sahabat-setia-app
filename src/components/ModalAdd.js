import React, {Component} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import {postBook} from '../utils/http'
import '../styles/Modal.css'
import {connect} from 'react-redux'


class ModalAdd extends Component {


    state = {
        show: false,
        imageFilter: false,
        validated: false
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else{
        this.postBook()
      }
      this.setState({
        validated: true
      })
    }

    postBook = async () => {
      const form = new FormData()
      const {title, description, id_author, id_genre, id_status, image} = this.state
        form.append("title", title)
        form.append("description", description)
        form.append("id_author", id_author)
        form.append("id_genre", id_genre)
        form.append("id_status", id_status)
        form.append("image", image)
        await postBook(form)
        .then((response) => {
          this.handleClose()
          this.props.getBooks()
        })
        .catch((error) => {
        })
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
    handleChange = (e) => {
      const {name, value} = e.target
      this.setState({
        [name]: value
      })
    }
    addImage = (e) => {
      this.setState({
        imageFilter: ""
      })
      var files = e.target.files
        if(this.checkFileSize(e) && this.checkMimeType(e)){ 
        // if return true allow to setState
        this.setState({
          image: files[0]
      })
      console.log(this.state.image)
     }
    }
  
    checkMimeType=(e)=>{
      //getting file object
      let files = e.target.files 
      //define message container
      let err = ''
      // list allow mime type
     const types = ['image/png', 'image/jpeg', 'image/jpg']
      // loop access array
      for(let x = 0; x<files.length; x++) {
       // compare file type find doesn't matach
           if (types.every(type => files[x].type !== type)) {
           // create error message and assign to container   
           err += 'is not a supported format, please pick image';
         }
       };
    
     if (err !== '') { // if message not same old that mean has error 
          e.target.value = null // discard selected file
          this.setState({
            imageFilter: err
          })
           return false; 
      }
     return true;
    
    }
  
    checkFileSize=(e)=>{
      let files = e.target.files
      let size = 1000000
      let err = ""; 
      for(let x = 0; x<files.length; x++) {
      if (files[x].size > size) {
       err += 'is too large, please pick a smaller file';
     }
   };
   if (err !== '') {
      e.target.value = null
      this.setState({
        imageFilter: err
      })
      return false
  }
  
  return true;
  
  }
    
    render() {
      const {validated, imageFilter} = this.state
      const {author, genre, status} = this.props
    return (
      <>
        <Button variant="primary" onClick={this.handleShow} size="sm" style={{height: "31px"}}>
          Add
        </Button>
  
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Book</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.handleSubmit} validated={validated} noValidate>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" placeholder="title" onChange={this.handleChange} required/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control type="textarea" name="description" as="textarea" placeholder="description" rows="3" onChange={this.handleChange} required/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Author</Form.Label>
                <Form.Control as="select" name="id_author" onChange={this.handleChange} required>
                <option value="">--Choose Author--</option>
                  {author.response.map(author => 
                  <option key={author.id} value={author.id}>{author.author}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Genre</Form.Label>
                <Form.Control as="select" name="id_genre" onChange={this.handleChange} required>
                <option value="">--Choose Genre--</option>
                  {genre.response.map(genre => 
                  <option key={genre.id} value={genre.id}>{genre.genre}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="id_status" onChange={this.handleChange} required>
                <option value="">--Choose Status--</option>
                  {status.response.map(status => 
                  <option key={status.id} value={status.id}>{status.status}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.File id="formcheck-api-regular">
                    <Form.File.Label>
                      Image
                    </Form.File.Label>
                    <Form.File.Input type="file" onChange={this.addImage} accept="image/png, image/jpg, image/jpeg" required/>
                </Form.File>
                {imageFilter ? <span className="error">{imageFilter}</span> : ""}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="submit" >
              Add
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = ({
  author,
  genre,
  status
}) => {
  return {
    author,
    genre,
    status
  }
}


  
export default connect(mapStateToProps)(ModalAdd)