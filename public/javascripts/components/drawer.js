import d3 from "d3"

export default class Drawer {

  constructor() {
    this.margins = {
	"top": 50,
	"left": 30,
	"bottom": 5,
	"right": 10
    }
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxPrice = 0;

    this.height = 700 - margins.top - margins.bottom;
    this.width = 500 - margins.left - margins.right;
  }
　　setMinDate(d){
    this.minDate = d;
  }
  setMaxDate(d){
    this.maxDate = d;
  }
  //Set initial height and width of SVG
  setHW(svg, cont){
    d3.select(svg)
      .attr("height", this.height + this.margins.top + this.margins.bottom)
      .attr("width", this.width + this.margins.left + this.margins.right)
    d3.select(cont)
      .attr("height", this.height + this.margins.top + this.margins.bottom)
      .attr("width", this.width + this.margins.left + this.margins.right)
  }
  //Add inner G for margins, 'containerG'
  addMargins(svg){
    d3.select(svg)
      .append("g")
      .attr("id", "containerG")
      .attr("transform", "translate(" + this.margins.left + "," +this.margins.top + ")")
  }
  //Return Scale
  getScale(){
    var xScale = d3.scaleLinear().domain([this.maxDate, this.minDate]).range([0,this.width])
    var yScale = d3.scaleLinear().domain([this.maxPrice, 0]).range([this.height, 0])
    return {xScale:xScale, yScale:yScale}
  }
  drawAxes(xScale, yScale){
    //First Check if there are already axes and if there are delete the old axes
    var yAxis = d3.axisLeft().scale(yScale).tickSize(0)
    d3.select("#containerG").append("g").attr("id", "yAxisG").attr("transform", "translate(0,0)").call(yAxis);

    var xAxis = d3.axisBottom().scale(xScale).tickSize(0)
    d3.select("#containerG").append("g").attr("id", "xAxisG").attr("transform", "translate(0," + this.height + ")").call(xAxis);
  }
  drawLine(data, ticker){
    //First add a g with the id of the ticker
    //There is no x and y in my data now
    var lineFunc = d3.svg.line()
.x(function(d) {return xScale(d.x);})
.y(function(d){return yScale(d.y);})
.interpolate('linear');

　　　　var lineG = d3.select("#containerG").append("g")
    lineG.attr("id", ticker + "-g")

    //Add the data and draw
　　　　var containerG = d3.select('#containerG')
.append('svg:path')
.attr('d', lineFunc(data))
.attr('stroke', 'blue')
.attr('stroke-width', 2)
.attr('fill', 'none');
  }
}
