import React, {Component} from 'react'
import {Button, Modal, Form, Col, Row, Image} from 'react-bootstrap'
import {putBook} from '../utils/http'
import '../styles/Modal.css'
import {connect} from 'react-redux'


class ModalEdit extends Component {


    state = {
        show: false,
        // authorLoad: false,
        // genreLoad: false,
        // statusLoad: false,
        imageFilter: false,
    }

    componentDidMount(){
      // this.getAuthor()
      // this.getGenre()
      // this.getStatus()
    }

    // getAuthor = async () => {
    //   await getAuthor()
    //   .then((response) => {
    //     this.setState({
    //       dataAuthor: response.data.data,
    //       authorLoad: true
    //     })
    //   })
    //   .catch((error) => console.log(error))
    // }

    // getGenre = async () => {
    //   await getGenre()
    //   .then((response) => {
    //     this.setState({
    //       dataGenre: response.data.data,
    //       genreLoad: true
    //     })
    //   })
    //   .catch((error) => console.log(error))
    // }

    // getStatus = async () => {
    //   await getStatus()
    //   .then((response) => {
    //     this.setState({
    //       dataStatus: response.data.data,
    //       statusLoad: true
    //     })
    //   })
    //   .catch((error) => console.log(error))
    // }

  putBook = async () => {
    const {title, description, id_author, id_genre, id_status, image} = this.state
    const {id} = this.props
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
    await putBook(id, form)
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

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  editImage = (e) => {
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
      const {imageFilter} = this.state
      const {author, genre, status} = this.props
    return (
      <>
        <div  onClick={this.handleShow} className="edit">
          Edit
        </div>
  
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" placeholder="title" onChange={this.handleChange} defaultValue={this.props.data.title}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control type="textarea" as="textarea" name="description" placeholder="description" rows="3" onChange={this.handleChange} defaultValue={this.props.data.description} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Author</Form.Label>
                <Form.Control as="select" name="id_author" onChange={this.handleChange} defaultValue={this.props.data.id_author}>
                <option >--Choose Author--</option>
                  {author.response.map(author => 
                  <option key={author.id} value={author.id}>{author.author}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Genre</Form.Label>
                <Form.Control as="select" name="id_genre" onChange={this.handleChange} defaultValue={this.props.data.id_genre}>
                <option >--Choose Genre--</option>
                  {genre.response.map(genre => 
                  <option key={genre.id} value={genre.id}>{genre.genre}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="id_status" onChange={this.handleChange} defaultValue={this.props.data.id_status}>
                <option >--Choose Status--</option>
                  {status.response.map(status => 
                  <option key={status.id} value={status.id}>{status.status}</option>)}
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
                      </Row>
                    </Form.File.Label>
                    <Form.File.Input onChange={this.editImage} accept="image/png, image/jpg, image/jpeg"/>
                </Form.File>
                {imageFilter ? <span className="error">{imageFilter}</span> : ""}
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
  
export default connect(mapStateToProps)(ModalEdit)