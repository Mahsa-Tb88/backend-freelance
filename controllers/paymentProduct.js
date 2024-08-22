import Stripe from "stripe";
import Product from "../models/productSchema.js";
import Order from "../models/orderSchema.js";

export async function paymentProduct(req, res) {

  if (!req.username) {
    res.fail("First you should login", 402);
    return;
  }
  try {
    const stripe = new Stripe(process.env.STRIPE);
    const product = await Product.findById(req.params.id);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price * 100,
      currency: "cad",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(product);

    const newOrder = new Order({
      productId: product._id.toString(),
      img: product.coverImage,
      title: product.title,
      sellerId: product.sellerId,
      buyerId: req.userId,
      price: product.price,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();
    res.success(
      "successfully sensd",
      { clientSecret: paymentIntent.client_secret },
      200
    );
  } catch (error) {}
}
