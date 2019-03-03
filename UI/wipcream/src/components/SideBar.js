import React from "react";

const SideBar = () => {
  return (
    <div className="column" id="sidebar">
      <div className="ui secondary vertical fluid menu">
        <img href="/" alt="logo of WIPCream" src="./static/images/logo.png" />
        <a href="/" className="active item">
          Dashboard
        </a>
      </div>
    </div>
  );
};
export default SideBar;
