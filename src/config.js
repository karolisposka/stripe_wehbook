require('dotenv').config()


module.exports={
    port: 4242,
    server_url: process.env.SERVER_URL,
    stripeEndpointSecret: process.env.STRIPE_ENDPOINT_SECRET,
}


