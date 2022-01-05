const Tour = require("./../models/tourModel");

const getAllTours = async (req, res) => {
  let queryObj = { ...req.query };
  //1) Filtering
  const fieldsToExclude = ["sort", "page", "limit", "fields"];
  fieldsToExclude.forEach((field) => delete queryObj[field]);

  //Advanced Filtering
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(/\b(lte|gte|lt|gt)\b/g, (match) => {
    return `$${match}`;
  });
  queryObj = JSON.parse(queryString);

  let query = Tour.find(queryObj);

  //2) SORTING
  if (req.query.sort) {
    // const sortBy = req.query.sort.replace(/,/g, " ");
    //Another way to get the sortBy string:
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //3) FIELD LIMITING
  if (req.query.fields) {
    console.log(req.query.fields);
    const selectFields = req.query.fields.split(",").join(" ");
    query = query.select(selectFields);
  } else {
    query = query.select("-__v");
  }

  //4)PAGINATION (LIMITING NUMBER OF RESULTS)
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 100;
  const skipResults = (page - 1) * limit;
  query = query.skip(skipResults).limit(limit);

  //New method --> To get the number of documents present in the collection
  if (req.query.page) {
    const numTours = Tour.countDocuments();
    if (skipResults >= numTours) {
      throw new Error("This page does not exist");
    }
  }

  try {
    const tours = await query;
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

const getTour = async (req, res) => {
  // const id = +req.params.id;
  // const tour = tours.find((el) => el.id === id);
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
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

const updateTour = async (req, res) => {
  // const id = +req.params.id;
  // const tour = tours.find((el) => el.id === id);
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: { tour: updatedTour },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteTour = async (req, res) => {
  // const id = +req.params.id;
  // const tour = tours.find((el) => el.id === id);
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "Tour deleted",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

module.exports = { getAllTours, aliasTopTours, getTour, createTour, updateTour, deleteTour };
