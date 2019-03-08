import React from "react";
import axios from "axios";
import GitHubLogin from "react-github-login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class GithubAuthentication extends React.Component {
  state = {
    authToken: undefined
  };

  // componentDidMount() {
  //   this.setState({ authToken: window.location.href.split("token=")[1] });
  // }

  auth() {
    window.opener =
      "https://github.com/login/oauth/authorize?client_id=b5cd37110eb31620aad7";
  }

  onSuccess = response => {
    axios
      .get("http://localhost:1337/login", {
        headers: {
          Authorization: "Token " + response.code
        }
      })
      .then(resp => {
        this.setState({ authToken: resp.data.token });
        this.setState({ user: resp.data.respData.login });
        this.props.auth(resp.data.token);
      })
      .catch(err => alert("Failed To Authenticate"));
  };

  onFailure = resp => {
    alert("Login Unauthorized");
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.authToken ? (
          <GitHubLogin
            clientId="b5cd37110eb31620aad7"
            redirectUri="http://localhost:3001/"
            onSuccess={data => this.onSuccess(data)}
            onFailure={data => this.onFailure(data)}
          />
        ) : (
          <span>Welcome Back, {this.state.user}</span>
        )}
      </React.Fragment>
    );
  }
}
