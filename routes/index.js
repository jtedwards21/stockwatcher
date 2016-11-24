const express = require("express");
const router = express.Router();
const request = require("request");

import { renderToString } from "react-dom/server";
import App from "../public/javascripts/components/App";
import React from "react";

/* GET home page. */
router.get("/", function(req, res) {
  const markup = renderToString(<App />);

  res.render("index", {
    title: "Express",
    markup: markup
  });
});

router.get('/stock/search/:ticker/:startdate/:enddate', function(req, res){

var apiKey = "KUytvHxeZzXQzvSzJkrC"

var url = "https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=" + req.params.ticker + "&date.gte="+ req.params.startdate +"&date.lt=" + req.params.enddate + "&qopts.columns=date,open&api_key=" + apiKey

var options = {
url: url
}
var callback = function(err, response, body){
res.send(body);
}
request(options, callback)
})

module.exports = router;
