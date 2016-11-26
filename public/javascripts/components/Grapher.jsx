import React from "react";
import TickerWidgets from "./tickerWidgets";

var initialData = [["2016-05-05",94.0],["2016-05-06",93.37],["2016-05-09",93.0],["2016-05-10",93.33],["2016-05-11",93.48],["2016-05-12",92.72],["2016-05-13",90.0],["2016-05-16",92.39],["2016-05-17",94.55],["2016-05-18",94.16],["2016-05-19",94.64],["2016-05-20",94.64],["2016-05-23",95.87],["2016-05-24",97.22],["2016-05-25",98.67],["2016-05-26",99.68],["2016-05-27",99.44],["2016-05-31",99.6],["2016-06-01",99.02],["2016-06-02",97.6],["2016-06-03",97.79],["2016-06-06",97.99],["2016-06-07",99.25],["2016-06-08",99.02],["2016-06-09",98.5],["2016-06-10",98.53],["2016-06-13",98.69],["2016-06-14",97.32],["2016-06-15",97.82],["2016-06-16",96.45],["2016-06-17",96.62],["2016-06-20",96.0],["2016-06-21",94.94],["2016-06-22",96.25],["2016-06-23",95.94],["2016-06-24",92.91],["2016-06-27",93.0],["2016-06-28",92.9],["2016-06-29",93.97],["2016-06-30",94.44],["2016-07-01",95.49],["2016-07-05",95.39],["2016-07-06",94.6],["2016-07-07",95.7],["2016-07-08",96.49],["2016-07-11",96.75],["2016-07-12",97.17],["2016-07-13",97.41],["2016-07-14",97.39],["2016-07-15",98.92],["2016-07-18",98.7],["2016-07-19",99.56],["2016-07-20",100.0],["2016-07-21",99.83],["2016-07-22",99.26],["2016-07-25",98.25],["2016-07-26",96.82],["2016-07-27",104.265],["2016-07-28",102.83],["2016-07-29",104.19],["2016-08-01",104.41],["2016-08-02",106.05],["2016-08-03",104.81],["2016-08-04",105.58],["2016-08-05",106.27],["2016-08-08",107.52],["2016-08-09",108.23],["2016-08-10",108.71],["2016-08-11",108.52],["2016-08-12",107.78],["2016-08-15",108.14],["2016-08-16",109.63],["2016-08-17",109.1],["2016-08-18",109.23],["2016-08-19",108.77],["2016-08-22",108.86],["2016-08-23",108.59],["2016-08-24",108.565],["2016-08-25",107.39],["2016-08-26",107.41],["2016-08-29",106.62],["2016-08-30",105.8],["2016-08-31",105.66],["2016-09-01",106.14],["2016-09-02",107.7],["2016-09-06",107.9],["2016-09-07",107.83],["2016-09-08",107.25],["2016-09-09",104.64],["2016-09-12",102.65],["2016-09-13",107.51],["2016-09-14",108.73],["2016-09-15",113.86],["2016-09-16",115.12],["2016-09-19",115.19],["2016-09-20",113.05],["2016-09-21",113.85],["2016-09-22",114.35],["2016-09-23",114.42],["2016-09-26",111.64],["2016-09-27",113.0],["2016-09-28",113.69],["2016-09-29",113.16],["2016-09-30",112.46],["2016-10-03",112.71],["2016-10-04",113.06],["2016-10-05",113.4],["2016-10-06",113.7],["2016-10-07",114.31],["2016-10-10",115.02],["2016-10-11",117.7],["2016-10-12",117.35],["2016-10-13",116.79],["2016-10-14",117.88],["2016-10-17",117.33],["2016-10-18",118.18],["2016-10-19",117.25],["2016-10-20",116.86],["2016-10-21",116.81],["2016-10-24",117.1],["2016-10-25",117.95],["2016-10-26",114.31],["2016-10-27",115.39],["2016-10-28",113.87],["2016-10-31",113.65],["2016-11-01",113.46],["2016-11-02",111.4],["2016-11-03",110.98],["2016-11-04",108.53],["2016-11-07",110.08],["2016-11-08",110.31],["2016-11-09",109.88],["2016-11-10",111.09]]

var mapped = initialData.map(function(d){
  return {date: new Date(d[0]), price: d[1]};
})

initialData = {name: "AAPL", data: mapped};





export default class Grapher extends React.Component {
  constructor() {
    super();

    this.state = {
      tickers: [],
      startDate: new Date(),
      endDate: new Date(),
      currentTicker: "",
      addTickerText: ""
    };
  }
//I think I need to combine the two pieces again.
//That would also remove the communication problem
  addWindowTicker(){
    var oldTickers = this.state.tickers
    oldTickers.push(this.state.addTickerText);
    this.setState({tickers: oldTickers});
  }
  addTicker() {
    //This method needs to go to setState
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
  UpdateAddTickerText(evt){
　　　　this.setState({AddTickerText: evt.target.value});
  }
  UpdateEndDate(evt){
    this.setState({endDate: evt.target.value});
  }
  componentDidMount() {
  this.setState({tickers: this.props.tickers})
  this.setState({startDate: this.props.startDate})
  this.setState({endDate: this.props.endDate})
  }
  onAddTickerClick(e){
  d3.select(".add-window").style("display", "block")
  .style("position", "absolute")
　　.style("top", "100%")
  alert('hi')
  }
  render() {
    //This should disappear when it's not being used.
    return (
      <div className="grapher row">
	<div className="add-window col-md-6 col-md-offset-3">
	  <h1 className="text-center">Add Ticker</h1>
	  <input className="" type="text" value={this.state.addTickerText} onChange={this.UpdateAddTickerText} placeholder="Enter a ticker..." />
	  <button className="btn btn-large btn-default" onClick={this.addWindowTicker}>Add</button>
	</div>
	<div className="settings-wall col-md-6 col-md-offset-3">
	    <h1 className="text-center">Settings</h1>
	    <div className="form-horizontal">	
              <div className="col-md-10 col-md-offset-1　change-start-date-widget form-group">
	      　　<label for="startDateControl" className="col-sm-2 control-label">Start Date</label>
	　　    　　<div className="col-sm-10"><input className="form-control" id="startDateControl" type="date" value={this.state.startDate} onChange={this.UpdateStartDate.bind(this)} /></div>
	      </div>
	      <div className="col-md-10 col-md-offset-1　change-end-date-widget form-group">
	      　　<label for="endDateControl" className="col-sm-2 control-label">End Date</label>
              　　<div className="col-sm-10"><input className="form-control" id="endDateControl" type="date" value={this.state.endDate} onChange={this.UpdateEndDate.bind(this)} /></div>
	     　</div>
　　　　　　　　　　　　</div>
	    <div className="col-sm-10 col-sm-offset-1 add-ticker-widget">
	    　　<TickerWidgets initialData={initialData}　tickers={["AAPL"]} startDate={this.state.startDate} endDate={this.state.endDate} />
	    　　<div className="add-widget-button widget-button text-center" onClick={this.onAddTickerClick.bind(this)}>
		　<span className="text-center glypicon glyphicon-plus" aria-hidden="true"></span>
	      </div>
	    </div>
       　</div>
      </div>
    );
  }
}
