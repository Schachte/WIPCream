import React from "react";

const Stats = () => {
  return (
    <div className="two column center aligned row">
      <div className="column">
        <img
          className="ui centered small circular image"
          style={{ border: "5px solid black" }}
          alt="githublogo"
          src="http://ericsteinborn.com/github-for-cats/img/Professortocat_v2.png"
        />
        <div className="ui hidden divider" />
        <div className="ui large red label">Total Pull Requests Closed</div>
        <h1>
          <b>24</b>
        </h1>
      </div>
      <div className="column">
        <img
          className="ui centered small circular image"
          style={{ border: "5px solid black" }}
          alt="githublogo"
          src="http://pluspng.com/img-png/github-octocat-logo-png-and-github-master-could-be-this-896.jpg"
        />
        <div className="ui hidden divider" />
        <div className="ui large blue label">
          Total Pull Requests Currently Open
        </div>
        <h1>
          <b>24</b>
        </h1>
      </div>
    </div>
  );
};

export default Stats;
