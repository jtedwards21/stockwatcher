import React from "react";
import TickerWidget from "./tickerWidget";

export default class TickerWidgets extends React.Component {
  constructor() {
    super();

    this.state = {
      data: []
    };
  }
  render() {
    let widgets = this.props.data.map(j =>{
	return <TickerWidget key={j.id} data={j}/>
})
    return (
      <div className="widget-collection">
        {widgets}
      </div>
    );
  }
}
