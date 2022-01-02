const Tour = require("./../models/tourModel");

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

const createTour = async (req, res) => {
  // const tour = new Tour({
  //   name: "Test Tour by save method",
  //   price: 300,
  //   rating: 3.3,
  // });

  //Method 1 of storing documents to the database collection
  // tour.save();

  //Method 2: Using .create() method on the Tour model directly
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
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

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour };
