const route = require("express").Router();
const {
  createUser,
  getUsers,
  addExercises,
  getUserLogs,
} = require("../handler/api.handler");

route.get("/api/users", getUsers); //tüm kullanıcıları alacaksın
route.post("/api/users", createUser);

route.get("/api/users/:_id/logs", getUserLogs);
route.post("/api/users/:_id/exercises", addExercises);

exports.route = route;