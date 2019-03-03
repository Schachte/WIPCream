import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Skeleton from "./components/Skeleton";

const App = () => {
  return (
    <div className="ui grid">
      <div className="row">
        <Header />
        <SideBar />
        <Skeleton />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
