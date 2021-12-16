const fs = require("fs");

//READ TOURS DATA FROM JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, {
    encoding: "utf-8",
  })
);

const checkId = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (val >= tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
  }
  next();
};

const checkBody = (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.price) {
    return res.status(400).json({
      status: "success",
      message: "A tour should have a name and price",
    });
  }
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    tour: "<UPDATED TOUR HERE>",
  });
};

const deleteTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);
  res.status(204).json({
    status: "success",
    message: "Tour deleted",
    data: null,
  });
};

module.exports = { checkId, checkBody, getAllTours, getTour, createTour, updateTour, deleteTour };
