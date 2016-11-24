import React from "react";

export default class TickerWidget extends React.Component {
  constructor() {
    super();

    this.state = {
      ticker: ""
    };
  }
  render() {
    return (
      <div className="ticker-widget">
        <span>{this.props.data.ticker}</span>
      </div>
    );
  }
}
