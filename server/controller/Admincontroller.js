const { response } = require("express");
const my_db = require("../connection/db");
const logger = require("../logger/logger");

let adminForm = async (object) => {
  let value;
  try {
    value = await my_db
      .add(object, "add_warehouse")
      .then((data) => {
        const code = {
          status: 201,
          message: "Admin Data was Posted successfully",
          data: data,
        };
        logger.info(`Status: ${code.status} ${code.message}`);
        return code;
      })
      .catch((err) => {
        const err_code = {
          status: 404,
          message: "OOOPS!!Your response was not submitted!!",
          err: err,
        };
        logger.error(`Status: ${code.status} ${code.message}`);
        return err_code;
      });
  } catch (error) {
    console.log("OOPS!!!Error");
  }
  return value;
};

let getAdmin = async (obj) => {
  let value;
  try {
    value = await my_db
      .get(obj, "add_warehouse")
      .then((data) => {
        if (data.bookmark == "nill") {
          const err_code = {
            status: 404,
            message: "OOOPS!!Data was not fetched",
            err: err,
          };
          logger.info(`Status: ${code.status} ${code.message}`);
          return err_code;
        }
        const code = {
          status: 200,
          message: "Admin Data was Fetched successfully",
          data: data,
        };
        logger.info(`Status: ${code.status} ${code.message}`);
        return code;
      })
      .catch((err) => {
        const err_code = {
          status: 404,
          message: "OOOPS!!Data was not fetched",
          err: err,
        };
        logger.error("error", "Your response from database");
        return err_code;
      });
  } catch (error) {
    console.log("OOPS!!!Error");
  }
  return value;
};

let delId = async (id, rev) => {
  let value;
  try {
    value = await my_db
      .del_id(id, rev, "add_warehouse")
      .then((data) => {
        const code = {
          status: 200,
          message: "Admin Data was deleted successfully",
          data: data,
        };
        logger.info(`Status: ${code.status} ${code.message}`);
        return code;
      })
      .catch((err) => {
        const err_code = {
          status: 404,
          message: "OOOPS!!Data was not deleted",
          err: err,
        };
        logger.error("error", "Your response from database");
        return err_code;
      });
  } catch (error) {
    console.log("OOPS!!!Error");
  }
  return value;
};

let updateForm = async (object) => {
  let value;
  try {
    value = await my_db
      .update(object, "add_warehouse")
      .then((data) => {
        const code = {
          status: 201,
          message: "Admin Data was updated successfully",
          data: data,
        };
        logger.info(`Status: ${code.status} ${code.message}`);
        return code;
      })
      .catch((err) => {
        const err_code = {
          status: 404,
          message: "OOOPS!!Data was not updated",
          err: err,
        };
        logger.error("error", "Your response from database");
        return err_code;
      });
  } catch (error) {
    console.log("OOPS!!!Error");
  }
  return value;
};
module.exports = { adminForm, getAdmin, delId, updateForm };
