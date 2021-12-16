const fs = require("fs");

//READ TOURS DATA FROM JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, {
    encoding: "utf-8",
  })
);

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
  console.log(req.params);
  const id = +req.params.id;
  if (id >= tours.length)
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
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
};

const deleteTour = (req, res) => {
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
};

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour };
