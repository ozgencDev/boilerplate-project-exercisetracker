const route = require("express").Router();
const {
  createUser,
  getUsers,
  addExercises,
  getUserLogs,
  getExercises,
} = require("../handler/api.handler");

route.get("/api/users", getUsers);
route.post("/api/users", createUser);

route.get("/api/users/:_id/logs", getUserLogs);

route.get("/api/users/:_id/exercises", getExercises);
route.post("/api/users/:_id/exercises", addExercises);

exports.route = route;
