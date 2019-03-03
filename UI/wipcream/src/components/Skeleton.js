import React from "react";
import Stats from "./Stats";
import Configuration from "./Configuration";

const Skeleton = () => {
  return (
    <div class="column" id="content" style={{ marginTop: "100px" }}>
      <div class="ui grid">
        <div class="row">
          <h1 class="ui huge header">Dashboard</h1>
        </div>
        <div class="ui divider" />
        <div class="ui hidden section divider" />
        <Stats />
        <Configuration />
      </div>
    </div>
  );
};

export default Skeleton;
