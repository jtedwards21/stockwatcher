import React from "react";
import TickerWidgets from "./tickerWidgets";
import axios from 'axios';

export default class Grapher extends React.Component {
  makeUrl(query){
	return '' + query
  }
  constructor() {
    super();

    this.state = {
      tickers: [],
      startDate: [],
      endDate: [],
      data: []
    };
  }
  render() {
    return (
      <div className="grapher">
	<TickerWidgets data={this.state.data} />
      </div>
    );
  }
}
