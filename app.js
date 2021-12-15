const express = require("express");
const morgan = require("morgan");

const fs = require("fs");
const app = express();

//MIDDLEWARES
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//READ TOURS DATA FROM JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, {
    encoding: "utf-8",
  })
);

//ROUTE HANDLERS
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route to be implemented soon",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route to be implemented soon",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route to be implemented soon",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route to be implemented soon",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route to be implemented soon",
  });
};

//ROUTES
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
userRouter.route("/api/v1/users").get(getAllUsers).post(createUser);
userRouter.route("api/v1/users/:id").get(getUser).patch(updateUser).delete(deleteUser);

//ROUTERS
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log("App running on port " + port);
});
