const my_db = require("../connection/db");
const logger = require("../logger/logger");

let SupplierForm = async (object) => {
  let val;
  try {
    val = await my_db
      .add(object, "add_warehouse")
      .then((data) => {
        const code = {
          status: 201,
          message: "Supplier Data was Posted successfully",
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
  return val;
};

let getsupplier = async (obj) => {
  let val;
  try {
    val = await my_db
      .get(obj, "add_warehouse")
      .then((data) => {
        if (data.bookmark == "nill") {
          const err_code = {
            status: 404,
            message: "OOOPS!!Supplier Data was not fetched",
            err: err,
          };
          logger.info(`Status: ${code.status} ${code.message}`);
          return err_code;
        }
        const code = {
          status: 200,
          message: "Supplier Data was Fetched successfully",
          data: data,
        };
        logger.info(`Status: ${code.status} ${code.message}`);
        return code;
      })
      .catch((err) => {
        const err_code = {
          status: 404,
          message: "OOOPS!!Supplier Data was not fetched",
          err: err,
        };
        logger.error("error", "Your response from database");
        return err_code;
      });
  } catch (error) {
    console.log("OOPS!!!Error");
  }
  return val;
};

let delsupplier = async (id, rev) => {
  let val;
  try {
    val = await my_db
      .del_id(id, rev, "add_warehouse")
      .then((data) => {
        const code = {
          status: 200,
          message: "Supplier Data was deleted successfully",
          data: data,
        };
        logger.info(`Status: ${code.status} ${code.message}`);
        return code;
      })
      .catch((err) => {
        const err_code = {
          status: 404,
          message: "OOOPS!!Supplier Data was not deleted",
          err: err,
        };
        logger.error("error", "Your response from database");
        return err_code;
      });
  } catch (error) {
    console.log("OOPS!!!Error");
  }
  return val;
};

let updatesupplier = async (object) => {
  let val;
  try {
    val = await my_db
      .update(object, "add_warehouse")
      .then((data) => {
        const code = {
          status: 201,
          message: "Supplier Data was updated successfully",
          data: data,
        };
        logger.info(`Status: ${code.status} ${code.message}`);
        return code;
      })
      .catch((err) => {
        const err_code = {
          status: 404,
          message: "OOOPS!!Supplier Data was not updated",
          err: err,
        };
        logger.error("error", "Your response from database");
        return err_code;
      });
  } catch (error) {
    console.log("OOPS!!!Error");
  }
  return val;
};

module.exports = {
  SupplierForm,
  getsupplier,
  delsupplier,
  updatesupplier,
};
