import Stripe from 'stripe'
import { supabase } from '../../../lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  // Handle Stripe webhooks
  const body = await request.json()

  const event = body

  // Process the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const email = session.customer_email

    // Upgrade user to pro
    await supabase
      .from('users')
      .update({ plan: 'pro' })
      .eq('email', email)

    console.log(`Upgraded ${email} to pro!`)
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object
    // Downgrade user
    await supabase
      .from('users')
      .update({ plan: 'free' })
      .eq('stripe_customer_id', subscription.customer)
  }

  return Response.json({ received: true })
}
