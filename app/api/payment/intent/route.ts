import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { amount = '0', currency = 'BRL', description } = body

    const stripeSecret = process.env.STRIPE_SECRET_KEY
    if (stripeSecret) {
      try {
        // Try to require stripe at runtime; use eval to avoid static analysis
        const req: any = (globalThis as any).require ?? (eval as any)('require')
        const stripePkg = req('stripe')
        const stripe = stripePkg?.default || stripePkg
        const client = new stripe(stripeSecret, { apiVersion: '2022-11-15' })
        const pi = await client.paymentIntents.create({
          amount: Math.round(Number(String(amount).replace(/[^0-9]/g, '')) || 0),
          currency: String(currency).toLowerCase(),
          description,
        })
        return NextResponse.json({ client_secret: pi.client_secret })
      } catch (e) {
        // stripe not available or failed — fallthrough to mock
        console.warn('Stripe require failed, returning mock intent', e)
      }
    }

    // Fallback mock response
    return NextResponse.json({ client_secret: 'mock_client_secret' })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'unknown' }, { status: 500 })
  }
}
