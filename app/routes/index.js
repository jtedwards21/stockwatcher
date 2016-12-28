const express = require("express");
const router = express.Router();
const request = require("request");


module.exports = function(app){

app.route("/")
   .get(function(req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});

app.route('/stock/search/:ticker/:startdate/:enddate')
   .get(function(req, res){

　　var apiKey = "KUytvHxeZzXQzvSzJkrC"
　　var url = "https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=" + req.params.ticker + "&date.gte="+ req.params.startdate +"&date.lt=" + req.params.enddate + "&qopts.columns=date,open&api_key=" + apiKey

　　var options = {
　　　　url: url
　　};

  var callback = function(err, response, body){
    res.send(body);
  };

  request(options, callback)
});

app.route('/ticker/:name')
    .get(function(req, res){
	var url = "http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=" + req.params.name + "&region=1&lang=en";
	
	var options = {
　　　　      url: url
　　	};

  	var callback = function(err, response, body){
    	  res.send(body);
  	};

	request(options, callback)
     });

};
