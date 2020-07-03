import React, { Component } from "react";
import qs from "querystring";
import { connect } from "react-redux";
import { tokenActionCreator } from "../redux/actions/login";

class Token extends Component {
  state = {
    token: localStorage.getItem("refreshToken"),
  };
  componentDidMount() {
    this.token();
  }

  componentDidUpdate() {
    const { isFulfilled, token, response } = this.props.login;
    const { history } = this.props;
    if (isFulfilled) {
      localStorage.setItem("token", token);
      localStorage.setItem("id", response.id);
      localStorage.setItem("role", btoa(response.role));
      localStorage.setItem("name", response.name);
      localStorage.setItem("email", response.email);
      history.push(localStorage.getItem("lastPage"));
    }
  }

  token = async () => {
    const { refreshToken } = this.props.login.response;
    const { tokenAction } = this.props;
    await tokenAction(qs.stringify({ token: refreshToken }));
    localStorage.setItem("token", refreshToken);
  };

  render() {
    return <></>;
  }
}

const mapStateToProps = ({ login }) => {
  return {
    login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tokenAction: (body) => {
      dispatch(tokenActionCreator(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Token);
