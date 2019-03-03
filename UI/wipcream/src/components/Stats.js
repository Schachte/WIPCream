import React from "react";

const Stats = () => {
  return (
    <div class="two column center aligned row">
      <div class="column">
        <img
          class="ui centered small circular image"
          src="./static/images/square-image.png"
        />
        <div class="ui hidden divider" />
        <div class="ui large red label">Total Pull Requests Closed</div>
        <p>
          <b>24</b>
        </p>
      </div>
      <div class="column">
        <img
          class="ui centered small circular image"
          src="./static/images/square-image.png"
        />
        <div class="ui hidden divider" />
        <div class="ui large blue label">
          Total Pull Requests Currently Open
        </div>
        <p>
          <b>14</b>
        </p>
      </div>
    </div>
  );
};

export default Stats;
