import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { connect } from "react-redux";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    item: 3,
  },
};

class CarouselComp extends Component {
  render() {
    const { resBooksByRecommended } = this.props.books;
    return (
      <div
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          marginLeft: "4vw",
          marginRight: "4vw",
        }}
      >
        <Carousel responsive={responsive}>
          {resBooksByRecommended.map((data) => (
            <div>
              <img
                src={`${process.env.REACT_APP_URL}/${data.image}`}
                alt={`${data.name}`}
                style={{
                  width: "30vw",
                  height: "15vw",
                  borderRadius: "10px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => this.props.getById(data.id, `recommended`)}
              />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = ({ books }) => {
  return {
    books,
  };
};

export default connect(mapStateToProps)(CarouselComp);
