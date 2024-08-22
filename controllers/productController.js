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
    features,
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
    const product = await Product.findById(req.params.id).populate("sellerId");
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
    const features = req.body.features || product.features;
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
      features,
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

export async function getAllProducts(req, res) {
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 7;
  const categoryGroup = req.query.category ?? "";
  const sort = req.query.sort ?? "updatedAt";
  const order = req.query.order ?? "desc";
  const minPrice = req.query.Min ?? 0;
  const maxPrice = req.query.Max ?? 200000;
  const star = req.query.star ?? "";
  const search = req.query.search ?? "";
  const startProduct = (page - 1) * limit;
  const categories = categoryGroup.split(",");

  const query = {
    $or: [
      { title: RegExp(search, "i") },
      { desc: RegExp(search, "i") },
      { serviceTitle: RegExp(search, "i") },
      { shortDesc: RegExp(search, "i") },
    ],
  };
  if (minPrice || maxPrice) {
    query.price = { $gt: minPrice, $lt: maxPrice };
  }

  if (categoryGroup) {
    query.category = { $in: categories };
  }

  if (star) {
    query.totalStar = star;
  }

  try {
    const all = await Product.countDocuments();
    const filtered = await Product.countDocuments(query);
    const products = await Product.find(query)
      .limit(limit)
      .skip(startProduct)
      .sort(order == "asc" ? sort : "-" + sort);
    res.json({
      success: true,
      body: products,
      message: "products fetch successfully!",
      totalProducts: { all, filtered },
      code: 201,
    });
  } catch (error) {
    res.fail(error.message, 500);
  }
}

export async function deleteProduct(req, res) {
  const isValid = mongoose.isValidObjectId(req.params.id);
  if (!isValid) {
    res.fail("Its not a valid id.", 402);
    return;
  }
  const id = req.params.id;

  try {
    await Product.findByIdAndDelete(id);
    res.success("Your product was deleted successfully!", 200);
  } catch (error) {
    res.fail(error.message, 500);
  }
}
