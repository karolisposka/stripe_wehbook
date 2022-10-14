require('dotenv').config()


module.exports={
    port: process.env.PORT,
    stripeEndpointSecret: process.env.STRIPE_END_PONT_SECRET
}


