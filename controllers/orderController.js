import Stripe from "stripe";
import Product from "../models/productSchema.js";
import Order from "../models/orderSchema.js";

export async function paymentProduct(req, res) {
  if (!req.username) {
    res.fail("Please Login First!", 402);
    return;
  }
  try {
    const stripe = new Stripe(process.env.STRIPE);
    const product = await Product.findById(req.params.id).populate("sellerId");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price * 100,
      currency: "cad",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const newOrder = new Order({
      productId: product._id.toString(),
      img: product.coverImage,
      title: product.title,
      sellerId: product.sellerId._id.toString(),
      chatId: product._id.toString() + req.userId,
      buyerId: req.userId,
      price: product.price,
      payment_intent: paymentIntent.id,
      isSeen: false,
    });
    await newOrder.save();
    res.success(
      " Payment successfully sent.",
      { clientSecret: paymentIntent.client_secret },
      200
    );
  } catch (error) {
    res.fail(error.message, 500);
  }
}

export async function orderConfirm(req, res) {
  const payment_intent = req.body.payment_intent;
  try {
    const order = await Order.findOneAndUpdate(payment_intent, {
      isCompleted: true,
    });

    res.success(" Coonfirm was Completed!", { payment_intent }, 200);
  } catch (error) {
    res.fail(error.message, 500);
  }
}

export async function getAllOrdersOfUser(req, res) {
  if (!req.userId) {
    res.fail("You are not authorized. Please log in first.", 402);
    return;
  }

  try {
    let orders;
    const query = { $or: [{ sellerId: req.userId }, { buyerId: req.userId }] };

    orders = await Order.find(query).populate("sellerId").populate("buyerId");

    res.success("orders was fetched successfully", orders, 200);
  } catch (error) {
    res.fail(error.message, 500);
  }
}

export async function seenOrder(req, res) {
  const { id } = req.params;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, { isSeen: true });
    res.success("Order was upadated Successully.", 202);
  } catch (error) {
    res.fail(error.message, 500);
  }
}
