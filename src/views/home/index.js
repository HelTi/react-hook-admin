import React from "react";

export default class Home extends React.Component {
  state = {
    msg: "you",
  };

  clickMe = () => {
    alert("click me");
  };

  render() {
    return (
      <div>
        <p>hello react {this.state.msg}</p>
        <div onClick={this.clickMe}>click me</div>
      </div>
    );
  }
}
