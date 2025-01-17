const moment = require("moment");

exports.isValidDate = (date) => {
  try {
    console.log(moment(date).isValid("YYYY-MM-DD"), "<<<<<<<<<<< test");
    return moment(date).isValid("YYYY-MM-DD");
  } catch (e) {
    return false;
  }
};

exports.convertTime = (time) => {
  return moment(time).format("ddd MMM DD YYYY");
};

exports.queryDate = (logTimes, from, to, limit) => {
  from = moment(from, "YYYY-MM-DD").isValid() ? moment(from).valueOf() : 0;
  to = moment(to, "YYYY-MM-DD", true).isValid()
    ? moment(to).valueOf()
    : 10000000000000;

  let filtered = logTimes.filter((log) => {
    let logTime = moment(log.date, "ddd MMM DD YYYY").valueOf();
    return logTime >= from && logTime <= to;
  });
  return filtered.slice(0, limit);
};
