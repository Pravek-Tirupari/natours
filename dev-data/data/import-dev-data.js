const dotenv = require("dotenv");
dotenv.config({ path: "../../config.env" });
const fs = require("fs");
const mongoose = require("mongoose");
const express = require("express");

const Tour = require("../../models/tourModel");

const DB = process.env.DB_STRING.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB).then(() => console.log("Script ready"));

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync("./tours-simple.json", { encoding: "utf-8" }));

//IMPORT DATA TO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully imported");
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

//DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted. READY TO IMPORT");
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
}

if (process.argv[2] == "--delete") {
  deleteData();
}
