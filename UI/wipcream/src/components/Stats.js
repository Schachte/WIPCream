import React from "react";

const Stats = () => {
  return (
    <div class="two column center aligned row">
      <div class="column">
        <img
          class="ui centered small circular image"
          style={{ border: "5px solid black" }}
          src="http://ericsteinborn.com/github-for-cats/img/Professortocat_v2.png"
        />
        <div class="ui hidden divider" />
        <div class="ui large red label">Total Pull Requests Closed</div>
        <p>
          <h1>
            <b>24</b>
          </h1>
        </p>
      </div>
      <div class="column">
        <img
          class="ui centered small circular image"
          style={{ border: "5px solid black" }}
          src="http://pluspng.com/img-png/github-octocat-logo-png-and-github-master-could-be-this-896.jpg"
        />
        <div class="ui hidden divider" />
        <div class="ui large blue label">
          Total Pull Requests Currently Open
        </div>
        <p>
          <h1>
            <b>24</b>
          </h1>
        </p>
      </div>
    </div>
  );
};

export default Stats;
