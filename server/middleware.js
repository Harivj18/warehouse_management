validate =
  (uservalidation, companyvalidation, productvalidation, suppliervalidation) =>
  (req, res, next) => {
    const { error } = uservalidation.validate(req.body);
    if (error) {
      res.status(422).send(error.details[0].message);
    } else {
      next();
    }
    const { error1 } = companyvalidation.validate(req.body);
    if (error1) {
      res.status(422).send(error1.details[0].message);
    } else {
      next();
    }
    const { error2 } = productvalidation.validate(req.body);
    if (error2) {
      res.status(422).send(error2.details[0].message);
    } else {
      next();
    }
    const { error3 } = suppliervalidation.validate(req.body);
    if (error3) {
      res.status(422).send(error3.details[0].message);
    } else {
      next();
    }
  };

module.exports = { validate };
