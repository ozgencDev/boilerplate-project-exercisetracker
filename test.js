const moment = require("moment");
let testString = "2022-10-10";
let test = Date.now();
let mom = moment(testString, "YYYY-MM-DD").valueOf();
let test2 = new Date(testString).getTime() / 1000;
console.log(mom);
