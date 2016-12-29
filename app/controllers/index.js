



//There should be no setting of state, everything should be controlled through props and simply redrawn
var TickerWidgets = React.createClass({
  getInitialState() {
    return {
      tickers: this.props.tickers,
      newTicker: "",
      startDate: new Date("2016-05-05"),
      endDate: new Date("2016-11-10"),
      message: "",
      searchResults: []
    };
  },
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
  },
  processPrices(data){
    var d = data.data.datatable.data
    var prices = d.map(function(a){
	return a[1]
})
    var maxPrice = d3.max(prices);
    this.setState({maxPrice: maxPrice});
  },
  getMinDate(){
    var tickers = this.state.tickers;
　　　　var minValue;
    for(var i = 0; i < tickers.length;i++){
　　　　　　if(minValue == undefined){
	minValue = Drawer.findMinDate(tickers[i].data)
      }
      else if(Drawer.findMinDate(tickers[i].data) < minValue){
	minValue = Drawer.findMinDate(tickers[i].data);
      }
    } 
    return minValue;
  },
  getMaxDate(){
    var tickers = this.state.tickers;
　　　　var maxValue;
    for(var i = 0; i < tickers.length;i++){
　　　　　　if(maxValue == undefined){
	maxValue = Drawer.findMaxDate(tickers[i].data)
      }
      else if(Drawer.findMaxDate(tickers[i].data) > maxValue){
	maxValue = Drawer.findMaxDate(tickers[i].data);
      }
    } 
    return maxValue;
  },
  getMaxPrice(){
    var tickers = this.state.tickers;
　　　　var maxValue;
    for(var i = 0; i < tickers.length;i++){
　　　　　　if(maxValue == undefined){
	maxValue = Drawer.findMaxPrice(tickers[i].data)
      }
      else if(Drawer.findMaxPrice(tickers[i].data) > maxValue){
	maxValue = Drawer.findMaxPrice(tickers[i].data);
      }
    } 
    return maxValue;
  },
  drawTickers(){
    var dim = Drawer.setHW("#graph", "#graph-box");
    Drawer.addMargins("#graph");
    var minDate = this.state.startDate;
    var maxDate = this.state.endDate;
    var maxPrice = this.getMaxPrice();
    var scales = Drawer.getScale(minDate, maxDate, maxPrice);
    Drawer.drawAxes(scales.xScale, scales.yScale);
    var tickers = this.state.tickers;
    for(var i = 0; i < tickers.length; i++){
      Drawer.drawLine(tickers[i].data, tickers[i].name, scales, i);
    }
  },
　　componentDidMount(){
    $("#graph-box").css("width", "900");
    $("#graph-box").css("height", "500");
    this.drawTickers();
  },
  updateNewTicker(e){
    this.setState({newTicker:e.target.value});
  },
  updateStartDate(t){
    this.setState({startDate:new Date(t)});
    this.updateTickerData();
  },
  updateEndDate(t){
    this.setState({endDate:new Date(t)});
    this.updateTickerData();
  },
  updateTickerData(){
    var tickers = this.state.tickers.slice();
    var that = this;
    for(var i = 0; i < tickers.length; i++){
      var ticker = tickers[i];
      var url = this.makeDataUrl(ticker.symbol);
      axios.get(url)
　　　　  .then(function(data){
	var tickers = that.state.tickers.slice();
	var data = data.data.datatable.data
	data = data.map(function(a){
	  return {date: new Date(a[0]), price: a[1]}	
	});
	ticker.data = data;
        tickers[i -1] = ticker;
	that.setState({tickers:tickers});
        that.drawTickers();
    });
    }
  },
  processSearchResults(data){
    var results = data.data.ResultSet;
    this.setState({searchResults: results.Result});
  },
  searchTicker(){
    var url = "/ticker/" + this.state.newTicker
    axios.get(url)
    .then(data => this.processSearchResults(data));
  },
  makeDataUrl(symbol){
    //Make a start date
    var y = this.state.startDate.getFullYear();
    var m = this.state.startDate.getMonth();
    var d = this.state.startDate.getDate();
    
    m = String(m);
    if(m.length == 1){m = "0" + m}

    d = String(d);
    if(d.length == 1){d = "0" + d}
    var startDate = String(y) + m + d

    //Make an end Date
    var y = this.state.endDate.getFullYear();
    var m = this.state.endDate.getMonth();
    var d = this.state.endDate.getDate();

    m = String(m);
    if(m.length == 1){m = "0" + m}

    d = String(d);
    if(d.length == 1){d = "0" + d}
    var endDate = String(y) + m + d;


　　　　var url = '/stock/search/' + symbol + '/' + startDate + '/' + endDate;
    return url;
  },
  addTicker(ticker){
    var url = this.makeDataUrl(ticker.symbol);
    var that = this;
    axios.get(url)
　　　　.then(function(data){
        console.log(data)
	data = data.data.datatable.data
        console.log(data);
	var data = data.map(function(a){
	  return {date: new Date(a[0]), price: a[1]}	
	});
	ticker.data = data;
	var tickers = that.state.tickers.slice();
        tickers.push(ticker);
	that.setState({tickers:tickers});
        that.drawTickers();
    });   
  },
  render() {
    //I think I should move drawing to the render function
    var tickers = [];
    if(this.state.tickers.length > 0){
	tickers = this.state.tickers.map(function(t, i){
	  return <Ticker symbol={t.symbol} exchDisp={t.exchDisp} type={t.type} key={i} name={t.name} />
      });
    }
    var controlWidget = <ControlWidget addTicker={this.addTicker} searchResults={this.state.searchResults} searchTicker={this.searchTicker} message={this.state.message} key={99} newTicker={this.state.newTicker} updateNewTicker={this.updateNewTicker} />
    var dateWidget = <DateWidget updateStartDate={this.updateStartDate} updateEndDate={this.updateEndDate} startDate={this.state.startDate} endDate={this.state.endDate} />
    return (
　　　　  <div>
        <div id="graph-box-container col-md-12">
	    <div className="graph-title">Stocks</div>
            <div className="graph-box">
	      {dateWidget}
	      <svg id="graph"></svg>
	    </div>
	</div>
        <div className="grapher row">
	  <div id="widget-collection">
            {tickers}
	    {controlWidget}
          </div>
        </div>
      </div>
    );
  }
});
 
