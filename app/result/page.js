'use client'
import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Container, 
  CircularProgress, 
  Typography, 
  Box, 
  Button
} from '@mui/material'
import { useSearchParams } from 'next/navigation'

// Wrap the component that uses useSearchParams in Suspense
function ResultContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const session_id = searchParams.get('session_id')

  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if(!session_id) {
        setError('No session ID found')
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`/api/checkout_sessions?session_id=${session_id}`)
        const sessionData = await res.json()
        if (res.ok) {
          setSession(sessionData)
        } else {
          setError(sessionData.error || 'Payment verification failed')
        }
      } catch (err) {
        setError('An error occurred while fetching the checkout session.')
      } finally {
        setLoading(false)
      }
    }
    fetchCheckoutSession()
  }, [session_id])

  if (loading) {
    return (
      <Container 
        maxWidth='sm'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          gap: 2,
          textAlign: 'center',
        }}
      >
        <CircularProgress />
        <Typography variant='h6'>Processing your payment...</Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container 
        maxWidth='sm'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          gap: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant='h6' color="error">{error}</Typography>
        <Button 
          variant="contained" 
          onClick={() => router.push('/')}
          sx={{ mt: 2 }}
        >
          Return Home
        </Button>
      </Container>
    )
  }

  return (
    <Container
      maxWidth='md'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: 3,
        textAlign: 'center',
        py: 4,
      }}
    >
      {session?.payment_status === 'paid' ? ( 
        <>
          <Typography variant='h4' gutterBottom>
            Thank you for your purchase!
          </Typography>
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant='body1' paragraph>
              {"We've received your payment for the"} {session?.metadata?.plan || 'Pro Plan'}.
            </Typography>
            <Typography variant='body1' paragraph>
              Your subscription is now active. You can start using all premium features immediately.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => router.push('/generate')}
              sx={{ mt: 3 }}
            >
              Start Creating Flashcards
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant='h4' color="error" gutterBottom>
            Payment not completed
          </Typography>
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant='body1' paragraph>
              {"Your payment wasn't completed successfully. Please try again."}
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => router.push('/')}
              sx={{ mt: 3 }}
            >
              Return to Pricing
            </Button>
          </Box>
        </>
      )}
    </Container>
  )
}

// Main export with Suspense boundary
export default function ResultPage() {
  return (
    <Suspense fallback={
      <Container 
        maxWidth='sm'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          gap: 2,
          textAlign: 'center',
        }}
      >
        <CircularProgress />
        <Typography variant='h6'>Loading payment details...</Typography>
      </Container>
    }>
      <ResultContent />
    </Suspense>
  )
}