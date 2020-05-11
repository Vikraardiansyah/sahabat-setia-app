import React, {Component} from 'react'
import {getBooks} from '../utils/http'
import {Container, Row, Col, Card, DropdownButton, Dropdown, ButtonGroup, Image} from'react-bootstrap'
import '../styles/Home.css'
import qs from 'querystring'
import NavbarComp from '../components/NavbarComp'
import ModalAdd from '../components/ModalAdd'
import Paginations from '../components/Paginations'
import Loading from '../images/loading.gif'

class Home extends Component {
  state = {
    data : [],
    pagination : {},
    error: {},
    role: atob(localStorage.getItem("role")),
    isLoading: false,
  }
  componentDidMount(){
    this.getBooks()
    this.auth()
    localStorage.setItem("lastPage", "/")
  }
  componentDidUpdate(_, prevState){
    if(prevState !== this.state){
      const {page, limit, value, sort, search} = this.state
      let query = '?'
      if(search) {
        query += `search=${search}&`
      }
      if(value) {
        query += `value=${value}&`
      }
      if(sort){
        query += `sort=${sort}&`
      }
      if(page){
        query += `page=${page}&`
      }
      if(limit){
        query += `limit=${limit}`
      }
      this.props.history.push(query)
    }
  }
  auth = () => {
    if(!localStorage.getItem("token")) {
      this.props.history.push("/login")
    }
  }
  home = () => {
    this.props.history.push("/")
  }
  logout = () => {
    localStorage.clear()
    this.props.history.push("/login")
  }
  getBooks = async () => { 
    await getBooks(qs.stringify(this.state))
    .then((response) => {
      this.setState({
        data : response.data.data,
        pagination : response.data.pagination,
        isLoading: true
      })
    })
    .catch((error) => {
      this.setState({
        error: error.response.data.data.message
      })
      if(this.state.error === "TokenExpiredError"){
        this.props.history.push("/token")
      } else if (this.state.error === "JsonWebTokenError") {
        this.props.history.push("/login")
      }
    })
  }
  
  getById = (id) => {
    this.props.history.push(`/description/${id}`)
  }

  handlePage = async (e) => {
      this.setState({
          page: e.target.id
      }, () => this.getBooks())
  }
  handleLimit = async (e) => {
    this.setState({
      limit: e.target.id
    }, () => this.getBooks())
}

  handleSort = async (e) => {
    this.setState({
      value: e.target.id,
      sort: e.target.name
    }, () => this.getBooks())
  }
  
  handleSearch = async (e) => {
    this.setState({
      search: e.target.value
    }, () => this.getBooks())
  }

  

  render(){
    const {data, isLoading, pagination, role} = this.state
    return (
      <>
        <NavbarComp logout={this.logout} search={this.handleSearch} home={this.home}/>
        <Container style={{marginTop: "60px"}} >
        <Row>
          <Col lg={3} style={{marginTop: "10px"}} >
          <ButtonGroup key="ButtonGroup">
          {role === "1" ? <ModalAdd getBooks={this.getBooks}/> : <></>}
            <DropdownButton id="dropdown-basic-button" variant="secondary" title="Sort By" size="sm">
              <Dropdown.Item id="" name="" onClick={this.handleSort}>Last Update</Dropdown.Item>
              <Dropdown.Item id="books.title" name="true" onClick={this.handleSort}>Title (A-Z)</Dropdown.Item>
              <Dropdown.Item id="books.title" name="false" onClick={this.handleSort}>Title (Z-A)</Dropdown.Item>
              <Dropdown.Item id="author.author" name="true" onClick={this.handleSort}>Author (A-Z)</Dropdown.Item>
              <Dropdown.Item id="author.author" name="false" onClick={this.handleSort}>Author (Z-A)</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-basic-button" title="Show Data" variant="dark" size="sm">
              <Dropdown.Item id="6" onClick={this.handleLimit} >6</Dropdown.Item>
              <Dropdown.Item id="12" onClick={this.handleLimit} >12</Dropdown.Item>
              <Dropdown.Item id="24" onClick={this.handleLimit} >24</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
          </Col>
          <Col key="pagination" style={{marginTop: "10px"}}>
            {isLoading ? <Paginations page={pagination.page} next={pagination.next} previous={pagination.previous} totalPage={pagination.totalPage} handlePage={this.handlePage}/> : <></>}
          </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col style={{fontWeight: "bold", fontSize: "20px"}}>BOOK LISTS<hr/></Col>
          </Row>
        </Container>
        <Container >
          <Row>
            { isLoading ? data.map(data => 
            <Col lg={2} xs={6} key={data.id} style={{textAlign: "center", cursor: "pointer"}} onClick={() => this.getById(data.id)}>
              <Image src={`${process.env.REACT_APP_URL}/${data.image}`} style={{height: "200px"}} rounded />
              <Card style={{border: "none"}} >
                <Card.Body style={{padding: "4px"}} >
                    <Card.Text style={{margin: "1px"}}>{data.title}</Card.Text>
                  <Card.Text style={{margin: "1px"}}>
                    <small className="text-muted">{data.author}</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            ) : <img src={Loading} alt="loading" style={{display: "block", margin: "auto"}}></img> }
          </Row>
          </Container>
      </>
    )
  }
}
export default Home;