const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./app");

//CONNECT TO DB
const DB = process.env.DB_STRING.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB).then(() => console.log("Connection to DB success"));

//TOUR SCHEMA
const tourSchema = new mongoose.Schema({
  name: { type: String, required: [true, "A tour should have a name"], unique: true },
  rating: { type: Number, default: 4.5 },
  price: {
    type: Number,
    required: [true, "A tour should have a price"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App running on port " + port);
});
