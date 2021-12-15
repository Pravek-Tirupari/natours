const express = require("express");

const fs = require("fs");
const app = express();
app.use(express.json());
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

app.get("/api/v1/tours/:id", (req, res) => {
  console.log(req.params);
  const id = +req.params.id;
  if (id >= tours.length)
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
  const tour = tours.find((el) => el.id === id);
  console.log(tour);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  });
});

app.patch("/api/v1/tours/:id", (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid id",
    });
  }

  res.status(200).json({
    status: "success",
    tour: "<UPDATED TOUR HERE>",
  });
});

app.delete("/api/v1/tours/:id", (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
  }

  res.status(204).json({
    status: "success",
    message: "Tour deleted",
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log("App running on port " + port);
});
