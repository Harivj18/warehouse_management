var nano = require("nano");
var conf = require("../config/config");

var nano_url =
  "https://apikey-v2-zyhv5j7i61imeby1qya0ma2ejrc0fkf9n4e4bl3w5gn:ec6094ae0714dc7a5ffc50a86924bef3@fffdcced-9a09-44ae-aa2f-e27add7efeb7-bluemix.cloudantnosqldb.appdomain.cloud";
console.log(nano_url);
const nanodb = nano(nano_url);

var add = function (value, dbname) {
  return new Promise((resolve, reject) => {
    if (value == undefined) {
      return reject(value);
    } else {
      var db = nanodb.use(dbname).insert(value);
      console.log("Posted into Database");
      return resolve(db);
    }
  });
};

var get = function (val, dbname) {
  return new Promise((resolve, reject) => {
    if (dbname == undefined) {
      return reject(dbname);
    } else {
      var db = nanodb.use(dbname).find(val);
      return resolve(db);
    }
  });
};

var del_id = function (id, id1, dbname) {
  return new Promise((resolve, reject) => {
    if (id == undefined && id1 == undefined) {
      return reject(id, id1);
    } else {
      var db = nanodb.use(dbname).destroy(id, id1);
      return resolve(db);
    }
  });
};

var update = function (value, dbname) {
  return new Promise((resolve, reject) => {
    if (value == undefined) {
      return reject(value);
    } else {
      var db = nanodb.use(dbname).insert(value);
      return resolve(db);
    }
  });
};

module.exports = {
  get,
  del_id,
  update,
  add,
};
