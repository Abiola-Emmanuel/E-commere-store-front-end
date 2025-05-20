import express from "express";
import Stripe from "stripe";
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
  origin: ['http://localhost:3000', 'https://e-commere-store-front-end.vercel.app']
}));

app.use(express.json());

app.post('/api/checkout', async (req, res) => {
  try {
    if (!req.body.items || !Array.isArray(req.body.items)) {
      return res.status(400).json({ error: 'Invalid items array' });
    }

    console.log('Incoming checkout request with items:', {
      items: req.body.items,
      headers: req.headers,
      origin: req.headers.origin
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name || `Product ${item.id}`,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
    });

    console.log('Created Stripe session:', session.id);
    res.json({ id: session.id });

  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({
      error: error.message,
      type: error.type
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});