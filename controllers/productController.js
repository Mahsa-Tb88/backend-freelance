import mongoose from "mongoose";
import Product from "../models/productSchema.js";

export async function createProduct(req, res) {
  const {
    title,
    category,
    coverImage,
    albumImage,
    desc,
    serviceTitle,
    shortDesc,
    deliveryTime,
    revisionNumber,
    addFeature,
    price,
  } = req.body;

  if (
    (!title,
    !category,
    !coverImage,
    !desc,
    !serviceTitle,
    !shortDesc,
    !deliveryTime,
    !revisionNumber,
    !price)
  ) {
    res.fail("Please enter a value for all fields.");
    return;
  }

  try {
    const findProduct = await Product.findOne({ title });
    if (findProduct) {
      res.fail("This title is already exists.");
      return;
    }
    req.body.sellerId = req.sellerId;
    const product = await Product.create(req.body);
    res.success("Your product was created successfully!", product);
  } catch (error) {
    res.fail(error.message, 500);
  }
}

export async function getProductById(req, res) {
  const isValid = mongoose.isValidObjectId(req.params.id);
  if (!isValid) {
    res.fail("Its not a valid id.", 402);
    return;
  }
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.fail("This product is not exsits.");
    } else {
      res.success("fetch prouct successfully.", product);
    }
  } catch (error) {
    res.fail(error.message, 500);
  }
}

export async function getAllProductOfSeller(req, res) {
  const isValid = mongoose.isValidObjectId(req.params.id);
  if (!isValid) {
    res.fail("Its not a valid id.", 402);
    return;
  }
  try {
    const products = await Product.find({ sellerId: req.sellerId });
    res.success("fetch all products are belog to one seller", products);
  } catch (error) {
    res.fail(error.message, 500);
  }
}
