'use client'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { 
    Container,
    Grid,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    CardActionArea,
    Typography,
} from '@mui/material'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const router = useRouter()
  useEffect(() => {
    async function getFlashcards() {
        if (!user) return

        const userDocRef = doc(collection(db, 'users'), user.id)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
            const collections = userDocSnap.data().flashcards || []
            setFlashcards(collections)
        } else {
            await setDoc(userDocRef, { flashcards: [] })
        }

    }

    getFlashcards()
  }, [user])

  if (!isLoaded || !isSignedIn) return <div>Loading...</div>

  const handleCardClick = (name) => {
    router.push(`/flashcard?name=${encodeURIComponent(name)}`)
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {flashcard.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}


