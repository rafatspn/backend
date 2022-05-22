const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user-routes");
const siteRoutes = require("./routes/site-routes");
const logRoutes = require("./routes/log-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api/logs", logRoutes);

app.use((req, res, next) => {
  res.status(404).send("Could not find this route");
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred." });
});

mongoose
  .connect(
    "mongodb+srv://test_user:test_user123@myapp.fjzfo.mongodb.net/logging-application?retryWrites=true&w=majority"
  )
  .then(()=>{
    app.listen(3001, () => {
      console.log("Server started");
    });
    
  })
  .catch(err => {
    console.log(err);
  });

