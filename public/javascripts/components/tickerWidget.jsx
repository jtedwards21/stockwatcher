import React from "react";

export default class TickerWidget extends React.Component {
  constructor() {
    super();

    this.state = {
      ticker: ""
    };
  }
  render() {
//This really just renders the little box at the bottom of the page
    return (
      <div className="text-center widget-button">
        <span>{this.props.name}</span>
      </div>
    );
  }
}