var Ticker = React.createClass({
  getInitialState() {
    return {
    };
  },
  render() {
    return (
      <div style={{fontFamily: "Denominator"}} className="widget-button col-md-2">
        <div>{this.props.name}</div>
        <div>{this.props.exchDisp}</div>
        <div>{this.props.symbol}</div>
        <div>{this.props.type}</div>
      </div>
    );
  }
});



var ControlWidget = React.createClass({
  getInitialState(){
    return {
	searched: false,
        resultNo: 0
    };
  },
  searchTicker(){
    //Transition searched
    this.props.searchTicker();
    this.setState({searched: true})
  },
  nextResult(){
    if(this.state.resultNo < this.props.searchResults.length){
	this.setState({resultNo: this.state.resultNo + 1})
    }
  },
  previousResult(){
    if(this.state.resultNo > 0){
	this.setState({resultNo: this.state.resultNo - 1})
    }
  },
  back(){
    this.setState({searched: false});
  },
  addTicker(){
　　　　var ticker = this.props.searchResults[this.state.resultNo]
    this.props.addTicker(ticker);
    this.back();
  },
  render(){

    var searchResults = this.props.searchResults.map(function(s){
	return <SearchResult name={s.name} symbol={s.symbol} type={s.type} exchange={s.exchDisp}/>
    });
    console.log(searchResults);	
    
    var currentResult;
    if(this.state.searched == true){
	currentResult = searchResults[this.state.resultNo];
    }

    //If Statement for Return
    if(this.state.searched == false){
      return (
	<div style={{fontFamily: "Denominator"}} id="control-widget" className=" widget-button">
       　　 <div>
	    Search a ticker or company name
	  </div>
	  <div className="input-group">
	    <input type="text" className="form-control" placeholder="Your Stock Here"  aria-describedby="basic-addon1" value={this.props.newTicker} onChange={this.props.updateNewTicker}/>
	    <span onClick={this.searchTicker} className="input-group-addon" id="basic-addon1">+</span>
            <div id="message">{this.props.message}</div>
	  </div>
      　　</div>
      ) 
    }
    else if(this.state.searched == true){
      return (
	<div style={{fontFamily: "Denominator"}} id="control-widget" className="col-md-2 widget-button">
	 　<div id="top-row">
	    <div onClick={this.nextResult} id="left-arrow">L</div>
	    <div>Results</div>
	    <div onClick={this.previousResult} id="right-arrow">></div>
	  </div>
	  {currentResult}
	  <div id="search-btn-container">
	    <div onClick={this.addTicker} className="search-btn" id="add-button">Add</div>
	    <div onClick={this.back} className="search-btn" id="back-button">Back</div>
	  </div>
	</div>
      )
    }
  }
});



var SearchResult = React.createClass({
  getInitialState(){
    return {};
  },
  render(){
    return (
      <div>
	{this.props.name}
	{this.props.symbol}
	{this.props.type}
	{this.props.exchange}
      </div>
    );
  }
});



var DateWidget = React.createClass({
  getInitialState(){
    return {};
  },
  closeStartDate(t){
    this.props.updateStartDate(t);
  },
  closeEndDate(t){
    this.props.updateEndDate(t);
  },
  componentDidMount(){
    $("#startDate").datepicker();
    $("#endDate").datepicker();
    $("#startDate").datepicker("option", "onClose", this.closeStartDate);
    $("#endDate").datepicker("option", "onClose", this.closeEndDate);
    $("#startDate").datepicker("setDate", this.props.startDate);
    $("#endDate").datepicker("setDate", this.props.endDate);

  },
  render(){
    console.log(this.props.startDate);
    return (
	<div id="date-widget">
	  <div>
            <label>Start Date:</label>
	    <input id="startDate" type="text" className="datepicker" />
	  </div>
	  <div>
	    <label>End Date:</label>
	　　  <input id="endDate" type="text" className="datepicker" />
	  </div>
	</div>
    )
  }
});






















