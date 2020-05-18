import React, {Component} from 'react'
import {Carousel} from 'react-bootstrap'
import {connect} from 'react-redux'

class ControlledCarousel extends Component {
  state = {
    index: 0
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({
      index: selectedIndex
    })
  };
  render() {
    const {isLoading, isFulfilled, getBooksResponse} = this.props.getBooks
  return (
    <>
    {!isLoading && isFulfilled ? <Carousel activeIndex={this.state.index} onSelect={this.handleSelect} >
    <Carousel.Item>
        <img
          className="d-block w-100"
          src={`${process.env.REACT_APP_URL}/${getBooksResponse[0].image}`}
          alt="First slide"
          style={{objectFit: "cover", maxHeight: "300px"}}
        />
        <Carousel.Caption > 
        <h3>{getBooksResponse[0].title}</h3>
          <p>
            {getBooksResponse[0].author}
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={`${process.env.REACT_APP_URL}/${getBooksResponse[0].image}`}
          alt="Second slide"
          style={{objectFit: "cover", maxHeight: "300px"}}
        />

        <Carousel.Caption >
          <h3>{getBooksResponse[0].title}</h3>
          <p>
            {getBooksResponse[0].author}
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={`${process.env.REACT_APP_URL}/${getBooksResponse[0].image}`}
          alt="Third slide"
          style={{objectFit: "cover", maxHeight: "300px"}}
        />

        <Carousel.Caption >
          <h3>{getBooksResponse[0].title}</h3>
          <p>
            {getBooksResponse[0].author}
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel> : <></>}
    </>
  );
  }
}

const mapStateToProps = ({
  getBooks
}) => {
  return {
    getBooks
  }
}

export default connect(mapStateToProps)(ControlledCarousel)