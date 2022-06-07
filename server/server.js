const connection = require("express");
const bodyparser = require("body-parser");
const app = connection();
const port = 8000;
const cors = require("cors");
const logger = require("./logger/logger");
const adminController = require("./controller/Admincontroller");
const companyController = require("./controller/Companycontroller");
const productController = require("./controller/Productcontroller");
const supplierController = require("./controller/Suppliercontroller");
const formController = require("./controller/Formcontroller");
const infoController = require("./controller/Infocontroller");
const categoryController = require("./controller/Categorycontroller");
const contactMail = require("./connection/mail");
const validation = require("./Validator/validation");
const { error } = require("./logger/logger");
app.use(connection.static("public"));
app.use(bodyparser.json());
app.disable("x-powered-by");
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
  formController
    .signupForm(object)
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
    adminController
      .adminForm(object)
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
  adminController
    .getAdmin(data)
    .then((res) => {
      logger.info("data fetched");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

app.get("/getUser/:id", (_request, response) => {
  const data = {
    selector: {
      type: "adminuser",
      _id: _request.params.id,
    },
  };
  adminController
    .getAdmin(data)
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
  adminController
    .delId(request.params.id, request.params.id1)
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
    adminController
      .updateForm(object)
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
    companyController
      .companyForm(object)
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
  companyController
    .getCompany(data)
    .then((res) => {
      logger.info("Your data was fetched succesfully");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

app.get("/getcompany/:id", (_request, response) => {
  const data = {
    selector: {
      type: "Company",
      _id: _request.params.id,
    },
  };
  companyController
    .getCompany(data)
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
  companyController
    .delCompany(request.params.id, request.params.id1)
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
    companyController
      .companyForm(object)
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
    productController
      .productForm(object)
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
  productController
    .getProduct(data)
    .then((res) => {
      logger.info("Your Product was fetched succesfully");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});
app.get("/getproduct/:id", (_request, response) => {
  const data = {
    selector: {
      type: "products",
      _id: _request.params.id,
    },
  };
  productController
    .getProduct(data)
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
  productController
    .delProduct(request.params.id, request.params.id1)
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
    console.log("hello update", object._id, object._rev);
    productController
      .updateProduct(object)
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
    supplierController
      .supplierForm(object2)
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
  supplierController
    .getSupplier(data)
    .then((res) => {
      logger.info("Your data was fetched successfully!!");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

app.get("/getsupplier/:id", (request, response) => {
  console.log(request);
  const data = {
    selector: {
      type: "supplier",
      _id: request.params.id,
    },
  };
  supplierController
    .getSupplier(data)
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
  supplierController
    .delsupplier(request.params.id, request.params.id1)
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
    supplierController
      .updateSupplier(object2)
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
app.post("/contact", (request, response) => {
  contactMail.getemail(request.body.email, request.body.msg);
  response.send(res);
});

// TO GET CATEGORY
app.get("/getinfo", (_request, response) => {
  const data = {
    selector: {
      type: "product_category",
    },
  };
  infoController
    .getInfo(data)
    .then((res) => {
      logger.info("Your data was fetched successfully");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

// TO ADD CATEGORY
app.post("/addcategory", (request, response) => {
  const errorcategory = validation.categoryvalidation.validate(request.body);
  console.log(errorcategory, "Successfully registered supplier!!");
  if (!errorcategory.error) {
    const object2 = {
      category: request.body.category,
      product_id: request.body.product_id,
      type: "product_category",
    };
    categoryController
      .categoryForm(object2)
      .then((res) => {
        logger.info("Your Data was posted sucessfully!!!");
        response.send(res);
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        response.send("OOPS!!Failed to add category data!!", err);
      });
  } else {
    logger.warn(
      "error !! something bad happened in registering categories to company!!"
    );
  }
});

// TO GET CATEGORY
app.get("/getcategory", (_request, response) => {
  const data = {
    selector: {
      type: "product_category",
    },
  };
  categoryController
    .getProduct(data)
    .then((res) => {
      logger.info("Your data was fetched successfully");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response", err);
    });
});

// TO DELETE CATEGORY
app.delete("/delcategory/:id/:id1", (request, response) => {
  console.log(request);
  categoryController
    .delCategory(request.params.id, request.params.id1)
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
app.put("/updatecategory", (request, response) => {
  const errorcategory = validation.categoryvalidation.validate(request.body);
  console.log(errorcategory, "Successfully updated supplier!!");
  if (!errorcategory.error) {
    const object2 = {
      category: request.body.category,
      product_id: request.body.product_id,
      _id: request.body._id,
      _rev: request.body._rev,
      type: "product_category",
    };
    categoryController
      .updateCategory(object2)
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

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  logger.info("SUCCESS", "Server is running!!!");
  console.log(`server is listening on http://localhost:${port}`);
});