var initialData = [["2016-05-05",94.0],["2016-05-06",93.37],["2016-05-09",93.0],["2016-05-10",93.33],["2016-05-11",93.48],["2016-05-12",92.72],["2016-05-13",90.0],["2016-05-16",92.39],["2016-05-17",94.55],["2016-05-18",94.16],["2016-05-19",94.64],["2016-05-20",94.64],["2016-05-23",95.87],["2016-05-24",97.22],["2016-05-25",98.67],["2016-05-26",99.68],["2016-05-27",99.44],["2016-05-31",99.6],["2016-06-01",99.02],["2016-06-02",97.6],["2016-06-03",97.79],["2016-06-06",97.99],["2016-06-07",99.25],["2016-06-08",99.02],["2016-06-09",98.5],["2016-06-10",98.53],["2016-06-13",98.69],["2016-06-14",97.32],["2016-06-15",97.82],["2016-06-16",96.45],["2016-06-17",96.62],["2016-06-20",96.0],["2016-06-21",94.94],["2016-06-22",96.25],["2016-06-23",95.94],["2016-06-24",92.91],["2016-06-27",93.0],["2016-06-28",92.9],["2016-06-29",93.97],["2016-06-30",94.44],["2016-07-01",95.49],["2016-07-05",95.39],["2016-07-06",94.6],["2016-07-07",95.7],["2016-07-08",96.49],["2016-07-11",96.75],["2016-07-12",97.17],["2016-07-13",97.41],["2016-07-14",97.39],["2016-07-15",98.92],["2016-07-18",98.7],["2016-07-19",99.56],["2016-07-20",100.0],["2016-07-21",99.83],["2016-07-22",99.26],["2016-07-25",98.25],["2016-07-26",96.82],["2016-07-27",104.265],["2016-07-28",102.83],["2016-07-29",104.19],["2016-08-01",104.41],["2016-08-02",106.05],["2016-08-03",104.81],["2016-08-04",105.58],["2016-08-05",106.27],["2016-08-08",107.52],["2016-08-09",108.23],["2016-08-10",108.71],["2016-08-11",108.52],["2016-08-12",107.78],["2016-08-15",108.14],["2016-08-16",109.63],["2016-08-17",109.1],["2016-08-18",109.23],["2016-08-19",108.77],["2016-08-22",108.86],["2016-08-23",108.59],["2016-08-24",108.565],["2016-08-25",107.39],["2016-08-26",107.41],["2016-08-29",106.62],["2016-08-30",105.8],["2016-08-31",105.66],["2016-09-01",106.14],["2016-09-02",107.7],["2016-09-06",107.9],["2016-09-07",107.83],["2016-09-08",107.25],["2016-09-09",104.64],["2016-09-12",102.65],["2016-09-13",107.51],["2016-09-14",108.73],["2016-09-15",113.86],["2016-09-16",115.12],["2016-09-19",115.19],["2016-09-20",113.05],["2016-09-21",113.85],["2016-09-22",114.35],["2016-09-23",114.42],["2016-09-26",111.64],["2016-09-27",113.0],["2016-09-28",113.69],["2016-09-29",113.16],["2016-09-30",112.46],["2016-10-03",112.71],["2016-10-04",113.06],["2016-10-05",113.4],["2016-10-06",113.7],["2016-10-07",114.31],["2016-10-10",115.02],["2016-10-11",117.7],["2016-10-12",117.35],["2016-10-13",116.79],["2016-10-14",117.88],["2016-10-17",117.33],["2016-10-18",118.18],["2016-10-19",117.25],["2016-10-20",116.86],["2016-10-21",116.81],["2016-10-24",117.1],["2016-10-25",117.95],["2016-10-26",114.31],["2016-10-27",115.39],["2016-10-28",113.87],["2016-10-31",113.65],["2016-11-01",113.46],["2016-11-02",111.4],["2016-11-03",110.98],["2016-11-04",108.53],["2016-11-07",110.08],["2016-11-08",110.31],["2016-11-09",109.88],["2016-11-10",111.09]];

var mapped = initialData.map(function(d){
  return {date: new Date(d[0]), price: d[1]};
})

var tickers = [{name: "Apple Inc.", exch: "NMS", exchDisp: "NASDAQ", symbol: "AAPL", type: "S", typeDisp: "Equity", data: mapped}];


ReactDOM.render(
  <TickerWidgets tickers={tickers} startDate={'2016-05-05'} endDate={"2016-11-10"} />,
  document.getElementById('content')
)


