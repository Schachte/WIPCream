import React from "react";
import Configuration from "./Configuration";
import GithubAuthentication from "./GithubAuthentication";

class Skeleton extends React.Component {
  state = {
    token: undefined
  };

  authorize = token => {
    if (token) this.setState({ token });
  };

  render() {
    return (
      <div className="column" id="content" style={{ marginTop: "100px" }}>
        <div className="ui grid">
          <div className="row">
            <h1 className="ui huge header">Dashboard</h1>
          </div>
          <div className="ui divider" />
          <div className="ui hidden section divider" />
          <GithubAuthentication auth={data => this.authorize(data)} />
          <Configuration auth={this.state.token} />
        </div>
      </div>
    );
  }
}

export default Skeleton;
