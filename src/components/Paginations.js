import React, { Component } from "react";
import { Pagination } from "react-bootstrap";
import { connect } from "react-redux";

class Paginations extends Component {
  render() {
    const { page, totalPage, previous, next } = this.props.books.resPagination;
    const { handlePage } = this.props;
    const active = page;
    const items = [];
    for (let number = 1; number <= totalPage; number++) {
      items.push(
        <Pagination.Item
          onClick={handlePage}
          key={number}
          id={number}
          active={number === active}
        >
          {number}
        </Pagination.Item>
      );
    }
    return (
      <>
        <Pagination size="sm">
          {page === 1 ? (
            <></>
          ) : (
            <>
              <Pagination.Prev
                onClick={handlePage}
                id={previous}
              ></Pagination.Prev>
            </>
          )}
          {items}
          {totalPage === page ? (
            <></>
          ) : (
            <>
              <Pagination.Next onClick={handlePage} id={next}></Pagination.Next>
            </>
          )}
        </Pagination>
      </>
    );
  }
}

const mapStateToProps = ({ books }) => {
  return {
    books,
  };
};

export default connect(mapStateToProps)(Paginations);
