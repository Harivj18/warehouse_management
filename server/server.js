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
app.use(connection.static("public"));
app.use(bodyparser.json());
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
// FOR SIGNUP FORM
app.post("/postuser", (request, response) => {
  console.log(request);
  var object = {
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
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was posted");
});

// ADD ADMIN
app.post("/adduser", (request, response) => {
  console.log(request);
  var object = {
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
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was posted");
});

// GET ADMIN
app.get("/getUser", (request, response) => {
  console.log(request);
  console.log("Fetching Begins");
  var data = {
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
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was fetched succesfully");
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
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was deleted succesfully");
});

// UPDATING ADMIN DATA
app.put("/putquery", (request, response) => {
  var newobj = {
    username: request.body.username,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    password: request.body.password,
    contact: request.body.contact,
    confirm_password: request.body.confirm_password,
    _id: request.body._id,
    _rev: request.body._rev,
    type: "adminuser",
  };
  Admincontroller.updateForm(newobj)
    .then((res) => {
      logger.info("Your data was updated successfully!!");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was updated");
});

//TO ADD COMPANY
app.post("/addcompany", (request, response) => {
  console.log(request);
  var object = {
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
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was posted");
});

// TO GET COMPANY
app.get("/getcompany", (request, response) => {
  console.log(request);
  var data = {
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
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was fetched");
});

// TO DELETE COMPANY
app.delete("/delcompany/:id/:id1", (request, response) => {
  console.log(request);
  Companycontroller.delcompany(request.params.id, request.params.id1)
    .then((res) => {
      logger.warn("Your Data was deleted successfully!!");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was deleted");
});

//TO UPDATE COMPANY
app.put("/updatecompany", (request, response) => {
  var object = {
    company: request.body.company,
    company_id: request.body.company_id,
    email: request.body.body.email,
    website: request.body.website,
    location: request.body.location,
    _id: request.body._id,
    _rev: request.body._rev,
    type: "Company",
  };
  Companycontroller.updatecompany(object)
    .then((res) => {
      logger.info("Your Data was updated sucessfully!!!");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was updated");
});

//TO ADD PRODUCTS
app.post("/addproduct", (request, response) => {
  console.log(request);
  var object = {
    company: request.body.company,
    category: request.body.category,
    product_id: request.body.product_id,
    brand: request.body.brand,
    quantity: request.body.quantity,
    price: request.body.price,
    manufacture: request.body.manufacture,
    type: "products",
  };
  Productcontroller.ProductForm(object)
    .then((res) => {
      logger.info("Your Product was posted sucessfully!!!");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was posted");
});

// TO GET PRODUCT
app.get("/getproduct", (request, response) => {
  console.log(request);
  var data = {
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
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was fetched");
});

// TO DELETE PRODUCT
app.delete("/delproduct/:id/:id1", (request, response) => {
  console.log(request);
  Productcontroller.delproduct(request.params.id, request.params.id1)
    .then((res) => {
      logger.warn("Your data was deleted succesfully");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was deleted");
});

//TO UPDATE PRODUCT
app.put("/updateproduct", (request, response) => {
  var object = {
    company: request.body.company,
    category: request.body.category,
    product_id: request.body.product_id,
    brand: request.body.brand,
    quantity: request.body.quantity,
    price: request.body.price,
    manufacture: request.body.manufacture,
    _id: request.body._id,
    _rev: request.body._rev,
    type: "products",
  };
  Productcontroller.updateproduct(object)
    .then((res) => {
      logger.info("Your Data was updated sucessfully!!!");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was updated");
});

// TO ADD SUPPLIER
app.post("/addsupplier", (request, response) => {
  console.log(request);
  var object2 = {
    company: request.body.company,
    supplier: request.body.supplier,
    supplier_id: request.body.supplier_id,
    aadhar: request.body.aadhar,
    email: request.body.email,
    contact: request.body.contact,
    state: request.body.state,
    city: request.body.city,
    type: "supplier",
  };
  SupplierController.SupplierForm(object2)
    .then((res) => {
      logger.info("Your Data was posted sucessfully!!!");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was posted");
});

// TO GET SUPPLIER
app.get("/getsupplier", (request, response) => {
  console.log(request);
  var data = {
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
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was fetched");
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
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was deleted");
});

//TO UPDATE SUPPLIER
app.put("/updatesupplier", (request, response) => {
  var object = {
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
  SupplierController.updatesupplier(object)
    .then((res) => {
      logger.info("Your Data was updated sucessfully!!!");
      response.send(res);
    })
    .catch((err) => {
      logger.error("error", "Your response from database");
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was updated");
});

// CONTACT FORM
app.post("/contact", (request, response) => {
  console.log(request);
  var mail = {
    username: request.body.username,
    email: request.body.email,
    msg: request.body.msg,
  };
  contactmail.getemail(request.body.email, request.body.msg);
  console.log(mail);
});

// TO GET CATEGORY
app.get("/getinfo", (request, response) => {
  console.log(request);
  var data = {
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
      response.send("OOPS!!Failed to send your response");
    });
  console.log("Your data was fetched");
});

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  logger.info("SUCCESS", "Server is running!!!");
  console.log(`server is listening on http://localhost:${port}`);
});
