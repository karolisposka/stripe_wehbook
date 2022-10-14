require('dotenv').config()


module.exports={
    server_url: process.env.SERVER_URL,
    stripeEndpointSecret: process.env.STRIPE_ENDPOINT_SECRET,
}


