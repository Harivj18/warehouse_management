const my_db = require("../connection/db");
const logger = require("../logger/logger");

let getinfo = async (obj) => {
  let val;
  try {
    val = await my_db
      .get(obj, "add_warehouse")
      .then((data) => {
        if (data.bookmark == "nill") {
          const err_code = {
            status: 404,
            message: "OOOPS!!Info Data was not fetched",
            err: err,
          };
          logger.info(`Status: ${code.status} ${code.message}`);
          return err_code;
        }
        const code = {
          status: 200,
          message: "Info Data was Fetched successfully",
          data: data,
        };
        logger.info(`Status: ${code.status} ${code.message}`);
        return code;
      })
      .catch((err) => {
        const err_code = {
          status: 404,
          message: "OOOPS!!Your response was not fetched!!",
          err: err,
        };
        logger.error(`Status: ${code.status} ${code.message}`);
        return err_code;
      });
  } catch (error) {
    const err_code = {
      status: 404,
      message: "OOOPS!!Info Data was not fetched",
      err: err,
    };
    logger.error("error", "Your response from database");
    return err_code;
  }
  return val;
};

module.exports = {
  getinfo,
};
