import React from "react";
import Stats from "./Stats";
import Configuration from "./Configuration";
import GithubAuthentication from "./GithubAuthentication";

const Skeleton = () => {
  return (
    <div className="column" id="content" style={{ marginTop: "100px" }}>
      <div className="ui grid">
        <div className="row">
          <h1 className="ui huge header">Dashboard</h1>
        </div>
        <div className="ui divider" />
        <div className="ui hidden section divider" />
        <GithubAuthentication />
        <Stats />
        <Configuration />
      </div>
    </div>
  );
};

export default Skeleton;
