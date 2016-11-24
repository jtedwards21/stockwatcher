import React from "react";
import TickerWidgets from "./tickerWidgets";

//There's no buttons to change startDate and endDate

export default class Grapher extends React.Component {
  constructor() {
    super();

    this.state = {
      tickers: [],
      startDate: [],
      endDate: [],
      currentTicker: ""
    };
  }
  addTicker() {
    this.state.tickers.push(this.state.currentTicker);
    this.setState(currentTicker: "");
  }
  UpdateInputValue(evt){
    this.setState({currentTicker: evt.target.value});
  }
  componentDidMount() {
  this.setState({tickers: this.props.tickers})
  this.setState({startDate: this.props.startDate})
  this.setState({endDate: this.props.endDate})
  }
  render() {
    return (
      <div className="grapher">
	<TickerWidgets tickers={this.state.tickers} startDate={this.state.startDate} endDate={this.state.endDate} />
        <div className="add-ticker-widget input-group">
          <span className="input-group-btn">
	    <button className="btn btn-default"  onClick={this.addTicker.bind(this)} type="button">Go!</button>
          </span>
          <input className="form-control" type="text" value={this.state.currentTicker} onChange={this.UpdateInputValue.bind(this)} />
        </div>
      </div>
    );
  }
}
