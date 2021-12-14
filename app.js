const express = require("express");

const fs = require("fs");
const app = express();
//READ TOURS DATA FROM JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, {
    encoding: "utf-8",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from the server side",
    app: "natours",
  });
});

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log("App running on port " + port);
});
