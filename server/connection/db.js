const nano = require("nano");

const nano_url =
  "https://apikey-v2-zyhv5j7i61imeby1qya0ma2ejrc0fkf9n4e4bl3w5gn:ec6094ae0714dc7a5ffc50a86924bef3@fffdcced-9a09-44ae-aa2f-e27add7efeb7-bluemix.cloudantnosqldb.appdomain.cloud";
const nanodb = nano(nano_url);

const add = function (value, dbname) {
  return new Promise((resolve, reject) => {
    if (value == undefined) {
      return reject(value);
    } else {
      const db = nanodb.use(dbname).insert(value);
      return resolve(db);
    }
  });
};

const get = function (val, dbname) {
  return new Promise((resolve, reject) => {
    if (dbname == undefined) {
      return reject(dbname);
    } else {
      const db = nanodb.use(dbname).find(val);
      return resolve(db);
    }
  });
};

const del_id = function (id, id1, dbname) {
  return new Promise((resolve, reject) => {
    if (id == undefined && id1 == undefined) {
      return reject(id, id1);
    } else {
      const db = nanodb.use(dbname).destroy(id, id1);
      return resolve(db);
    }
  });
};

const update = function (val, dbname) {
  return new Promise((resolve, reject) => {
    if (val == undefined) {
      return reject(val);
    } else {
      const db = nanodb.use(dbname).insert(val);
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
