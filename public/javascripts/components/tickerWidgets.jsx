import React from "react";
import TickerWidget from "./tickerWidget";
import axios from "axios";

export default class TickerWidgets extends React.Component {
  
  constructor() {
    super();

    this.state = {
      data: []
    };
  }
  processData(tickers, startDate, endDate){
    //Make an object that widget can process to make the call to the API and go through the map function to get passed to individual widgets
    var makeUrl = function(ticker, startDate, endDate){
	  return '/stock/search/' + ticker + '/' + startDate + '/' + endDate
        }
    var dataArray = [];
    
    for(var i = 0; i < tickers.length; i++){
	var url = makeUrl(tickers[i], startDate, endDate)
        console.log(url)
        axios.get(url)
	//This is not getting my any data
        .then(function(data){console.log(data)/*dataArray.push(data.datatable)*/})
    }
    //Map the ticker names and ids into dataArray
    console.log(dataArray);
    dataArray.map(function(d, j){
	d.name = tickers[j];
        d.id = j
	return d;
})
    return dataArray;
  }
  drawData(){
  //Draws to svg with data
  }
  componentWillMount(){
  //Props move to state
  }
  render() {
    var d = this.processData(this.props.tickers, this.props.startDate, this.props.endDate)
    console.log('processed');
    //this.drawData()


    let widgets = d.map(j =>{
	return <TickerWidget key={j.id} name={j.name}/>
})
    return (
      <div className="widget-collection">
        {widgets}
      </div>
    );
  }
}
