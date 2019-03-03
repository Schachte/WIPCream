import React from "react";

export default class GithubAuthentication extends React.Component {
  state = {
    authToken: "DATA"
  };

  componentDidMount() {
    let currUrl = window.location.href;
    this.setState({ authToken: currUrl.split("token=")[1] });
  }

  render() {
    return (
      <React.Fragment>
        <a href="https://github.com/login/oauth/authorize?client_id=b5cd37110eb31620aad7">
          {this.state.authToken ? "Logout" : "Login With Github"}
        </a>
        <span>{this.state.authToken}</span>
      </React.Fragment>
    );
  }
}
