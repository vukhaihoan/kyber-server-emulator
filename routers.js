var express = require("express");
var router = express.Router();
const fs = require("fs");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", function (req, res) {
  res.send({
    message: "Welcome to the API",
  });
});

let i = -8;
let time = Math.floor(Date.now() / 1000);
setInterval(() => {
  time = Math.floor(Date.now() / 1000);
  i++;
  if (i == 81) {
    i = -8;
  }
  console.log("change time", i);
}, 60 * 1000);

function getTrendingSoonData(i, timeframe) {
  let data = JSON.parse(
    fs.readFileSync(__dirname + `/old/data3/data${i}.json`)
  );
  let timeframe_data = timeframe == "24h" ? data.data24h : data.data7d;
  timeframe_data.data.tokens = timeframe_data.data.tokens.map((item, index) => {
    return {
      ...item,
      predicted_date: time,
    };
  });
  return timeframe_data;
}

router.get("/api/v1/trending-soon/", (req, res) => {
  try {
    let timeframe = req.query.timeframe;
    let data = getTrendingSoonData(i, timeframe);
    res.send(data);
    return;
  } catch (error) {
    res.send("error catch in router /api/v1/trending-soon/");
  }
});

router.get("/api/v1/trending/", (req, res) => {
  try {
    let timeframe = req.query.timeframe;
    let data = getTrendingSoonData(i, timeframe);
    res.send(data);
    return;
  } catch (error) {
    res.send("error catch in router /api/v1/trending-soon/");
  }
});

module.exports = router;
