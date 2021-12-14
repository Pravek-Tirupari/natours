const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from the server side",
    app: "natours",
  });
});

app.post("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "You can now send a post request to this URL",
  });
});

app.get("/test", (req, res) => {
  res.status(300).send("Hello there");
});

const port = 3000;
app.listen(port, () => {
  console.log("App running on port " + port);
});
