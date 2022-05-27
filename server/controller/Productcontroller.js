const my_db = require("../connection/db");
const logger = require("../logger/logger");

var ProductForm = async (object) => {
  try {
    var val = await my_db
      .add(object, "add_warehouse")
      .then((data) => {
        logger.info("Your Data was posted sucessfully!!!");
        return data;
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        return err;
      });
  } catch (error) {
    console.log("OOPS!!!Error");
  }
  return val;
};

var getproduct = async (obj) => {
  try {
    var val = await my_db
      .get(obj, "add_warehouse")
      .then((data) => {
        logger.info("Your Data was fetched sucessfully!!!");
        return data;
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        return err;
      });
  } catch (error) {
    console.log("OOPS!!!Error");
  }
  return val;
};

var delproduct = async (id, rev) => {
  try {
    var val = await my_db
      .del_id(id, rev, "add_warehouse")
      .then((data) => {
        logger.warn("Your Data was deleted sucessfully!!!");
        return data;
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        return err;
      });
  } catch (error) {
    console.log("OOPS!!!Error");
  }
  return val;
};

var updateproduct = async (object) => {
  try {
    var val = await my_db
      .update(object, "add_warehouse")
      .then((data) => {
        logger.info("Your Data was updated sucessfully!!!");
        return data;
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        return err;
      });
  } catch (error) {
    console.log("OOPS!!!Error");
  }
  return val;
};

module.exports = {
  ProductForm,
  getproduct,
  delproduct,
  updateproduct,
};
