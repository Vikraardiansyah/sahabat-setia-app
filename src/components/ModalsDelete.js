import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'
import '../styles/Description.css'

class ModalsDelete extends Component {
  state = {
    show: false
  }
  handleClose = () => this.setState({
    show: false
  })
  handleShow = () => this.setState({
    show: true
  })

  home = () => {this.props.history.push("/")}

  render(){
    return (
      <>
        <div onClick={this.handleShow} className="delete">
          Delete
        </div>
  
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure want to delete this data?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=> {this.props.delete(); this.handleClose(); this.home()}}>
              Yes
            </Button>
            <Button variant="secondary" onClick={this.handleClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
} 
export default ModalsDelete