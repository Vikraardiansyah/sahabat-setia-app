<>
  <Container>
    <NavbarComp logout={this.logout} home={this.home} search="Not use" />
    {isLoading && role === "1" ? (
      <ModalEdit
        data={data}
        id={this.props.match.params.id}
        getBookById={this.getBookById}
      />
    ) : (
      <></>
    )}
    {role === "1" ? (
      <ModalsDelete delete={this.deleteBook} history={this.props.history} />
    ) : (
      <></>
    )}
    {isLoading && data.id_status === 1 ? (
      <Button
        href="#"
        variant="success"
        style={{ margin: "auto" }}
        onClick={this.handleBorrow}
        size="sm"
      >
        Borrow
      </Button>
    ) : isLoading && data.id_status === 2 && data.email_borrow === email ? (
      <Button
        href="#"
        variant="success"
        style={{ margin: "auto" }}
        onClick={this.handleBorrow}
        size="sm"
      >
        Return
      </Button>
    ) : (
      <Button
        href="#"
        variant="success"
        style={{ margin: "auto" }}
        onClick={this.handleBorrow}
        size="sm"
        disabled
      >
        Borrow
      </Button>
    )}
  </Container>
  <Container style={{ marginTop: "10px" }}>
    {isLoading ? (
      <Row>
        <Col xs={12} lg={4}>
          <Image
            src={`${process.env.REACT_APP_URL}/${data.image}`}
            rounded
            style={{ maxHeight: "500px", display: "block", margin: "auto" }}
          />
        </Col>
        <Col
          xs={12}
          lg={8}
          style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        >
          <h2>{data.title}</h2>
          <h5 style={{ marginBottom: "3px", fontWeight: "bold" }}>
            Description
          </h5>
          <p style={{ textAlign: "justify" }}>{data.description}</p>
          <p style={{ margin: "3px", fontWeight: "bold" }}>
            Author: {data.author}
          </p>
          <p style={{ margin: "3px", fontWeight: "bold" }}>
            Genre: {data.genre}
          </p>
          <p style={{ margin: "3px", fontWeight: "bold" }}>
            Status: {data.status}
          </p>
        </Col>
      </Row>
    ) : (
      <img
        src={Loading}
        alt="loading"
        style={{ display: "block", margin: "auto" }}
      ></img>
    )}
  </Container>
  <div style={{ display: "inline", margin: "3px" }}>
    <button style={{ display: "inline", margin: "3px" }} onClick={subCounter}>
      -
    </button>
    <h2 style={{ display: "inline", margin: "3px" }}>{counter}</h2>
    <button style={{ display: "inline", margin: "3px" }} onClick={addCounter}>
      +
    </button>
  </div>
</>;
