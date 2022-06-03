const connection = require("express");
const bodyparser = require("body-parser");
const app = connection();
const port = 8000;
const cors = require("cors");
const logger = require("./logger/logger");
const Admincontroller = require("./controller/Admincontroller");
const Companycontroller = require("./controller/Companycontroller");
const Productcontroller = require("./controller/Productcontroller");
const SupplierController = require("./controller/Suppliercontroller");
const Formcontroller = require("./controller/Formcontroller");
const Infocontroller = require("./controller/Infocontroller");
const contactmail = require("./connection/mail");
const validation = require("./validation");
const { error } = require("./logger/logger");
app.use(connection.static("public"));
app.use(bodyparser.json());
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

// FOR SIGNUP FORM
app.post("/postuser", (request, response) => {
  const object = {
    username: request.body.username,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    contact: request.body.contact,
    password: request.body.password,
    confirm_password: request.body.confirm_password,
    type: "adminuser",
  };
  Formcontroller.SignupForm(object)
    .then((res) => {
      logger.info("Your Data was posted sucessfully!!!");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

// ADD ADMIN
app.post("/adduser", (request, response) => {
  const erroruser = validation.uservalidation.validate(request.body);
  console.log(erroruser, "Successfully added Adminuser!!");
  if (!erroruser.error) {
    const object = {
      username: request.body.username,
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      email: request.body.email,
      contact: request.body.contact,
      password: request.body.password,
      confirm_password: request.body.confirm_password,
      type: "adminuser",
    };
    Admincontroller.AdminForm(object)
      .then((res) => {
        logger.info("Your Data was posted sucessfully!!!");
        response.send(res);
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        response.send("OOPS!!Failed to send your response", err);
      });
  } else {
    logger.warn("error !! something bad happened in registering admin!!");
  }
});

// GET ADMIN
app.get("/getUser", (_request, response) => {
  const data = {
    selector: {
      type: "adminuser",
    },
  };
  Admincontroller.getAdmin(data)
    .then((res) => {
      logger.info("data fetched");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

// DELETING ADMIN DATA
app.delete("/delete/:id/:id1", (request, response) => {
  Admincontroller.delId(request.params.id, request.params.id1)
    .then((res) => {
      logger.warn("Your data was deleted successfully!!");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

// UPDATING ADMIN DATA
app.put("/putquery", (request, response) => {
  const erroruser = validation.uservalidation.validate(request.body);
  if (!erroruser.error) {
    const object = {
      username: request.body.username,
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      email: request.body.email,
      contact: request.body.contact,
      password: request.body.password,
      confirm_password: request.body.confirm_password,
      _id: request.body._id,
      _rev: request.body._rev,
      type: "adminuser",
    };
    Admincontroller.updateForm(object)
      .then((res) => {
        logger.info("Your Data was updated sucessfully!!!");
        response.send(res);
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        response.send("OOPS!!Failed to send your response", err);
      });
  } else {
    logger.warn("error !! something bad happened in updating user data!!");
  }
});

//TO ADD COMPANY
app.post("/addcompany", (request, response) => {
  const errorcompany = validation.companyvalidation.validate(request.body);
  if (!errorcompany.error) {
    const object = {
      company: request.body.company,
      company_id: request.body.company_id,
      email: request.body.email,
      website: request.body.website,
      location: request.body.location,
      type: "Company",
    };
    Companycontroller.CompanyForm(object)
      .then((res) => {
        logger.info("Your Data was posted sucessfully!!!");
        response.send(res);
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        response.send("OOPS!!Failed to send your response", err);
      });
  } else {
    logger.warn("error !! something bad happened in Registering company!!");
  }
});

// TO GET COMPANY
app.get("/getcompany", (_request, response) => {
  const data = {
    selector: {
      type: "Company",
    },
  };
  Companycontroller.getcompany(data)
    .then((res) => {
      logger.info("Your data was fetched succesfully");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

// TO DELETE COMPANY
app.delete("/delcompany/:id/:id1", (request, response) => {
  Companycontroller.delcompany(request.params.id, request.params.id1)
    .then((res) => {
      logger.warn("Your Data was deleted successfully!!");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

//TO UPDATE COMPANY
app.put("/updatecompany", (request, response) => {
  const errorcompany = validation.companyvalidation.validate(request.body);
  console.log(errorcompany, "Successfully updated company!!");
  if (!errorcompany.error) {
    const object = {
      company: request.body.company,
      company_id: request.body.company_id,
      email: request.body.email,
      website: request.body.website,
      location: request.body.location,
      _id: request.body._id,
      _rev: request.body._rev,
      type: "Company",
    };
    Companycontroller.CompanyForm(object)
      .then((res) => {
        logger.info("Your Data was posted sucessfully!!!");
        response.send(res);
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        response.send("OOPS!!Failed to send your response", err);
      });
  } else {
    logger.warn(
      "error !! something bad happened in updating data of company!!"
    );
  }
});

//TO ADD PRODUCTS
app.post("/addproduct", (request, response) => {
  const errorproducts = validation.productvalidation.validate(request.body);
  console.log(errorproducts, "Successfully added Products");
  if (!errorproducts.error) {
    const object = {
      company: request.body.company,
      category: request.body.category,
      product_id: request.body.product_id,
      brand: request.body.brand,
      quantity: request.body.quantity,
      price: request.body.price,
      total: request.body.total,
      manufacture: request.body.manufacture,
      particulars: request.body.particulars,
      type: "products",
    };
    Productcontroller.ProductForm(object)
      .then((res) => {
        logger.info("Your Product was posted sucessfully!!!");
        response.send(res);
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        response.send("OOPS!!Failed to register your products", err);
      });
  } else {
    logger.error(
      "error !! something bad happened in registering products of company!!"
    );
  }
});

// TO GET PRODUCT
app.get("/getproduct", (_request, response) => {
  const data = {
    selector: {
      type: "products",
    },
  };
  Productcontroller.getproduct(data)
    .then((res) => {
      logger.info("Your Product was fetched succesfully");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

// TO DELETE PRODUCT
app.delete("/delproduct/:id/:id1", (request, response) => {
  Productcontroller.delproduct(request.params.id, request.params.id1)
    .then((res) => {
      logger.warn("Your data was deleted succesfully");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

//TO UPDATE PRODUCT
app.put("/updateproduct", (request, response) => {
  const errorproducts = validation.productvalidation.validate(request.body);
  if (!errorproducts.error) {
    const object = {
      company: request.body.company,
      category: request.body.category,
      product_id: request.body.product_id,
      brand: request.body.brand,
      quantity: request.body.quantity,
      price: request.body.price,
      total: request.body.total,
      manufacture: request.body.manufacture,
      particulars: request.body.particulars,
      _id: request.body._id,
      _rev: request.body._rev,
      type: "products",
    };
    Productcontroller.updateproduct(object)
      .then((res) => {
        logger.info("Your Product was updated sucessfully!!!");
        response.send(res);
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        response.send("OOPS!!Failed to register your products", err);
      });
  } else {
    logger.warn(
      "error !! something bad happened in updating products of company!!"
    );
  }
});

// TO ADD SUPPLIER
app.post("/addsupplier", (request, response) => {
  const errorsupplier = validation.suppliervalidation.validate(request.body);
  console.log(errorsupplier, "Successfully registered supplier!!");
  if (!errorsupplier.error) {
    const object2 = {
      company: request.body.company,
      supplier: request.body.supplier,
      supplier_id: request.body.supplier_id,
      aadhar: request.body.aadhar,
      email: request.body.email,
      contact: request.body.contact,
      state: request.body.state,
      city: request.body.city,
      particulars: request.body.particulars,
      type: "supplier",
    };
    SupplierController.SupplierForm(object2)
      .then((res) => {
        logger.info("Your Data was posted sucessfully!!!");
        response.send(res);
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        response.send("OOPS!!Failed to add supplier data!!", err);
      });
  } else {
    logger.warn(
      "error !! something bad happened in registering supplier to company!!"
    );
  }
});

// TO GET SUPPLIER
app.get("/getsupplier", (request, response) => {
  console.log(request);
  const data = {
    selector: {
      type: "supplier",
    },
  };
  SupplierController.getsupplier(data)
    .then((res) => {
      logger.info("Your data was fetched successfully!!");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

// TO DELETE SUPPLIER
app.delete("/delsupplier/:id/:id1", (request, response) => {
  console.log(request);
  SupplierController.delsupplier(request.params.id, request.params.id1)
    .then((res) => {
      logger.warn("Your data was deleted succesfully");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

//TO UPDATE SUPPLIER
app.put("/updatesupplier", (request, response) => {
  const errorsupplier = validation.suppliervalidation.validate(request.body);
  console.log(errorsupplier, "Successfully updated supplier!!");
  if (!errorsupplier.error) {
    const object2 = {
      company: request.body.company,
      supplier: request.body.supplier,
      supplier_id: request.body.supplier_id,
      aadhar: request.body.aadhar,
      email: request.body.email,
      contact: request.body.contact,
      state: request.body.state,
      city: request.body.city,
      _id: request.body._id,
      _rev: request.body._rev,
      type: "supplier",
    };
    SupplierController.SupplierForm(object2)
      .then((res) => {
        logger.info("Your Data was updated sucessfully!!!");
        response.send(res);
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        response.send("OOPS!!Failed to add supplier data!!", err);
      });
  } else {
    logger.warn("error !! something bad happened in updating to company!!");
  }
});

// CONTACT FORM
app.post("/contact", (request, _response) => {
  contactmail.getemail(request.body.email, request.body.msg);
});

// TO GET CATEGORY
app.get("/getinfo", (_request, response) => {
  const data = {
    selector: {
      type: "product_category",
    },
  };
  Infocontroller.getinfo(data)
    .then((res) => {
      logger.info("Your data was fetched successfully");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  logger.info("SUCCESS", "Server is running!!!");
  console.log(`server is listening on http://localhost:${port}`);
});
