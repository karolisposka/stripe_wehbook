const express = require('express');
const fetch = require('node-fetch')
const { server_url, stripeEndpointSecret} = require('./config')
const stripe = require('stripe')('sk_test_51Lj8yFFPSbztWufZlFEDoK9gX7PnXiKsQHJVoKmUFk3xnqbH4bskMV0fLZY1PwilkS2lcSx5mC87LiqFhUNOHXk500rCHeQmEL');
const endpointSecret = stripeEndpointSecret;
const app = express();



app.post('/webhook', express.raw({type: 'application/json'}), async  (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    if(event.type === 'checkout.session.completed'){
        const response = await fetch(`${server_url}/v1/orders/verify`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                event: event.data.object.id
            }),
        });
        const data = await response.json();
        if(data){
            console.log(data)    
        }
    }   
    response.json({received: true});
  }
  
  catch (err) {
    console.log(err);
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
  
});

app.listen(port, () => console.log(`Running on port ${port}`));