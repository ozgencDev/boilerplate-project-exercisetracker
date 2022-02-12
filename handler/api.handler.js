const User = require("../models/user.model");
const { isValidDate, convertTime, queryDate } = require("../utils/time.util");

exports.createUser = (req, res) => {
  const { username } = req.body;
  const user = new User({
    username,
    count: 0,
  });
  user
    .save()
    .then((result) => {
      const { _id, username } = result;
      const cropedUser = { _id, username };
      res.json(cropedUser);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getUsers = (req, res) => {
  User.find({})
    .select("username")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.addExercises = async (req, res) => {
  let _id = req.body[":_id"] || req.params._id;
  let { description, duration, date } = req.body;
  if (!date) date = convertTime(Date.now());

  if (!isValidDate(date)) {
    res.json({
      error: "Invalid date",
    });
    return;
  }
  date = convertTime(date);
  try {
    const user = await User.findByIdAndUpdate(_id);
    user.log.push({ description, duration, date });
    user.count++;
    user.save();
    console.log(user.username, description, duration, date, user._id);
    res.json({
      username: user.username,
      description,
      duration,
      date,
      _id: user._id,
    });
  } catch (err) {
    res.json("ses");
  }
};

exports.getUserLogs = async (req, res) => {
  let _id = req.body[":_id"] || req.params._id;
  let { from, to, limit } = req.query;
  const user = await User.findById(_id);
  let filtered = queryDate(user.log, from, to, limit);
  const responseSchema = {
    username: user.username,
    count: user.count,
    _id: user._id,
    log: filtered,
  };

  res.json(responseSchema);
};

exports.getExercises = async (req, res) => {
  let _id = req.body[":_id"] || req.params._id;
  const user = await User.findById(_id);
  const responseSchema = {
    username: user.username,
    _id: user._id,
    exercises: user.log,
  };
  res.json(responseSchema);
};
