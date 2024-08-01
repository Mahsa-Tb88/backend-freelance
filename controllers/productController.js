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

export async function updateProduct(req, res) {
  const isValid = mongoose.isValidObjectId(req.params.id);
  if (!isValid) {
    res.fail("Its not a valid id.", 402);
    return;
  }

  try {
    const product = await Product.findById(req.params.id);
    const title = req.body.title || product.title;
    const category = req.body.category || product.category;
    const coverImage = req.body.coverImage || product.coverImage;
    const albumImage = req.body.albumImage || product.albumImage;
    const desc = req.body.desc || product.desc;
    const serviceTitle = req.body.serviceTitle || product.serviceTitle;
    const shortDesc = req.body.shortDesc || product.shortDesc;
    const deliveryTime = req.body.deliveryTime || product.deliveryTime;
    const revisionNumber = req.body.revisionNumber || product.revisionNumber;
    const addFeature = req.body.addFeature || product.addFeature;
    const price = req.body.price || product.price;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
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
    });
    if (!updatedProduct) {
      return res.fail("This product was not found!");
    }
    res.success("The product was upadated successfully!", updatedProduct);
  } catch (error) {
    res.fail(error.message, 500);
  }
}
