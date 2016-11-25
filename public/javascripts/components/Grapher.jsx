import React from "react";
import TickerWidgets from "./tickerWidgets";

export default class Grapher extends React.Component {
  constructor() {
    super();

    this.state = {
      tickers: [],
      startDate: new Date(),
      endDate: new Date(),
      currentTicker: ""
    };
  }
  addTicker() {
    this.state.tickers.push(this.state.currentTicker);
    this.setState(currentTicker: "");
  }
  UpdateCurrentTicker(evt){
    this.setState({currentTicker: evt.target.value});
  }
  UpdateStartDate(evt){
    //This needs to feed into props, where it will then just send re-render the object with a call to the api
    this.setState({startDate: evt.target.value});
  }
  UpdateEndDate(evt){
    this.setState({endDate: evt.target.value});
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
	  <div className="form-group">
	    <label for="startDateControl"></label>
	　　  <input className="form-control" id="startDateControl" type="date" value{this.state.startDate} onChange={this.UpdateStartDate.bind(this)} />
	  </div>
	  <div className="form-group">
	    <label for="endDateControl"></label>
            <input className="form-control" id="endDateControl" type="date" value{this.state.endDate} onChange={this.UpdateEndDate.bind(this)} />
	  </div>
          <span className="input-group-btn">
	    <button className="btn btn-default"  onClick={this.addTicker.bind(this)} type="button">Go!</button>
          </span>
          <input className="form-control" type="text" value={this.state.currentTicker} onChange={this.UpdateCurrentTicker.bind(this)} />
        </div>
      </div>
    );
  }
}
