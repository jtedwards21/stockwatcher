import React from "react";
import TickerWidget from "./tickerWidget";
import axios from "axios";





//There should be no setting of state, everything should be controlled through props and simply redrawn
export default class TickerWidgets extends React.Component {
  
  constructor() {
    super();


    this.state = {
      tickers: [],
      data: [],
      maxPrice: 0
    };
  }
  processData(d, ticker){
	console.log(ticker);
	d = d.data.datatable.data
	var data = d.map(function(a){
	  return {date: a[0], price: a[1]}	
	})
	console.log(data)
	var displayItem = {name: ticker, data: data}
	var oldData = this.state.data;
	oldData.push(displayItem)
	//Let's draw the data instead
	this.drawData(displayItem);
	
  }
  getData(tickers, startDate, endDate){
    //Make an object that widget can process to make the call to the API and go through the map function to get passed to individual widgets
    var makeUrl = function(ticker, startDate, endDate){
	  return '/stock/search/' + ticker + '/' + startDate + '/' + endDate
        }
    var dataArray = [];
    
    for(var i = 0; i < tickers.length; i++){
	var url = makeUrl(tickers[i], startDate, endDate)
	var t = tickers[i]
        axios.get(url)
	.then(data => this.processData(data, t));
    }
  }
  getAllPrices(){
    var makeUrl = function(){
	var t = "";
	for(var i = 0; i < this.props.tickers.length; i++){
	  t = t + this.props.tickers[i];
	  if(i !== this.props.tickers.length - 1){
	    t = t + ","
	  }
	}
	return '/stock/search/' + t + '/' + startDate + '/' + endDate
    }

    axios.get(url)
    .then(data => this.processPrices(data))
  }
  processPrices(data){
    var d = data.data.datatable.data
    var prices = d.map(function(a){
	return a[1]
})
    var maxPrice = d3.max(prices);
    this.setState({maxPrice: maxPrice});
  }
  drawData(){
  
  }
　　componentDidMount(){
    //Draw the initial Map
　　　　Drawer.setHW("#graph", "#box");
    Drawer.addMargins("#graph");
    var minDate = Drawer.findMinDate(this.props.initialData.data);
　　　　console.log(minDate);
    var maxDate = Drawer.findMaxDate(this.props.initialData.data);
    var maxPrice = Drawer.findMaxPrice(this.props.initialData.data);
    var scales = Drawer.getScale(minDate, maxDate, maxPrice);
    Drawer.drawAxes(scales.xScale, scales.yScale);
    Drawer.drawLine(this.props.initialData.data, this.props.initialData.name, scales)
    
    //Add the initial map data to the states
    //this.setState({tickers:this.props.tickers})
  }
  render() {
    /*this.getAllPrices();
    this.getData(this.props.tickers, this.props.startDate, this.props.endDate)
    console.log('processed');*/

    //Let's jsut try to get the widgets to appear first
    let widgets = this.state.tickers.map(function(t, i){
	return <TickerWidget key={i} name={t}/>
})
    return (
      <div className="widget-collection">
        {widgets}
      </div>
    );
  }
}



