const joi = require("joi");

// FOR USER VALIDATION
const uservalidation = joi.object({
  username: joi.string().alphanum().min(4).max(30).required(),
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  email: joi
    .string()
    .email()
    .regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
    .required(),
  contact: joi.string().min(10).required(),
  password: joi
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
  confirm_password: joi.string().valid(joi.ref("password")).required(),
  _id: joi.optional(),
  _rev: joi.optional(),
});

// FOR COMPANY VALIDATION
const companyvalidation = joi.object({
  company: joi.string().alphanum().min(3).max(30).required(),
  company_id: joi.string().alphanum().min(5).max(30).required(),
  email: joi
    .string()
    .email()
    .regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
    .required(),
  website: joi.string().required(),
  location: joi.string().required(),
  _id: joi.optional(),
  _rev: joi.optional(),
});

// For Product Validation
const productvalidation = joi.object({
  company: joi.string().required(),
  category: joi.string().required(),
  product_id: joi.string().required(),
  brand: joi.string().alphanum().required(),
  quantity: joi.number().min(1).required(),
  price: joi.number().min(1).required(),
  total: joi.number().optional(),
  manufacture: joi.string().required(),
  particulars: joi.optional(),
  _id: joi.optional(),
  _rev: joi.optional(),
});

// FOR SUPPLIER VALIDATION
const suppliervalidation = joi.object({
  company: joi.string().alphanum().min(3).max(30).required(),
  supplier: joi.string().required(),
  supplier_id: joi.string().alphanum().required(),
  aadhar: joi.number().min(12).required(),
  email: joi
    .string()
    .email()
    .regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
    .required(),
  contact: joi.string().min(10).required(),
  state: joi.string().required(),
  city: joi.string().required(),
  particulars: joi.optional(),
  _id: joi.optional(),
  _rev: joi.optional(),
});

// For Product Validation
const categoryvalidation = joi.object({
  category: joi.string().required(),
  product_id: joi.string().required(),
  _id: joi.optional(),
  _rev: joi.optional(),
});

module.exports = {
  uservalidation,
  companyvalidation,
  productvalidation,
  suppliervalidation,
  categoryvalidation,
};
