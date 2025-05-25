import { stripe } from '@/lib/stripe/stripe'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


export default async function SuccessPage({ searchParams }: Props) {
  const searchParamss = await searchParams
  const session_id = searchParamss?.session_id as string

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const {
    status
  } = await stripe.checkout.sessions.retrieve(session_id as string, {
    expand: ['line_items', 'payment_intent'],
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          . If you have any questions, please email{' '}
        </p>
        <a href="mailto:x2890901420@gmail.com">x2890901420@gmail.com</a>.
      </section>
    )
  }

  return (
    <p>Unknown session status: {status}</p>
  )
}
