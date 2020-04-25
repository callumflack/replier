const path = require("path");
const Stripe = require("stripe");

require("dotenv").config({
  path: path.resolve(process.cwd(), ".env"),
});

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async function() {
  const session = await stripe.checkout.sessions.create({
    submit_type: 'donate',
    payment_method_types: ["card"],
    // line_items: [
    //   {
    //     name: "Donation",
    //     amount: 200,
    //     currency: "AUD",
    //     quantity: 1,
    //   },
    // ],
    items: [
      {
        sku: 'sku_H9hlmTOYXeeC8k',
        // name: "Donation",
        // amount: 200,
        // currency: "AUD",
        quantity: 1
      }
    ],

    // Do not rely on the redirect to the successUrl for fulfilling
    // purchases, customers may not always reach the success_url after
    // a successful payment, or malicious users could directly access
    // the successUrl without paying.
    // Instead use one of the strategies described in
    // https://stripe.com/docs/payments/checkout/fulfillment
    success_url: 'http://write.corv.id?donation=success',
    cancel_url: 'http://write.corv.id?donation=cancelled',
  });

  // }).then(function (result) {
  //   // If `redirectToCheckout` fails due to a browser or network
  //   // error, display the localized error message to your customer
  //   // using `result.error.message`.
  // });

  return {
    statusCode: 200,
    body: JSON.stringify({
      session,
    }),
  };
};
