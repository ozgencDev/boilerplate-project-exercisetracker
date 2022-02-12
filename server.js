const express = require("express");
const app = express();
const cors = require("cors");
const { route } = require("./routes/api.routes");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  process.env.MONGO || "mongodb://localhost:27017/fitness-tracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(route);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
