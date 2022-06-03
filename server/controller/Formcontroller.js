const my_db = require("../connection/db");
const logger = require("../logger/logger");

let SignupForm = async (object) => {
  let val;
  try {
    val = await my_db
      .add(object, "add_warehouse")
      .then((data) => {
        const code = {
          status: 201,
          message: "User Data was Posted successfully",
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

module.exports = { SignupForm };
