const express = require("express");
const router = express.Router();

import { renderToString } from "react-dom/server";
import App from "../public/javascripts/components/app";
import React from "react";

/* GET home page. */
router.get("/", function(req, res) {
  const markup = renderToString(<App />);

  res.render("index", {
    title: "Express",
    markup: markup
  });
});

router.get('/stock/search/:ticker/:startdate/:end', function(req, res){
var options = {
url:'' + req.params.query,
//headers: {"apikey": apiKey.apiKey}
}
var callback = function(err, response, body){
res.send(body);
}
request(options, callback)
})

module.exports = router;
