import React from "react";

const SideBar = () => {
  return (
    <div className="column" id="sidebar">
      <div className="ui secondary vertical fluid menu">
        <img src="./static/images/logo.png" />
        <a className="active item">Dashboard</a>
      </div>
    </div>
  );
};
export default SideBar;
