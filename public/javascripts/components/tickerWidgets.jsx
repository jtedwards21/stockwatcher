import React from "react";
import TickerWidget from "./tickerWidget";
import axios from "axios";

export default class TickerWidgets extends React.Component {
  makeUrl(ticker, startDate, endDate){
	return '/stock/search/' + ticker + '/' + startDate + '/' + endDate
  }
  constructor() {
    super();

    this.state = {
      data: []
    };
  }
  processData(){
    //Make sure that method is bound when called
    //Make an object that widget can process to make the call to the API and go through the map function to get passed to individual widgets
    var dataArray = [];
    for(var i = 0; i < this.props.tickers; i++){
	var url = makeUrl(this.props.tickers[i], this.props.startDate, this.props.endDate)
        axios.get(url)
        .then(data => dataArray.push({data.datatable}));
    }
    //Map the ticker names and ids into dataArray
    dataArray.map(function(d, j){
	d.name = this.props.ticker[j];
        d.id = j
	return d;
})
    //setState
  }
  render() {
    //This has to change, it doesn't match the map
    //Also, processData was never called
    let widgets = this.state.data.map(j =>{
	return <TickerWidget key={j.id} data={j}/>
})
    return (
      <div className="widget-collection">
        {widgets}
      </div>
    );
  }
}
